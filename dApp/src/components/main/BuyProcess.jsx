import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPropertyById } from '../../api/property'
import { ArrowPrevSvgIcon } from '../../assets/icons'
import PropertyItem from '../partials/buy/PropertyItem'
import BuyProceedModal from '../modals/BuyProceedModal'
import { useSubstrateState } from '../../contexts/SubstrateContext'
import PaymentSuccessModal from '../modals/PaymentSuccessModal'

const BuyProcess = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { api } = useSubstrateState()
  const [property, setProperty] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [availableNFTs, setAvailableNFTs] = useState(0)
  const [owner, setOwner] = useState('')
  const [nftPrice, setNftPrice] = useState('')
  const [collectionId, setCollectionId] = useState('')
  const [successOpen, setSuccessOpen] = useState(false)

  const getProperty = useCallback( async (propertyId) => {
    const result = await getPropertyById(propertyId)
    if (result?.status === 200) {
      const _property = result?.data?.data
      setNftPrice(Math.round(Number(_property?.price) / 100))
      setProperty(_property)

      if (_property?.collect) {
        const collection = _property?.collect
        
        if (api && collection?.owner && collection?.id) {
          setOwner(collection?.owner)
          setCollectionId(collection?.id)
          const result = await api.query.uniques.account.entries(collection?.owner, collection?.id)
      
          if (result.length > 0) {
            const soldNFTs = result.filter(([key]) => {
              const [address] = key.args
              return address.toString() !== collection?.owner?.toString()
            })
            setAvailableNFTs(result.length - soldNFTs.length)
          }
        }
      }
    }
  }, [api])

  useEffect(() => {
    if (params?.id) {
      getProperty(params.id)
    }
  }, [params, getProperty])

  const back = () => {
    navigate(-1)
  }

  return (
    <section>
      <div className='container mt-[7rem] mx-auto px-5'>
        <div className='flex flex-row items-center cursor-pointer' onClick={back}>
          <ArrowPrevSvgIcon />
          <h2 className=' font-graphik-regular text-body text-lg tracking-[0.45px] ml-2'>
            {`Back`}
          </h2>
        </div>
        {/* content */}
        <div className=' flex flex-row mt-10'>
          <div className=' flex flex-row justify-center w-2/3'>
            <div className=' flex flex-col w-1/2'>
              <h3 className=' font-graphik-bold text-xl text-body opacity-80 tracking-[0.5px]'>
                {`Transaction review`}
              </h3>
              <p className=' font-graphik-regular text-lg text-body opacity-50 tracking-[0.45px] mt-2'>
                {`Please check this over carefully to confirm all details are correct before proceeding with the transaction`}
              </p>
              <div className='flex flex-col mt-9'>
                <PropertyItem label={`Property name`} value={property?.name || ''} />
                <PropertyItem className=' mt-6' label={`Developer's name`} value={property?.user?.fullName || ''} />
                <PropertyItem className=' mt-6' label={`Property type`} value={property?.features?.f_property_type || ''} />
                <PropertyItem className=' mt-6' label={`Price per NFTs`} value={`${Math.round(Number(property?.price) / 100)} XCAV`} />
                <button
                  onClick={() => setIsOpen(true)}
                  className=' flex flex-row items-center justify-center h-[53px] rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] my-10'
                >
                  <h5 className=' font-dmsans-bold text-base text-white uppercase'>
                    {`Proceed`}
                  </h5>
                </button>
              </div>
            </div>
          </div>
          <div className=' w-1/3'>
            <img
              src={property?.images[0] || ''}
              className=' w-full object-cover'
              alt='property'
            />
          </div>
        </div>
      </div>
      <BuyProceedModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        availableNFTs={availableNFTs}
        owner={owner}
        nftPrice={nftPrice}
        collectionId={collectionId}
        setSuccessOpen={setSuccessOpen}
      />
      <PaymentSuccessModal
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
      />
    </section>
  )
}

export default BuyProcess
