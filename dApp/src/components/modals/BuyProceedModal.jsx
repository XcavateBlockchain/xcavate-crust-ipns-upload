import React, { useEffect, useRef, useState } from 'react'
import { CloseSvgIcon, LoadingSvgIcon } from '../../assets/icons'
import { abbreviationFormat } from '../../utils'
import { useSubstrateState } from '../../contexts/SubstrateContext'
import { web3FromSource } from '@polkadot/extension-dapp'
import { bnFromHex } from '@polkadot/util'
import { toast } from 'react-toastify'

const BuyProceedModal = ({ isOpen, setIsOpen, availableNFTs, owner, nftPrice, collectionId, setSuccessOpen}) => {
  const modalRef = useRef(null)
  const { api, keyring, polkadotAccount } = useSubstrateState()
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [setIsOpen])

  const increase = () => {
    setCount(c => c < availableNFTs? c + 1 : c)
  }

  const decrease = () => {
    setCount(c => c > 1? c - 1 : c)
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

  const payment = async () => {
    try {
      setLoading(true)
      const fromAcct = await getFromAcct()
      
      let txs = []
      const firstItemId = 100 - Number(availableNFTs) + 1

      for (let index = firstItemId; index < firstItemId + count; index++) {
        txs.push(api.tx.uniques.buyItem(collectionId, index, nftPrice))
      }

      await api.tx.utility.batch(txs).signAndSend(...fromAcct, ({ events = [], status, txHash }) =>{
        status.isFinalized
          ? toast.success(`Purchasing finalized. Block hash: ${status.asFinalized.toString()}`)
          : toast.info(`Purchasing: ${status.type}`)
        
        events.forEach(async ({ _, event: { data, method, section } }) => {
          if ((section + ":" + method) === 'system:ExtrinsicFailed' ) {
            errorHandle({ data, method, section, target: 'Setting price' })
          } else if (section + ":" + method === 'system:ExtrinsicSuccess' && status?.type !== 'InBlock') {
            setLoading(false)
            setIsOpen(false)
            setSuccessOpen(true)
            console.log('purchasing nfts :: ', `❤️️ Transaction successful! tx hash: ${txHash}, Block hash: ${status.asFinalized.toString()}`)
          }
        })
      })
    } catch (error) {
      console.log('error :: ', error)
    }
  }

  return (
    <>
      {isOpen ? (
        <>
          <div
            className='flex fixed justify-center items-center inset-0 z-50 backdrop-blur-sm backdrop-brightness-50'
          >
            <div
              ref={modalRef}
              className='max-w-[580px] w-full'
            >
              {/*content*/}
              <div className='flex flex-col w-full bg-white rounded-md'>
                {/*header*/}
                <section className='flex flex-col'>
                  <div className="flex justify-end pt-10 pr-10">
                    <button
                      onClick={() => setIsOpen(false)}
                    >
                      <CloseSvgIcon />
                    </button>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <h2 className=" font-graphik-bold text-[28px] text-[#1C1F20] tracking-[0.7px]">
                      {`Make Payment`}
                    </h2>
                  </div>
                </section>
                {/*body*/}
                <section className='flex flex-col justify-center my-10 px-16'>
                  <div className='flex flex-row items-center justify-center'>
                    <button onClick={increase} className=' flex flex-row items-center justify-center w-[30px] h-[30px] border-2 border-solid border-button rounded'>
                      <h4 className=' font-graphik-medium text-2xl text-headers'>
                        {`+`}
                      </h4>
                    </button>
                    <h5 className=' font-graphik-regular text-lg text-headers mx-4'>
                      {count}
                    </h5>
                    <button onClick={decrease} className=' flex flex-row items-center justify-center w-[30px] h-[30px] border-2 border-solid border-button rounded'>
                      <h4 className=' font-graphik-medium text-2xl text-headers'>
                        {`-`}
                      </h4>
                    </button>
                    <h5 className=' font-graphik-regular text-lg text-headers mx-4'>
                      {`(${availableNFTs} NFTs available)`}
                    </h5>
                  </div>
                  <div className=' flex flex-col items-start mt-4'>
                    <label htmlFor='amount' className=' font-graphik-regular text-lg text-headers opacity-70'>
                      {`Amount`}
                    </label>
                    <div className='flex flex-row items-center w-full h-[52px] rounded mt-1'>
                      <button className='flex w-auto h-full justify-end items-center bg-label px-4 rounded-l'>
                        <h4 className=' font-graphik-medium text-lg text-headers opacity-70'>
                          {`XCAV`}
                        </h4>
                      </button>
                      <input
                        type='text'
                        value={(Number(nftPrice) * count).toLocaleString('en-US')}
                        className='w-full h-full font-graphik-medium text-lg text-headers opacity-70 bg-white border border-solid border-label focus:outline-none rounded-r px-4'
                        readOnly
                      />
                    </div>
                  </div>
                  <div className=' flex flex-col items-start mt-4'>
                    <label htmlFor='amount' className=' font-graphik-regular text-lg text-headers opacity-70'>
                      {`Sender wallet address`}
                    </label>
                    <div className='flex flex-row items-center w-full h-[52px] bg-label rounded mt-1 px-4'>
                      <h4 className=' font-graphik-regular text-lg text-placeholder opacity-50'>
                        {abbreviationFormat(polkadotAccount, 30, 1)}
                      </h4>
                    </div>
                  </div>
                  <div className=' flex flex-col items-start mt-4'>
                    <label htmlFor='amount' className=' font-graphik-regular text-lg text-headers opacity-70'>
                      {`Holding wallet address`}
                    </label>
                    <div className='flex flex-row items-center w-full h-[52px] bg-label rounded mt-1 px-4'>
                      <h4 className=' font-graphik-regular text-lg text-placeholder opacity-50'>
                        {abbreviationFormat(owner, 30, 1)}
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={payment}
                    disabled={loading}
                    className=' flex flex-row items-center justify-center h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] mt-10'
                  >
                    {loading? <LoadingSvgIcon /> : <h5 className=' font-dmsans-bold text-base text-white uppercase'>
                      {`Make payment`}
                    </h5>}
                  </button>
                </section>
              </div>
            </div>
          </div>
          <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  )
}

export default BuyProceedModal
