import React, { useEffect, useRef } from 'react'
import { CloseSvgIcon } from '../../assets/icons'
import CheckIcon from '../../assets/webp/check.webp'

const PaymentSuccessModal = ({ successOpen, setSuccessOpen }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        setSuccessOpen(false)
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [setSuccessOpen])

  return (
    <>
      {successOpen ? (
        <>
          <div
            className='flex fixed justify-center items-center inset-0 z-50 backdrop-blur-sm backdrop-brightness-50'
          >
            <div
              ref={modalRef}
              className='max-w-[640px] w-full'
            >
              {/*content*/}
              <div className='flex flex-col w-full bg-white rounded-md'>
                {/*header*/}
                <section className='flex flex-col'>
                  <div className="flex justify-end pt-10 pr-10">
                    <button
                      onClick={() => setSuccessOpen(false)}
                    >
                      <CloseSvgIcon />
                    </button>
                  </div>
                </section>
                {/*body*/}
                <section className='flex flex-col justify-center px-16'>
                  <div className='flex flex-col items-center'>
                    <img
                      src={CheckIcon}
                      alt='check'
                      className=' w-[90px] h-[90px]'
                    />
                    <h3 className=' font-graphik-bold text-2xl text-headers tracking-[0.7px] mt-2'>
                      {`Successful`}
                    </h3>
                  </div>
                  <div className='flex flex-col mt-4'>
                    <p className=' font-graphik-regular text-lg text-headers opacity-70'>
                      {`Your funds (along with the property NFTs) have been transferred to a holding wallet controlled by a smart contract. once all NFTs have been sold and SPV created then your NFTs will be transferred to your personal wallet.`}
                    </p>
                    <p className=' font-graphik-regular text-lg text-headers opacity-70 mt-6'>
                      {`The property will then be automatically allocated to a verified letting agent which will manage the property on behalf of you. you will receive ongoing rental income ( Less management fees) while you are still the owner of the NFTs.`}
                    </p>
                    <p className=' font-graphik-regular text-lg text-headers opacity-70 mt-6'>
                      {`Note: Should all the specific property NFTs not be sold or the transaction dose not get through verification, your funds will be returned.`}
                    </p>
                  </div>
                  <div className=' flex flex-row justify-center'>
                    <button
                      onClick={() => setSuccessOpen(false)}
                      className=' flex w-[135px] h-[53px] rounded-lg bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[2px] hover:scale-[1.01] active:scale-100 hover:shadow-sm my-10'>
                      <div className=' flex flex-row items-center justify-center w-full h-full rounded-[7px] bg-white'>
                        <h5 className=' font-dmsans-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] uppercase'>
                          {`Okay`}
                        </h5>
                      </div>
                    </button>
                  </div>
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

export default PaymentSuccessModal
