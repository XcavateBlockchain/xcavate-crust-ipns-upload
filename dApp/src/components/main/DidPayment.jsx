import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowPrevSvgIcon } from '../../assets/icons'

const DidPayment = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  const goLinkCredentails = () => {
    navigate('/link-credential')
  }

  return (
    <section className='mt-36'>
      {/* breadcrumb */}
      <div className='flex items-center pl-[30px] cursor-pointer' onClick={() => goHome()}>
        <span className='mr-1'>
          <ArrowPrevSvgIcon />
        </span>
        <h5 className=' font-graphik-medium text-xl text-[#151719] opacity-[0.8]'>
          {`Back`}
        </h5>
      </div>
      {/* body */}
      <div className='flex flex-col w-full h-[100vh] items-center justify-center'>
        <h4 className=' font-graphik-bold text-xl text-[#151719] tracking-[0.5px]'>
          {`Create your Decentralized Identifier (DID)`}
        </h4>
        <h5 className='w-[680px] text-center font-graphik-light text-lg text-[#151719] tracking-[0.45px] mt-4'>
          {`You would need to make a deposit to create your DID. This is a token which would be refunded if you disconnect your DID. `}
        </h5>
        <div className=' flex flex-col justify-center w-[680px] bg-white rounded-lg px-[38px] py-6 mt-10'>
          <h5 className=' font-graphik-medium text-base tracking-[0.4px] text-[#151719]'>
            {`Payment option`}
          </h5>
          <div className='flex flex-col w-full border-2 border-solid border-[#FAFAFA] bg-[rgba(250,250,250,0.10)] mt-2 p-4 rounded-lg'>
            <div className='flex flex-row items-center'>
              {/* radio button */}
              <div className='w-5 h-5 rounded-full bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[2px] mr-2'>
                <div className='flex flex-row items-center justify-center w-full h-full rounded-full bg-white'>
                  <div className='w-[10px] h-[10px] rounded-full bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'>
                  </div>
                </div>
              </div>
              <h4 className=' font-graphik-bold text-lg text-[#151719] tracking-[0.45px] opacity-[0.8]'>
                {`Pay with KILT`}
              </h4>
            </div>
            <h5 className=' font-graphik-light text-lg text-[rgba(21,23,25,0.80)] tracking-[0.45px] opacity-[0.8] mt-4'>
              {`To use this option you would have to have at least 2.0582 KILTs as Fee`}
            </h5>
          </div>
          <button className='flex flex-row justify-center items-center w-full h-[60px] bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] rounded-lg mt-4' onClick={() => goLinkCredentails()}>
            <h5 className=' font-graphik-medium text-lg text-white'>
              {`Continue to payment`}
            </h5>
          </button>
        </div>
      </div>
    </section>
  )
}

export default DidPayment
