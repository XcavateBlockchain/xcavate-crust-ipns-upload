import React from 'react'
import { useNavigate } from 'react-router-dom'
import illustration from '../assets/common/ilustration.png'
import AssetCard from './cards/AssetCard'
import { data } from '../utils/assets'
import { DoubleArrowSvgIcon } from '../assets/icons'

const Home = () => {
  const navigate = useNavigate()

  const explore = () => {
    navigate(`/market-place`)
  }

  return (
    <>
      <div className='flex justify-center flex-col  items-center h-auto'>
        <div className='w-2/3 p-4 text-center mt-12 flex justify-center items-center flex-col rounded-lg sm:p-8 '>
          <img src={illustration} className=' illustration' alt='Ilustration' />
          <h5 className='font-graphik-bold mb-[10px] text-5xl heading uppercase'>
            WELCOME TO THE LARGEST GLOBAL WEB3 REAL ESTATE INVESTOR COMMUNITY
          </h5>
          <p className=' font-dmsans-regular text-2xl text-body'>
            {`Buy, sell & trade real world rental real estate through NFTs in a trustless, fully decentralized way`}
          </p>
          <button
            onClick={explore}
            className=' flex flex-row items-center justify-center w-[213px] h-14 rounded-lg border-2 border-solid border-form opacity-80 mt-8'
          >
            <h5 className=' font-graphik-medium text-lg text-body mr-2 uppercase'>
              {`Explore now`}
            </h5>
            <DoubleArrowSvgIcon />
          </button>
        </div>
        <div className='grid grid-cols-3 w-full xl:w-2/3 gap-4 mb-20 mt-16'>
          <AssetCard item={data[0]} isHome={true} company={'https://xcavate.io/assets/chase-new-homes-logo.png'} />
          <AssetCard item={data[2]} isHome={true} company={'https://xcavate.io/assets/USA_Developments_logo.png'} />
          <AssetCard item={data[3]} isHome={true} company={'https://xcavate.io/assets/chase-new-homes-logo.png'} />
        </div>
      </div>
    </>
  )
}

export default Home
