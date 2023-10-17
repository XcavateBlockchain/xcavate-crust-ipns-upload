import React from 'react'
import logo from '../assets/common/logo.png'
import { Link } from 'react-router-dom'
import WalletConnectModal from './modals/WalletConnectModal'
import { useDispatch, useSelector } from 'react-redux'
import { setAddWalletModal } from '../redux/features/userSlice'
import WalletConnectSuccessModal from './modals/WalletConnectSuccessModal'
import { getDidAbbreviation } from '../utils'
import { BellSvgIcon, MoonSvgIcon, WalletSvgIcon } from '../assets/icons'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const toggleWalletModal = () => {
    dispatch(setAddWalletModal(!user?.addWalletModal))
  }

  return (
    <>
      <nav className='bg-white  shadow-sm fixed top-0 left-0 w-full z-20  dark:border-gray-600 '>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a href='/' className='flex items-center'>
            <img src={logo} className='h-12 mr-3' alt='Flowbite Logo' />
          </a>
          <div className='flex flex-row items-center md:order-2'>
            <span className=' mr-3'>
              <MoonSvgIcon />
            </span>
            <span className=' mr-10'>
              <BellSvgIcon opacity={1} />
            </span>
            <button
              type='button'
              onClick={() => toggleWalletModal()}
              className=' flex flex-row items-center justify-center w-40 h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
            >
              <h5 className=' font-graphik-semibold text-base text-white mr-2'>
                {user?.did ? getDidAbbreviation(user?.did) : `CONNECT`}
              </h5>
              <WalletSvgIcon color='white' width={18} height={18} />
            </button>
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-sticky'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1 text-black'
            id='navbar-sticky'
          >
            <ul className='flex flex-col p-4 md:p-0 mt-4 font-graphik-regular text-headers text-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white '>
              <li>
                {/* <a
                  href='#'
                  className='block py-2 pl-3 pr-4 text-white main-color rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                  aria-current='page'
                >
                  Marketplace
                </a> */}
                <Link to='/market-place'>Marketplace</Link>
              </li>
              <li>
                {/* <a
                  href='#'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Dev-Loan
                </a> */}
                <Link to='/real-estate'>Estate</Link>
              </li>
              <li>
                <Link to='#'>Stake</Link>
              </li>
              <li>
                <Link to='/list-property'>List-Property</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <WalletConnectModal />
      <WalletConnectSuccessModal />
    </>
  )
}

export default Navbar
