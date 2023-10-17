import React from 'react'
import { Upload1SvgIcon, Upload2SvgIcon } from '../../assets/icons'
const PropertyInfo = ({ property, setProperty, onChangingPage }) => {
  const handleFileChange = (e) => {
    // const img = {
    //   preview: URL.createObjectURL(e.target.files[0]),
    //   data: e.target.files[0],
    // }
    let name = e.target.name
    if (name.includes('property_image_')) {
      setProperty({
        ...property,
        images: [
          ...property.images,
          e.target.files[0],
        ]
      })
    } else {
      setProperty({
        ...property,
        [name]: e.target.files[0],
      })
    }
  }

  const onFormChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name.includes('f_')) {
      setProperty({
        ...property,
        features: {
          ...property.features,
          [name]: value,
        }
      })
    } else if (['street', 'city', 'zipcode'].includes(name)) {
      setProperty({
        ...property,
        address: {
          ...property.address,
          [name]: value,
        }
      })
    } else {
      setProperty({
        ...property,
        [name]: value,
      })
    }
  }

  const next = async () => {
    onChangingPage(2)
  }

  return (
    <>
      <div className='container  m-auto flex justify-center items-center flex-col h-[100%] rounded-b-lg mt-4'>
        <div className='py-10 px-20 bg-white w-full'>
          <div className='grid md:grid-cols-2 md:gap-6'>
            <div className='relative z-0 w-full mb-6 group'>
              <label
                htmlFor='name'
                className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
              >
                {`Property name`}
              </label>
              <input
                type='text'
                id='name'
                name='name'
                onChange={(e) => onFormChange(e)}
                value={property?.name || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Briks and blocks'
                required
              />
            </div>
            <div className='relative z-0 w-full mb-6 group'>
              <label
                htmlFor='number'
                className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
              >
                {`Property Number`}
              </label>
              <input
                type='text'
                id='number'
                name='number'
                onChange={(e) => onFormChange(e)}
                value={property?.number || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='3/22/1700/HH'
                required
              />
            </div>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='address'
              className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
            >
              {`Property Address`}
            </label>
            <div className='grid md:grid-cols-3 md:gap-3'>
              <input
                type='text'
                id='street'
                name='street'
                onChange={(e) => onFormChange(e)}
                value={property?.address?.street || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Street'
                required
              />
              <input
                type='text'
                id='city'
                name='city'
                onChange={(e) => onFormChange(e)}
                value={property?.address?.city || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='City'
                required
              />
              <input
                type='text'
                id='zipcode'
                name='zipcode'
                onChange={(e) => onFormChange(e)}
                value={property?.address?.zipcode || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Zip code/ postal code'
                required
              />
            </div>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='description'
              className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
            >
              {`Property Description`}
            </label>
            <textarea
              id='description'
              name='description'
              rows='4'
              onChange={(e) => onFormChange(e)}
              value={property?.description || ''}
              className=' border-2 border-solid border-form border-opacity-[0.5] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
              placeholder='Give a brief detail about this property'
            ></textarea>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='features'
              className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
            >
              {`Property features`}
            </label>
            <div className='grid md:grid-cols-3 md:gap-3'>
              <input
                type='text'
                id='f_internal_area'
                name='f_internal_area'
                onChange={(e) => onFormChange(e)}
                value={property?.features.f_internal_area || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Internal area'
                required
              />
              <input
                type='text'
                id='f_finish_quality'
                name='f_finish_quality'
                onChange={(e) => onFormChange(e)}
                value={property?.features.f_finish_quality || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Finish quality'
                required
              />
              <input
                type='text'
                id='f_property_type'
                name='f_property_type'
                onChange={(e) => onFormChange(e)}
                value={property?.features.f_property_type || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Property type'
                required
              />
              <input
                type='text'
                id='f_number_of_bedrooms'
                name='f_number_of_bedrooms'
                onChange={(e) => onFormChange(e)}
                value={property?.features.f_number_of_bedrooms || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Number of bedrooms'
                required
              />
              <input
                type='text'
                id='f_out_door_space'
                name='f_out_door_space'
                onChange={(e) => onFormChange(e)}
                value={property?.features.f_out_door_space || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Out door space'
                required
              />
              <input
                type='text'
                id='f_construction_date'
                name='f_construction_date'
                onChange={(e) => onFormChange(e)}
                value={property?.features.f_construction_date || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Construction date'
                required
              />
              <input
                type='text'
                id='f_number_of_bathrooms'
                name='f_number_of_bathrooms'
                onChange={(e) => onFormChange(e)}
                value={property?.features.f_number_of_bathrooms || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Number of bathrooms'
                required
              />
              <input
                type='text'
                id='f_off_street_parking'
                name='f_off_street_parking'
                onChange={(e) => onFormChange(e)}
                value={property?.features.f_off_street_parking || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Off street parking'
                required
              />
            </div>
          </div>
          <label
            htmlFor=''
            className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
          >
            {`Document upload`}
          </label>
          <div className='mt-5 mb-3 grid grid-cols-2 gap-5'>
            <div className='flex justify-center flex-col'>
              <label
                htmlFor='floorPlanImage'
                className=' font-graphik-regular text-lg text-headers'
              >
                {`Doc 1 (Floor plan file)`}
              </label>
              <div className='flex items-center justify-center w-full mt-1'>
                <label
                  htmlFor='floorPlanImage'
                  className='flex flex-col items-center justify-center w-full h-34 px-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   dark:border-gray-600 dark:hover:border-gray-500'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload2SvgIcon />
                    <p className=' font-graphik-regular text-base text-body leading-[161.4%]'>
                      <span className=' font-graphik-medium'>Click to upload</span>
                    </p>
                  </div>
                  <input
                    type='file'
                    id='floorPlanImage'
                    className='hidden'
                    name='floorPlanImage'
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>
              </div>
            </div>
            <div className='flex justify-center flex-col mx-3'>
              <label
                htmlFor='assignmentImage'
                className=' font-graphik-regular text-lg text-headers'
              >
                {`Doc 2 (DEED Of assignment)`}
              </label>
              <div className='flex items-center justify-center w-full mt-1'>
                <label
                  htmlFor='assignmentImage'
                  className='flex flex-col items-center justify-center w-full h-34 px-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   dark:border-gray-600 dark:hover:border-gray-500'
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload2SvgIcon />
                    <p className=' font-graphik-regular text-base text-body leading-[161.4%]'>
                      <span className=' font-graphik-medium'>Click to upload</span>
                    </p>
                  </div>
                  <input
                    id='assignmentImage'
                    onChange={(e) => handleFileChange(e)}
                    type='file'
                    className='hidden'
                    name='assignmentImage'
                  />
                </label>
              </div>
            </div>
          </div>
          <label
            htmlFor=''
            className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
          >
            {`Property image upload`}
          </label>
          <div className='grid md:grid-cols-4 md:gap-2 mt-2'>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='property_image_1'
                  className='flex flex-col items-center justify-center w-full h-22 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 px-5   dark:border-gray-600 dark:hover:border-gray-500 '
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload1SvgIcon />
                    <p className='mb-2 text-center font-dmsans-regular text-xs text-body'>
                      <span className=' font-dmsans-medium'>Click to upload</span>
                    </p>
                  </div>
                  <input
                    id='property_image_1'
                    accept='image/*'
                    onChange={(e) => handleFileChange(e)}
                    type='file'
                    className='hidden'
                    name='property_image_1'
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='property_image_2'
                  className='flex flex-col items-center justify-center w-full h-22 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 px-5   dark:border-gray-600 dark:hover:border-gray-500 '
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload1SvgIcon />
                    <p className='mb-2 text-center font-dmsans-regular text-xs text-body'>
                      <span className=' font-dmsans-medium'>Click to upload</span>
                    </p>
                  </div>
                  <input
                    id='property_image_2'
                    accept='image/*'
                    onChange={(e) => handleFileChange(e)}
                    type='file'
                    className='hidden'
                    name='property_image_2'
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='property_image_3'
                  className='flex flex-col items-center justify-center w-full h-22 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 px-5   dark:border-gray-600 dark:hover:border-gray-500 '
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload1SvgIcon />
                    <p className='mb-2 text-center font-dmsans-regular text-xs text-body'>
                      <span className=' font-dmsans-medium'>Click to upload</span>
                    </p>
                  </div>
                  <input
                    id='property_image_3'
                    accept='image/*'
                    onChange={(e) => handleFileChange(e)}
                    type='file'
                    className='hidden'
                    name='property_image_3'
                  />
                </label>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='flex items-center justify-center w-full'>
                <label
                  htmlFor='property_image_4'
                  className='flex flex-col items-center justify-center w-full h-22 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 px-5   dark:border-gray-600 dark:hover:border-gray-500 '
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload1SvgIcon />
                    <p className='mb-2 text-center font-dmsans-regular text-xs text-body'>
                      <span className=' font-dmsans-medium'>Click to upload</span>
                    </p>
                  </div>
                  <input
                    id='property_image_4'
                    accept='image/*'
                    onChange={(e) => handleFileChange(e)}
                    type='file'
                    className='hidden'
                    name='property_image_4'
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            type='button'
            onClick={next}
            className=' flex flex-row justify-center items-center w-full h-[60px] rounded-lg mt-12 bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
          >
            <h4 className=' font-dmsans-bold text-lg text-white'>
              {`Next`}
            </h4>
          </button>
        </div>
      </div>
    </>
  )
}

export default PropertyInfo
