import React from 'react'
import { useSelector } from 'react-redux'

const ProfileDatailTab = () => {
  const user = useSelector((state) => state.user)

  const openDocument = (link) => {
    window.open(link, '_blank')
  }

  return (
    <div className=' container bg-white rounded-b-lg mt-6 p-10'>
      <div className=' flex flex-col'>
        {/* id */}
        <div className=' flex flex-row justify-between items-center'>
          <div className=' flex flex-row items-center'>
            <h4 className=' font-graphik-medium text-2xl text-headers opacity-50 tracking-[0.6px] mr-4'>
              {`ID: #${user?.userData?._id || ''}`}
            </h4>
            {!user?.userData?.isVerified && 
              <h4 className=' font-graphik-regular text-2xl text-progress'>
                {`Verification in progress`}
              </h4>
            }
          </div>
          <button
            className=' flex w-[159px] h-[59px] rounded-lg bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[2px] hover:scale-[1.01] active:scale-100 hover:shadow-sm'
          >
            <div className=' flex flex-row items-center justify-center w-full h-full rounded-[7px] bg-white'>
              <h5 className=' font-dmsans-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] uppercase'>
                {`Add Company`}
              </h5>
            </div>
          </button>
        </div>
        {/* personal information */}
        <h3 className=' font-graphik-bold text-headers text-2xl opacity-80 tracking-[0.6px] mt-10'>
          {`Personal  Information`}
        </h3>
        <div className=' w-full h-[1px] mt-6 bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'></div>
        <div className=' flex flex-row w-full mt-6'>
          <div className=' flex flex-col w-1/2 lg:w-1/3'>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.5px]'>
              {`Name:`}
            </h4>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.5px] mt-10'>
              {`Email:`}
            </h4>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.5px] mt-10'>
              {`Phone number:`}
            </h4>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.5px] mt-10'>
              {`Address:`}
            </h4>
          </div>
          <div className=' flex flex-col w-1/2 lg:w-2/3'>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.6px]'>
              {user?.userData?.fullName || ''}
            </h4>
            <h4 className=' font-graphik-regular text-xl text-headers tracking-[0.6px] mt-10'>
              {user?.userData?.email || ''}
            </h4>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.6px] mt-10'>
              {user?.userData?.phoneNumber || ''}
            </h4>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.6px] mt-10'>
              {user?.userData?.address || ''}
            </h4>
          </div>
        </div>
        {/* document */}
        <h3 className=' font-graphik-bold text-headers text-2xl opacity-80 tracking-[0.6px] mt-10'>
          {`Identification  Documents`}
        </h3>
        <div className=' w-full h-[1px] mt-6 bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'></div>
        <div className=' flex flex-row w-full mt-6'>
          <div className=' flex flex-col w-1/2 lg:w-1/3'>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.5px]'>
              {`Passport/drivers license:`}
            </h4>
            <h4 className=' font-graphik-medium text-xl text-headers tracking-[0.5px] mt-10'>
              {`Utility Bill:`}
            </h4>
          </div>
          <div className=' flex flex-col w-1/2 lg:w-2/3'>
            <h4 className=' font-graphik-regular text-xl text-headers tracking-[0.6px] cursor-pointer' onClick={() => openDocument(user?.userData?.idDoc1 || '')}>
              {`Open the document`}
            </h4>
            <h4 className=' font-graphik-regular text-xl text-headers tracking-[0.6px] cursor-pointer mt-10' onClick={() => openDocument(user?.userData?.idDoc2 || '')}>
              {`Open the document`}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDatailTab
