import React from 'react'
import moment from 'moment'
import { useSubstrateState } from '../../../contexts/SubstrateContext'
import { web3FromSource } from '@polkadot/extension-dapp'
import { bnFromHex } from '@polkadot/util'
import { createLoanCollection, getLastId } from '../../../api/collection'
import { toast } from 'react-toastify'

const LoanRequestItem = ({ loan, setLoans }) => {
  const { api, keyring, polkadotAccount } = useSubstrateState()

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

  const mint = async () => {
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
            const price = nftAmount > 0? Math.round(Number(loan?.amount) / nftAmount) : 0
      
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
                          const result = await createLoanCollection({
                            id: collection,
                            owner: polkadotAccount,
                            loanId: loan?._id,
                            page: 'Loan',
                          })
                          if (result?.status === 201) {
                            const data = result?.data?.data
                            setLoans(data)
                            toast.success(`Minted successful!`)
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

  return (
    <div className=' mt-4'>
      <div className='flex flex-row items-center w-full h-[53px] bg-white border-x-2 border-t border-solid border-[#948888] border-opacity-10'>
        <label className='w-[18%]'>
          <h5 className=' font-dmsans-medium text-base text-[#948888] px-4'>
            {`Loan amount`}
          </h5>
        </label>
        <label className='w-[20%]'>
          <h5 className=' font-dmsans-medium text-base text-[#948888] px-4'>
            {`Loan request status`}
          </h5>
        </label>
        <label className='w-[18%]'>
          <h5 className=' font-dmsans-medium text-base text-[#948888] px-4'>
            {`Planning code`}
          </h5>
        </label>
        <label className='w-[15%]'>
          <h5 className=' font-dmsans-medium text-base text-[#948888] px-4'>
            {`Duration`}
          </h5>
        </label>
        <label className='w-[15%]'>
          <h5 className=' font-dmsans-medium text-base text-[#948888] px-4'>
            {`Date`}
          </h5>
        </label>
        <label className='w-[14%]'>
          &nbsp;
        </label>
      </div>
      <div className='flex flex-row items-center w-full h-[53px] border-b-2 border-solid border-[#948888] border-opacity-10'>
        <label className='w-[18%]'>
          <h5 className=' font-dmsans-medium text-base text-body opacity-80 px-4'>
            £{loan?.amount || ''}
          </h5>
        </label>
        <label className='w-[20%]'>
          {!loan?.isApproved && !loan?.isRejected && !loan?.isMinted && !loan?.isCanceled && (
            <h5 className=' font-dmsans-medium text-lg text-progress px-4'>
              {`Under review`}
            </h5>
          )}
          {loan?.isRejected && (
            <h5 className=' font-dmsans-medium text-lg text-red-600 px-4'>
              {`Rejected`}
            </h5>
          )}
          {loan?.isApproved && !loan?.isRejected && !loan?.isMinted && !loan?.isCanceled && (
            <h5 className=' font-dmsans-medium text-lg text-verified px-4'>
              {`Approved`}
            </h5>
          )}
        </label>
        <label className='w-[18%]'>
          <h5 className=' font-dmsans-medium text-base text-body opacity-80 px-4'>
            {loan?.planningPermissionCode || ''}
          </h5>
        </label>
        <label className='w-[15%]'>
          <h5 className=' font-dmsans-medium text-base text-body opacity-80 px-4'>
            {`${loan?.duration} months` || ''}
          </h5>
        </label>
        <label className='w-[15%]'>
          <h5 className=' font-dmsans-medium text-base text-body opacity-80 px-4'>
            {moment(loan?.createdAt || '').format('MMM DD, YYYY')}
          </h5>
        </label>
        <label className='w-[14%]'>
          {!loan?.isApproved && !loan?.isRejected && !loan?.isMinted && !loan?.isCanceled && (
            <div className=' flex flex-row items-center justify-center w-full h-full rounded '>
              <h5 className=' font-dmsans-medium cursor-pointer text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] px-4'>
                {`Cancel`}
              </h5>
            </div>
          )}
          {loan?.isRejected && (
            <div className=' flex flex-row items-center justify-center w-full h-full rounded'>
              <h5 className=' font-dmsans-medium cursor-pointer text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] px-4'>
                {`Try again`}
              </h5>
            </div>
          )}
          {loan?.isApproved && !loan?.isRejected && !loan?.isMinted && !loan?.isCanceled && (
            <div className=' flex flex-row items-center justify-center w-full h-full rounded'>
              <h5
                onClick={mint}
                className=' font-dmsans-medium cursor-pointer text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] px-4'
              >
                {`Mint NFT`}
              </h5>
            </div>
          )}
        </label>
      </div>
    </div>
  )
}

export default LoanRequestItem
