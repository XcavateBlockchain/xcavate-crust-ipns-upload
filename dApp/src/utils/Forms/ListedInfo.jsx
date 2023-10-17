import React from 'react'
const ListedInfo = ({ property, setProperty, onChangingPage }) => {
  const onFormChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setProperty({
      ...property,
      [name]: value,
    })
  }

  const next = async () => {
    onChangingPage(3)
  }

  return (
    <>
      <div className='container flex justify-center items-center flex-col mt-4'>
        <div className='py-10 px-10 rounded-sm bg-white w-full flex justify-center items-center  '>
          <div className=' w-full lg:w-1/2'>
            <div className='mb-6'>
              <label
                htmlFor='type'
                className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
              >
                {`Listing Type`}
              </label>
              <input
                type='text'
                id='type'
                name='type'
                onChange={(e) => onFormChange(e)}
                value={property?.type || ''}
                className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                placeholder='Sale'
                required
              />
            </div>
            <div className=''>
              <div className='relative z-0 w-full mb-6 group'>
                <label
                  htmlFor='price'
                  className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
                >
                  {`Listing Price`}
                </label>
                <div className='w-full grid grid-cols-2 gap-4'>
                  <input
                    type='number'
                    id='price'
                    name='price'
                    onChange={(e) => onFormChange(e)}
                    value={property?.price || ''}
                    className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                    placeholder='0.00'
                    required
                  />
                  <input
                    type='number'
                    id='priceXCAV'
                    name='priceXCAV'
                    className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                    placeholder='0.00'
                    required
                  />
                </div>
              </div>
            </div>
            <div className=''>
              <div className='relative z-0 w-full mb-6 group'>
                <label
                  htmlFor='email'
                  className=' font-graphik-medium text-headers text-lg tracking-[0.45px]'
                >
                  {`Estimated Rental Income`}
                </label>
                <div className='grid grid-cols-2 gap-4'>
                  <input
                    type='number'
                    id='rentalIncome'
                    name='rentalIncome'
                    onChange={(e) => onFormChange(e)}
                    value={property?.rentalIncome || ''}
                    className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                    placeholder='0.00'
                    required
                  />
                  <input
                    type='number'
                    id='rentalIncomeXCAV'
                    name='rentalIncomeXCAV'
                    className=' border-2 border-solid border-form border-opacity-[0.5] h-[52px] rounded-lg block w-full outline-none mt-2 p-4 font-graphik-regular text-lg trackign-[0.45px] text-body placeholder:text-headers placeholder:opacity-[0.2]'
                    placeholder='0.00'
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type='button'
              onClick={next}
              className=' flex flex-row justify-center items-center w-full h-[60px] rounded-lg mt-10 bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
            >
              <h4 className=' font-dmsans-bold text-lg text-white'>
                {`Next`}
              </h4>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListedInfo
