import React, { useState, useEffect, useCallback } from 'react'
import { getAllProperties } from '../../api/property'
import EstateAssetCard from '../cards/EstateAssetCard'
import { useSelector } from 'react-redux'

const Marketplace = () => {
  const [properties, setProperties] = useState([])
  const user = useSelector((state) => state.user)

  const getProperties = useCallback( async () => {
    try {
      const result = await getAllProperties()
      if (result.status === 200) {
        const _properties = result.data.data

        if (user?.userData?._id) {
          const _ps = _properties.filter(_p => {
            return _p.user?._id !== user?.userData?._id
          })

          setProperties(_ps)
        } else {
          setProperties(_properties)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [user])

  useEffect(() => {
    getProperties()
  }, [getProperties])

  return (
    <>
      <div className='text-center w-full mt-32'>
        <h2 className=' font-graphik-bold text-2xl text-body opacity-80'>
          {`Explore The Marketplace`}
        </h2>
      </div>
      <div className='px-4  py-10 grid grid-cols-3 gap-4 container mx-auto'>
        {properties.length > 0 && properties.map((item, index) => {
          return <EstateAssetCard key={index} item={item} />
        })}
      </div>
    </>
  )
}

export default Marketplace
