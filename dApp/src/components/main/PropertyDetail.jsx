import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPropertyById } from '../../api/property'
import { DoubleBathSvgIcon, DoubleBedSvgIcon, MapTagSvgIcon } from '../../assets/icons'
import { useSubstrateState } from '../../contexts/SubstrateContext'
import { web3FromSource } from '@polkadot/extension-dapp'
import { bnFromHex } from '@polkadot/util'
import { create, getLastId } from '../../api/collection'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PropertyDetail = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { api, keyring, polkadotAccount } = useSubstrateState()
  const user = useSelector((state) => state.user)
  const [property, setProperty] = useState(null)
  const [totalNFTs, setTotalNFTs] = useState(0)
  const [availableNFTs, setAvailableNFTs] = useState(0)

  const getProperty = useCallback( async (propertyId) => {
    const result = await getPropertyById(propertyId)
    if (result?.status === 200) {
      const _property = result?.data?.data
      setProperty(result?.data?.data)

      if (_property?.collect) {
        const collection = _property?.collect
        
        if (api && collection?.owner && collection?.id) {
          const result = await api.query.uniques.account.entries(collection?.owner, collection?.id)
          setTotalNFTs(result.length)
      
          if (result.length > 0) {
            const soldNFTs = result.filter(([key]) => {
              const [address] = key.args
              return address.toString() !== collection?.owner?.toString()
            })
            setAvailableNFTs(result.length - soldNFTs.length)
          }
        }
      }
    }
  }, [api])

  useEffect(() => {
    if (params?.id) {
      getProperty(params.id)
    }
  }, [params, getProperty])

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

  const listProperty = async () => {
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
            const price = nftAmount > 0? Math.round(Number(property?.price) / nftAmount) : 0
      
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
                            propertyId: property?._id,
                            page: 'Detail',
                          })
                          if (result?.status === 201) {
                            const data = result?.data?.data
                            setProperty(data)
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
    toast.warn(`${target} transaction Failed! ${section}.${method}::${errorInfo}`)
  }

  const buy = () => {
    navigate(`/buy-process/${property?._id}`)
  }

  const checkTransactions = async () => {
    try {
    } catch (error) {
      console.log('checking transaction error :: ', error)
    }
  }

  return (
    <>
      <div className='container mt-[7rem] mx-auto px-5'>
        <h1 className=' font-graphik-bold text-2xl text-headers tracking-[0.7px] opacity-80'>{property?.name || ''}</h1>
        <p className=' font-graphik-regular text-xl text-headers tracking-[0.5px] mt-4'>
          {property?.features?.f_property_type ? `${property?.features.f_property_type} | ` : ''}
          {`Located in the ${property?.address?.street || ''} ${property?.address?.city || ''} ${property?.address?.zipcode || ''} `}
          | {property?.features?.f_number_of_bedrooms} bedroom
          | {property?.features?.f_number_of_bathrooms} bathroom
        </p>
      </div>
      {/* left side */}
      <div className='flex mt-5 container mx-auto'>
        <div className=' w-2/3 mx-5 flex flex-col'>
          <img
            className='h-[30%] rounded-md w-[100%] max-w-full'
            src={property?.images[0] || ''}
            alt='property'
          />
          <div className='block w-full p-6 mt-6 bg-white rounded-lg'>
            <h5 className=' font-graphik-medium text-xl text-body tracking-[0.5px] opacity-80'>
              {`Property Details`}
            </h5>
            <p className=' font-graphik-regular text-lg text-body tracking-[0.45px] mt-6'>
              {property?.description || ''}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-x-4 w-full mt-4'>
            <div className='flex flex-col p-6 h-[420px] rounded bg-white'>
              <h1 className=' font-graphik-medium text-xl tracking-[0.5px] text-body opacity-80'>
                {`Property features`}
              </h1>
              <div className='flex flex-col mt-6'>
                <div className='flex flex-row items-center'>
                  <DoubleBedSvgIcon />
                  <h4 className=' font-graphik-regular text-xl tracking-[0.5px] text-body ml-2'>
                    {`${property?.features?.f_number_of_bedrooms} - bedroom`}
                  </h4>
                </div>
                <div className='flex flex-row items-center mt-6'>
                  <DoubleBathSvgIcon />
                  <h4 className=' font-graphik-regular text-xl tracking-[0.5px] text-body ml-2'>
                    {`${property?.features?.f_number_of_bathrooms} - bathroom`}
                  </h4>
                </div>
                <div className='flex flex-row items-center mt-6'>
                  <div className='w-6 h-6'>
                    <MapTagSvgIcon />
                  </div>
                  <h4 className=' font-graphik-regular text-xl tracking-[0.5px] text-body ml-2'>
                    {`Located in the ${property?.address?.street || ''} ${property?.address?.city || ''} ${property?.address?.zipcode || ''}`}
                  </h4>
                </div>
              </div>
            </div>
            <div className='flex flex-col p-6 h-[420px] rounded bg-white'>
              <h1 className=' font-graphik-medium text-xl tracking-[0.5px] text-body opacity-80'>
                {`Floor Plan`}
              </h1>
              <object
                type='application/pdf'
                data={property?.floorPlanImage || ''}
                className='w-full h-full mt-2'
                aria-label='floor plan'
              />
            </div>
          </div>
          <div className=' flex flex-col w-full h-[30rem] bg-white p-6 mt-4 rounded'>
            <h1 className=' font-graphik-medium text-xl tracking-[0.5px] text-body opacity-80'>
              {`Map | property location`}
            </h1>
            <div className='h-[100%] mt-4'>
              {/* <iframe
                width='100%'
                height='100%'
                title='map'
                src={property?.googleMapLink || ''}
              ></iframe> */}
            </div>
          </div>
        </div>
        {/* right side */}
        <div className='w-1/3 flex flex-col'>
          <div className='p-4 grid grid-cols-2 gap-x-4 bg-white rounded'>
            <div className='flex flex-col'>
              <div className='block max-w-sm'>
                <h1 className=' font-graphik-medium text-xl text-body opacity-80'>
                  {`Listing Price`}
                </h1>
                <p className=' font-graphik-regular text-xl text-body opacity-60 mt-6'>
                  £{property?.price || ''}
                </p>
              </div>
              <div className='block max-w-sm mt-10'>
                <h1 className=' font-graphik-medium text-xl text-body opacity-80'>
                  {`Rental Income`}
                </h1>
                <p className=' font-graphik-regular text-xl text-body opacity-60 mt-6'>
                  £{property?.rentalIncome || ''}
                </p>
              </div>
              <div className='block max-w-sm mt-10'>
                <h1 className=' font-graphik-medium text-xl text-body opacity-80'>
                  {`NFTs Minted (${totalNFTs || 0})`}
                </h1>
                <p className=' font-graphik-regular text-xl text-body opacity-60 mt-6'>
                  {`Available (${availableNFTs || 0})`}
                </p>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='block max-w-sm'>
                <h1 className=' font-graphik-medium text-xl text-body opacity-80'>
                  {`Price per NFT`}
                </h1>
                <p className=' font-graphik-regular text-xl text-body opacity-60 mt-6'>
                  £{`${Math.round(Number(property?.price) / 100)}` || ''}
                </p>
              </div>
              <div className='block max-w-sm mt-10'>
                <h1 className=' font-graphik-medium text-xl text-body opacity-80'>
                  {`RIO per NFT`}
                </h1>
                <p className=' font-graphik-regular text-xl text-body opacity-60 mt-6'>
                  £{`${Math.round(Number(property?.rentalIncome) / 100)} / per month` || '' || ''}
                </p>
              </div>
              <div className='block max-w-sm mt-10'>
                <h1 className=' font-graphik-medium text-xl text-body opacity-80'>
                  {`Property type`}
                </h1>
                <p className=' font-graphik-regular text-xl text-body opacity-60 mt-6'>
                  {property?.features?.f_property_type || ''}
                </p>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-4 mt-4'>
            {!property?.isListed && user?.userData?._id === property?.user?._id && <button
              onClick={listProperty}
              className=' flex flex-row items-center justify-center h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
            >
              <h5 className=' font-dmsans-bold text-base text-white uppercase'>
                {`List now`}
              </h5>
            </button>}
            {property?.isListed && user?.userData?._id !== property?.user?._id && <button
              onClick={buy}
              className=' flex flex-row items-center justify-center h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
            >
              <h5 className=' font-dmsans-bold text-base text-white uppercase'>
                {`Buy`}
              </h5>
            </button>}
            <button
              onClick={checkTransactions}
              className=' flex h-[53px] rounded-lg bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[2px] hover:scale-[1.01] active:scale-100 hover:shadow-sm'>
              <div className=' flex flex-row items-center justify-center w-full h-full rounded-[7px] bg-white'>
                <h5 className=' font-dmsans-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'>
                  {`Share`}
                </h5>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyDetail
