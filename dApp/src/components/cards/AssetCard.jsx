import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { BsHeart } from 'react-icons/bs'
import { BathAndShowerSvgIcon, BedSvgIcon } from '../../assets/icons'
const AssetCard = ({ item, isHome, company }) => {
  return (
    <>
      <div className={`max-w-sm mt-2 bg-white relative ${!isHome ? 'h-[25rem]' : 'h-[90%]'} asset-card rounded-lg shadow-md `}  >
        <div className={`w-[100%] overflow-hidden ${!isHome ? 'h-[48%]' : 'h-[58%]'}`}>
          <img className='rounded-t-lg' src={item.photo2} alt='hello' />
        </div>
        {!isHome ? <div className='p-3 absolute top-0'>
          <span className='text-orange-500 border text-xs font-medium mr-2 px-2.5 py-0.5 rounded backdrop-blur-3xl'>
            Verified
          </span>
        </div> : <div className='absolute p-2 backdrop-blur-3xl backdrop-brightness-50 flex justify-center rounded-md items-center right-5 top-5'>
          <span className='rounded backdrop-blur-3xl'>
            <BsHeart size={20} color='white' />
          </span>
        </div>}
        <div className='p-5 '>
          <div className='flex justify-between'>
            <h5 className='mb-2 text-1xl font-graphik-bold text-base text-headers tracking-[0.4px]'>
              {item.title}
            </h5>
            <h5 className='mb-2 text-1xl font-dmsans-bold text-sm text-headers tracking-[0.35px]'>
              £ {item.listingPrice}
            </h5>
          </div>
          <div className='flex'>
            <a className='flex' href={item.googleMapCode}>
              <HiOutlineLocationMarker className='text-blue-400' size={22} />
              <h5 className=' font-graphik-regular mx-2 text-sm tracking-[0.35px] text-body'>
                {item.address}
              </h5>
            </a>
          </div>
          <div className='mt-2 flex justify-between '>
            <div className='mt-3 flex'>
              <span className='flex'>
                <BedSvgIcon width={20} height={20} />
                <h5 className=' font-dmsans-regular text-sm text-body tracking-[0.35px] ml-2'>
                  1
                </h5>
              </span>
              <span className='flex ml-4'>
                <BathAndShowerSvgIcon width={20} height={20} />
                <h5 className=' font-dmsans-regular text-sm text-body tracking-[0.35px] ml-2'>
                  1
                </h5>
              </span>
            </div>
            <img
              className='w-12 h-12 bg-black rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
              src={company ? company : item.company}
              alt='Bordered avatar'
            />
          </div>
          {!isHome ? (
            <>
              <div className='mt-5 flex justify-between'>
                <button className='inline-flex button items-center px-5 py-1 text-sm text-center text-white rounded-lg '>
                  Buy
                </button>
                <div className='flex w-[75%]'>
                  <button
                    href={item.floorPlan}
                    className='block w-full border border-[#2F8BB2] text-[#2f8bb2] items-center px-3 py-2 text-sm text-center rounded-lg'
                  >
                    Details
                  </button>

                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default AssetCard
