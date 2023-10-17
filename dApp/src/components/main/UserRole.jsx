import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserRoleCard from '../cards/UserRoleCard'
import { ArrowDownSvgIcon, ArrowPrevSvgIcon } from '../../assets/icons'
import Logo from '../../assets/webp/logo.webp'
import { USER_ROLES } from '../../data/mockData'

const UserRole = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }
  
  return (
    <section className=' mt-24'>
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
      <div className='container mx-auto mt-6 flex items-center flex-col'>
        <div className='mt-10 text-center mb-[40px] sm:mb-[16px]'>
          <p className=' font-graphik-bold text-[28px] text-body opacity-[0.8] tracking-[0.7px]'>
            {`What Would Be Your Role ?`}
          </p>
        </div>
        <div className='w-full items-center mt-6'>
          <ul className=' grid w-full gap-10 sm:gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xxl:grid-cols-3'>
            {USER_ROLES.length > 0 && USER_ROLES.map((role, index) => (
              <UserRoleCard key={index} role={role} />
            ))}
          </ul>
        </div>
        <Link to='/market-place' className=' mt-10 mb-2'>
          <h4 className=' font-graphik-regular text-lg text-links'>
            {`Browse Property`}
          </h4>
        </Link>
        <ArrowDownSvgIcon />
        <img
          alt='logo'
          src={Logo}
          width={47}
          height={47}
          className='mt-20 mb-20'
        />
      </div>
    </section>
  )
}

export default UserRole
