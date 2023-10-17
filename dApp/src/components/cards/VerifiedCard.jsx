import React from 'react'
import {MdVerified} from 'react-icons/md'
const VerifiedCard = () => {
  return (
    <>
      <div className='relative flex px-10 max-w-sm p-6 justify-center items-center flex-col border border-gray-200 rounded-lg shadow main-color dark:border-gray-700 '>
        <MdVerified color='blue' size={30} className='absolute'  style={{top:'-15px'}} />
        <h5 className='mb-2 mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Verified
        </h5>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          Your credentials has been reviewed and verified, Bob the real estate
          developer. you can now start listing on Xcavate and enjoy the benefits
          we offer, welcome on board.
        </p>
        <a href='#' className='mt-3 text-blue-500 text-sm'>
          I will do this later
        </a>
        <button
          type='button'
          className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none mt-5 rounded-lg border border-gray-200  hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700  dark:text-gray-400 dark:border-gray-600 dark:hover:text-white '
        >
          List a Property
        </button>
      </div>
    </>
  )
}

export default VerifiedCard
