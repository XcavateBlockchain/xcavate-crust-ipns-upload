import React from 'react'
import Logo from '../../assets/webp/logo_bg.webp'

const SummaryCard = ({ title, value }) => {
  return (
    <>
      <div className=' relative max-w-lg bg-white shadow-[0px_1.57619047164917px_12.60952377319336px_0px_rgba(0,0,0,0.08)]'>
        <div className=' p-5'>
          <h5 className=' font-graphik-bold text-base xl:text-xl text-headers opacity-80'>
            {title}
          </h5>
          <div className=' flex justify-center items-center w-full mt-5'>
            <h5 className=' font-graphik-medium text-headers opacity-60 text-lg xl:text-2xl'>
              {value}
            </h5>
          </div>
          <h3 className='text-white mt-1 mb-1'>{value}</h3>
        </div>
        <img
          src={Logo}
          alt='background'
          className=' absolute right-0 bottom-0 w-1/2 xl:w-1/3 object-cover grayscale opacity-20'
        />
      </div>
    </>
  )
}

export default SummaryCard
