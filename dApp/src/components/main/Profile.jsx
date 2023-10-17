import React, { useEffect, useState } from 'react'
import SummaryCard from '../cards/SummaryCard'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { USER_ROLES } from '../../data/mockData'
import { HomeSvgIcon, ShareSvgIcon, VerifiedSvgIcon } from '../../assets/icons'
import BannerPlaceholderImage from '../../assets/webp/placeholder.webp'
import MalePlaceholderImage from '../../assets/webp/male_placeholder_image.webp'
import { useNavigate } from 'react-router-dom'
import ProfileTab from '../partials/profile/Tab'
import ProfileDatailTab from '../partials/profile/Detail'
import ListedTab from '../partials/profile/Listed'
import { getAllPropertiesByUser } from '../../api/property'
import { useSubstrateState } from '../../contexts/SubstrateContext'
import { web3FromSource } from '@polkadot/extension-dapp'
import { bnFromHex } from '@polkadot/util'
import { create, getLastId } from '../../api/collection'
import { toast } from 'react-toastify'
import DevelopmentLoan from '../partials/profile/DevelopmentLoan'

const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [userRole, setUserRole] = useState('')
  const [tab, setTab] = useState('profile')
  const [properties, setProperties] = useState([])
  const { api, keyring, polkadotAccount } = useSubstrateState()

  const getProperties = async () => {
    try {
      const result = await getAllPropertiesByUser()
      if (result?.status === 200) {
        setProperties(result?.data?.data)
      }
    } catch (error) {
      console.log('error :: ', error)
    }
  }

  useEffect(() => {
    getProperties()
  }, [])

  useEffect(() => {
    if (user) {
      const role = USER_ROLES.find((role) => {
        return role.value === user?.userData?.role
      })
      setUserRole(role)
    }
  }, [user])

  const addProperty = () => {
    if (user?.userData?.isVerified) {
      navigate('/list-property')
    } else {
      toast.info('Your credentials are under reivew, please contact the admin if you need')
    }
  }

  const getFromAcct = async () => {
    const currentAccount = keyring.getPair(polkadotAccount)
    const {
      address,
      meta: { source, isInjected },
    } = currentAccount

    if (!isInjected) {
      return [currentAccount]
    }

    // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
    // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
    const injector = await web3FromSource(source)
    return [address, { signer: injector.signer }]
  }

  const listProperty = async (item) => {
    try {
      let collection = 1
      const lastIdResult = await getLastId()
      if (lastIdResult.status === 200 && lastIdResult?.data?.data) {
        const lastId = lastIdResult?.data?.data
        collection = lastId + 1
      }
      
      const fromAcct = await getFromAcct()
      // collection creation
      await api.tx.uniques.create(collection, polkadotAccount).signAndSend(...fromAcct, ({ events = [], status, txHash }) =>{     
        status.isFinalized
          ? toast.success(`Collection creation finalized. Block hash: ${status.asFinalized.toString()}`)
          : toast.info(`Collection creation: ${status.type}`)
        
        events.forEach(async ({ _, event: { data, method, section } }) => {
          if ((section + ":" + method) === 'system:ExtrinsicFailed' ) {
            errorHandle({ data, method, section, target: 'Collection creation' })
          } else if (section + ":" + method === 'system:ExtrinsicSuccess' && status?.type !== 'InBlock' ) {
            console.log('collection creation :: ', `❤️️ Transaction successful! tx hash: ${txHash}, Block hash: ${status.asFinalized.toString()}`)
      
            let txs = []
      
            const nftAmount = 100
            const price = nftAmount > 0? Math.round(Number(item?.price) / nftAmount) : 0
      
            if (price > 0) {
              for (let index = 0; index < 100; index++) {
                txs.push(api.tx.uniques.mint(collection, index + 1, polkadotAccount))
              }
              
              // nft minting
              await api.tx.utility.batch(txs).signAndSend(...fromAcct, ({ events = [], status, txHash }) =>{
                status.isFinalized
                  ? toast.success(`NFT minting finalized. Block hash: ${status.asFinalized.toString()}`)
                  : toast.info(`NFT minting: ${status.type}`)
                
                events.forEach(async ({ _, event: { data, method, section } }) => {
                  if ((section + ":" + method) === 'system:ExtrinsicFailed' ) {
                    errorHandle({ data, method, section, target: 'NFT minting' })
                  } else if (section + ":" + method === 'system:ExtrinsicSuccess' && status?.type !== 'InBlock') {
                    console.log('nft minting :: ', `❤️️ Transaction successful! tx hash: ${txHash}, Block hash: ${status.asFinalized.toString()}`)
      
                    txs = []
      
                    for (let index = 0; index < 100; index++) {
                      txs.push(api.tx.uniques.setPrice(collection, index + 1, price, undefined))
                    }
                    
                    // setting price
                    await api.tx.utility.batch(txs).signAndSend(...fromAcct, ({ events = [], status, txHash }) =>{
                      status.isFinalized
                        ? toast.success(`Setting price finalized. Block hash: ${status.asFinalized.toString()}`)
                        : toast.info(`Setting price: ${status.type}`)
                      
                      events.forEach(async ({ _, event: { data, method, section } }) => {
                        if ((section + ":" + method) === 'system:ExtrinsicFailed' ) {
                          errorHandle({ data, method, section, target: 'Setting price' })
                        } else if (section + ":" + method === 'system:ExtrinsicSuccess' && status?.type !== 'InBlock') {
                          console.log('setting price :: ', `❤️️ Transaction successful! tx hash: ${txHash}, Block hash: ${status.asFinalized.toString()}`)
                          // add collection data to the database
                          const result = await create({
                            id: collection,
                            owner: polkadotAccount,
                            propertyId: item?._id,
                            page: 'Profile',
                          })
                          if (result?.status === 201) {
                            const data = result?.data?.data
                            setProperties(data)
                            toast.success(`Listing successful!`)
                          }
                        }
                      })
                    })
                  }
                })
              })
            }
          }
        })
      })
    } catch (error) {
      console.log('error :: ', error)
    }
  }

  const errorHandle = ({ data, method, section, target }) => {
    // extract the data for this event
    const [dispatchError, dispatchInfo] = data
    console.log(`dispatchinfo: ${dispatchInfo}`)
    let errorInfo
    
    // decode the error
    if (dispatchError.isModule) {
      // for module errors, we have the section indexed, lookup
      // (For specific known errors, we can also do a check against the
      // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
      const mod = dispatchError.asModule
      const error = api.registry.findMetaError(
          new Uint8Array([mod.index.toNumber(), bnFromHex(mod.error.toHex().slice(0, 4)).toNumber()])
      )
      let message = `${error.section}.${error.name}${
          Array.isArray(error.docs) ? `(${error.docs.join('')})` : error.docs || ''
      }`
      
      errorInfo = `${message}`
      console.log(`Error-info::${JSON.stringify(error)}`)
    } else {
      // Other, CannotLookup, BadOrigin, no extra info
      errorInfo = dispatchError.toString()
    }
    toast.warn(`😞 ${target} transaction Failed! ${section}.${method}::${errorInfo}`)
  }

  return (
    <section className='mt-[126px] flex flex-col items-center mb-24'>
      {/* banner */}
      <div className=' relative container'>
        {/* banner image */}
        <img
          src={user?.userData?.bannerImage || BannerPlaceholderImage}
          alt='banner'
          className='w-full h-[300px] object-cover rounded-t-lg'
        />
        {/* profile data */}
        <div className=' absolute bottom-[-87px] flex flex-row items-end w-full h-[175px] pl-[50px]'>
          {/* profile image */}
          <img
            src={user?.userData?.profileImage || MalePlaceholderImage}
            alt='profile'
            className='w-[180px] h-[180px] rounded-full border-[5px] border-white'
          />
          <div className=' w-full flex flex-row items-center justify-between h-[87px] ml-8'>
            <div className='flex flex-col justify-center'>
              <div className='flex flex-row items-center'>
                <h4 className=' font-graphik-bold text-2xl text-headers opacity-[0.8] mr-2 tracking-[0.6px]'>
                  {user?.userData?.fullName || 'Unnamed'}
                </h4>
                {user?.userData?.isVerified && <VerifiedSvgIcon />}
                <h4 className=' font-graphik-medium text-2xl text-headers opacity-[0.8] tracking-[0.6px] ml-5'>
                  {userRole?.label || ''}
                </h4>
              </div>
              <div className='mt-2'>
                <h5 className=' font-graphik-regular text-xl tracking-[0.5px] text-headers opacity-[0.8]'>
                  {`Account created ${user?.userData?.createdAt? moment(user?.userData?.createdAt).format('MMM DD, YYYY') : ''}`}
                </h5>
              </div>
            </div>
            <div className='flex flex-row items-center justify-end'>
              <button
                className=' flex w-[135px] h-[53px] rounded-lg bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[2px] hover:scale-[1.01] active:scale-100 hover:shadow-sm mr-4'>
                <div className=' flex flex-row items-center justify-center w-full h-full rounded-[7px] bg-white'>
                  <h5 className=' font-dmsans-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] mr-2 uppercase'>
                    {`Share`}
                  </h5>
                  <ShareSvgIcon />
                </div>
              </button>
              <button
                onClick={addProperty}
                className=' flex flex-row items-center justify-center w-[135px] h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
              >
                <h5 className=' font-dmsans-bold text-base text-white uppercase mr-2'>
                  {`Add`}
                </h5>
                <HomeSvgIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* summary cards */}
      <div className=' container mt-28'>
        <div className=' grid grid-cols-2 lg:grid-cols-4 gap-5'>
          <SummaryCard title={`NFT'S Sold`} value={0} />
          <SummaryCard title={`Total NFT's minted`} value={0} />
          <SummaryCard title={`Properties listed`} value={0} />
          <SummaryCard title={`Total  property value`} value={0} />
        </div>
      </div>
      {/* tabs */}
      <ProfileTab tab={tab} setTab={setTab} />
      {/* contents */}
      {tab === 'profile' && <ProfileDatailTab />}
      {tab === 'properties' && properties.length > 0 && <ListedTab properties={properties} listProperty={listProperty} />}
      {tab === 'development-loan' && <DevelopmentLoan />}
    </section>
  )
}

export default Profile
