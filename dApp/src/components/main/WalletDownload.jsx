import React from 'react'
import { ArrowPrevSvgIcon, WalletSvgIcon } from '../../assets/icons'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/webp/logo.webp'

const WalletDownload = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  const goWalletDownload = () => {
    window.open(`https://www.sporran.org`, '_blank')
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
        <div className='flex items-center justify-center w-[171px] h-[171px] rounded-full bg-[#D9D9D9]'>
          <WalletSvgIcon width={102} height={102} />
        </div>
        <h3 className=' font-graphik-bold text-[28px] leading-[30px] tracking-[2.5%] mt-6'>
          {`Sporran Wallet`}
        </h3>
        <div className='inline w-[684px] text-center font-graphik-light text-lg opacity-[0.8] mt-4'>
          <h5 className='inline text-[#151719]'>
            {`You do not have a sporran wallet extension linked to your browser. Create your sporran wallet by Visiting `}
          </h5>
          <h5 className='inline text-[#2F80ED] cursor-pointer' onClick={() => goWalletDownload()}>
            {`here `}
          </h5>
          <h5 className='inline text-[#151719]'>
            {`and downloading the browser app.`}
          </h5>
        </div>
        <a href='https://www.sporran.org' target='_blank' rel="noreferrer">
          <h4 className=' font-graphik-light text-lg text-[#2454DA] opacity-[0.8] mt-10'>
            {`https://www.sporran.org`}
          </h4>
        </a>
        <img
          alt='logo'
          src={Logo}
          width={47}
          height={47}
          className='mt-[100px]'
        />
      </div>
    </section>
  )
}

export default WalletDownload
