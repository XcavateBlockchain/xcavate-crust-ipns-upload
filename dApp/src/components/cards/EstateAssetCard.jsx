import React from 'react'
import { BathAndShowerSvgIcon, BedSvgIcon, LocationSvgIcon, StatusSvgIcon } from '../../assets/icons'
import { abbreviation } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../../assets/webp/profile_image_placeholder.webp'

const EstateAssetCard = ({ item, listProperty }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const detail = () => {
    navigate(`/property-detail/${item?._id}`)
  }

  const buy = () => {
    navigate(`/buy-process/${item?._id}`)
  }

  return (
    <>
      <div className='max-w-sm mt-2 bg-[#FEFEFE] relative rounded-lg shadow'>
        <img
          className='rounded-t-lg w-[100%] h-[281px] object-cover'
          src={item.images[0] || ''}
          alt='property'
        />
        <div className='p-3 absolute top-0 '>
          {item.isListed ? (
            <span className=' flex flex-row items-center bg-white mr-2 px-2.5 py-0.5 rounded'>
              <StatusSvgIcon color='#2F8BB2' />
              <h5 className=' font-dmsans-regular text-listed text-lg tracking-[0.5px] ml-2'>
                {`Listed`}
              </h5>
            </span>
          ) : item.isVerified ? (
            <span className=' flex flex-row items-center bg-white mr-2 px-2.5 py-0.5 rounded'>
              <StatusSvgIcon color='#00C058' />
              <h5 className=' font-dmsans-regular text-verified text-lg tracking-[0.5px] ml-2'>
                {`Verified`}
              </h5>
            </span>
          ) : (
            <span className=' flex flex-row items-center bg-white mr-2 px-2.5 py-0.5 rounded'>
              <StatusSvgIcon color='#FF8C00' />
              <h5 className=' font-dmsans-regular text-progress text-lg tracking-[0.5px] ml-2'>
                {`Not verified`}
              </h5>
            </span>
          )}
        </div>
        <div className='p-5'>
          <div className='flex justify-between'>
            <h5 className=' font-graphik-bold text-base xl:text-xl text-headers tracking-[0.5px] mb-2'>
              {abbreviation(item.name || '', 20)}
            </h5>
            <h5 className=' font-graphik-bold text-sm xl:text-lg text-headers tracking-[0.5px] mb-2'>
              £{item.price}
            </h5>
          </div>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <div className='flex '>
                <a className='flex items-center' href={item.googleMapCode}>
                  <LocationSvgIcon />
                  <h5 className=' font-graphik-regular text-lg text-body mx-2'>
                    {abbreviation(`${item?.address?.street} ${item?.address?.city} ${item?.address?.zipcode}` || '', 20)}
                  </h5>
                </a>
              </div>
              <div className='flex justify-between mt-5'>
                <div className=' flex flex-row items-center'>
                  <div className='flex mr-4'>
                    <BedSvgIcon color='#151719' />
                    <h5 className=' font-graphik-regular text-lg text-body tracking-[0.45px] ml-2'>
                      {item?.features?.f_number_of_bedrooms || ''}
                    </h5>
                  </div>
                  <div className='flex'>
                    <BathAndShowerSvgIcon color='#151719' />
                    <h5 className=' font-graphik-regular text-lg text-body tracking-[0.45px] ml-2'>
                      {item?.features?.f_number_of_bathrooms || ''}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <img
              src={item?.user?.profileImage || Logo}
              alt='dev-logo'
              className='w-16 h-16 object-cover rounded-full'
            />
          </div>
          <div className='flex mt-7'>
            <button
              onClick={detail}
              className=' flex w-[135px] h-[53px] rounded-lg bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[2px] hover:scale-[1.01] active:scale-100 hover:shadow-sm mr-4'>
              <div className=' flex flex-row items-center justify-center w-full h-full rounded-[7px] bg-white'>
                <h5 className=' font-dmsans-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'>
                  {`View details`}
                </h5>
              </div>
            </button>
            {item.isVerified ? (
              <>
                {!item.isListed && user?.userData?._id === item?.user?._id && <button
                  onClick={() => listProperty(item)}
                  className=' flex flex-row items-center justify-center w-[135px] h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
                >
                  <h5 className=' font-dmsans-bold text-base text-white'>
                    {`List`}
                  </h5>
                </button>}
                {item?.isListed && user?.userData?._id !== item?.user?._id && <button
                  onClick={() => buy()}
                  className=' flex flex-row items-center justify-center w-[135px] h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
                >
                  <h5 className=' font-dmsans-bold text-base text-white'>
                    {`Buy`}
                  </h5>
                </button>}
              </>
            ) : (
              <button
                className=' flex flex-row items-center justify-center w-[135px] h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
              >
                <h5 className=' font-dmsans-bold text-base text-white'>
                  {`Verify`}
                </h5>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default EstateAssetCard
