import React, { useEffect, useState } from 'react'
import PropertyInfo from '../../utils/Forms/PropertyInfo'
import AdditionalInfo from '../../utils/Forms/AdditionalInfo'
import ListedInfo from '../../utils/Forms/ListedInfo'
import { useSelector } from 'react-redux'
import { VerifiedSvgIcon } from '../../assets/icons'
import { initialize } from '../../utils/Polkadot/index'
import { create } from '../../api/property'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PropertyListing = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [page, setPage] = useState(1)
  const [property, setProperty] = useState({
    name: '',
    number: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
    },
    description: '',
    features: {},
    floorPlanImage: null,
    assignmentImage: null,
    images: [],
    type: '',
    price: '',
    rentalIncome: '',
    developmentNumber: '',
    planningPermissionNumber: '',
    localAuthority: '',
    titleDeadNumber: '',
    googleMapLink: '',
  })
  const [loading, setLoading] = useState(false)

  const onChangingPage = (num) => {
    setPage(num)
  }

  useEffect(() => {
    const start = async () => {
      await initialize()
    }
    start()
  }, [])

  const submit = async () => {
    try {
      setLoading(true)

      const formData = new FormData()
  
      formData.append('name', property.name)
      formData.append('number', property.number)
      formData.append('address', JSON.stringify(property.address))
      formData.append('description', property.description)
      formData.append('features', JSON.stringify(property.features))
      formData.append('floorPlanImage', property.floorPlanImage)
      formData.append('assignmentImage', property.assignmentImage)
      Array.from(property.images).forEach(image => {
        formData.append("images", image)
      })
      formData.append('type', property.type)
      formData.append('price', property.price)
      formData.append('rentalIncome', property.rentalIncome)
      formData.append('developmentNumber', property.developmentNumber)
      formData.append('planningPermissionNumber', property.planningPermissionNumber)
      formData.append('localAuthority', property.localAuthority)
      formData.append('titleDeadNumber', property.titleDeadNumber)
      formData.append('googleMapLink', property.googleMapLink)
  
      const result = await create(formData)
      console.log('result :: ', result)
      if (result?.status === 201 && result?.data?.data) {
        setLoading(false)
        toast.success('Created a new property successfully')
        setTimeout(() => {
          navigate('/profile')
        }, 3000)
      } else {
        setLoading(false)
        toast.warn('Unexpected error occurred')
      }
    } catch (error) {
      setLoading(false)
      console.log('property creation error :: ', error)
      toast.warn(error.toString())
    }
  }

  return (
    <>
      <div className='container mt-20  m-auto flex justify-center items-center flex-col h-[100%]'>
        <label
          htmlFor='dev'
          className=' flex mt-8'
        >
          <h4 className=' font-graphik-bold text-headers text-xl tracking-[0.5px] mr-3'>
            {user?.userData?.fullName || ''}
          </h4>
          <h4 className=' font-graphik-regular text-body text-xl opacity-[0.8] tracking-[0.5px] mr-3'>
            {`#${user?.userData?._id}` || ''}
          </h4>
          <VerifiedSvgIcon />
        </label>
        <div className=' w-full bg-white flex justify-between mt-6 rounded-t-lg p-6'>
          <div className='flex items-center  '>
            <input
              id='bordered-radio-1'
              type='radio'
              checked={page === 1}
              name='info'
              onChange={(e) => onChangingPage(1)}
              className='w-5 h-5'
            />
            <label
              htmlFor='bordered-radio-1'
              className='w-full ml-2 cursor-pointer'
            >
              <h5 className=' font-graphik-bold text-xl text-body tracking-[0.5px]'>
                {`Property Information`}
              </h5>
            </label>
          </div>
          <div className='flex items-center '>
            <input
              id='bordered-radio-2'
              type='radio'
              checked={page === 2}
              name='info'
              onChange={(e) => onChangingPage(2)}
              className='w-5 h-5'
            />
            <label
              htmlFor='bordered-radio-2'
              className='w-full ml-2 cursor-pointer'
            >
              <h5 className=' font-graphik-bold text-xl text-body tracking-[0.5px]'>
                {`Pricing and listing Details`}
              </h5>
            </label>
          </div>
          <div className='flex items-center '>
            <input
              checked={page === 3}
              id='bordered-radio-3'
              type='radio'
              name='info'
              onChange={(e) => onChangingPage(3)}
              className='w-5 h-5'
            />
            <label
              htmlFor='bordered-radio-3'
              className='w-full ml-2 cursor-pointer'
            >
              <h5 className=' font-graphik-bold text-xl text-body tracking-[0.5px]'>
                {`Additional Information`}
              </h5>
            </label>
          </div>
        </div>
        {page === 1 && <PropertyInfo property={property} setProperty={setProperty} onChangingPage={onChangingPage} />}
        {page === 2 && <ListedInfo property={property} setProperty={setProperty} onChangingPage={onChangingPage} />}
        {page === 3 && <AdditionalInfo property={property} setProperty={setProperty} onSubmit={submit} loading={loading} />}
      </div>
    </>
  )
}

export default PropertyListing
