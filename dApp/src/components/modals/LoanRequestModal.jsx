import React, { useEffect, useRef } from 'react'
import { CloseSvgIcon, SearchSvgIcon } from '../../assets/icons'

const LoanRequestModal = ({ isOpen, setIsOpen, setDetailIsOpen, loan, setLoan }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [setIsOpen])

  const confirmDetail = () => {
    setIsOpen(false)
    setDetailIsOpen(true)
  }

  const handleForm = (e) => {
    const name = e.target.name
    const value = e.target.value

    setLoan({
      ...loan,
      [name]: value,
    })
  }

  return (
    <>
      {isOpen ? (
        <>
          <div
            className='flex fixed justify-center items-center inset-0 z-50 backdrop-blur-sm backdrop-brightness-50'
          >
            <div
              ref={modalRef}
              className='max-w-[580px] w-full'
            >
              {/*content*/}
              <div className='flex flex-col w-full rounded-md bg-[var(--surface-and-boders-surface-primary,#FAFAFA)]'>
                {/*header*/}
                <section className='flex flex-col'>
                  <div className="flex justify-end pt-6 pr-6">
                    <button
                      onClick={() => setIsOpen(false)}
                    >
                      <CloseSvgIcon />
                    </button>
                  </div>
                  <div className="flex flex-col items-center justify-center mt-5">
                    <h2 className=" font-graphik-bold text-lg text-[#1C1F20] tracking-[0.7px]">
                      {`New Land Development Loan Request`}
                    </h2>
                    <h3 className=' font-dmsans-regular text-lg text-body opacity-[0.85]'>
                      {`Enter details to confirm development and land ownership`}
                    </h3>
                  </div>
                </section>
                {/*body*/}
                <section className='flex flex-col justify-center my-9 px-6'>
                  <div className='flex flex-col'>
                    <label className=' font-graphik-semibold text-base text-headers opacity-[0.85]'>
                      {`Planning Permission Code`}
                    </label>
                    <input
                      type='text'
                      value={loan?.planningPermissionCode || ''}
                      name='planningPermissionCode'
                      onChange={(e) => handleForm(e)}
                      placeholder='UK1085745222'
                      className=' w-full h-[51px] items-center font-dmsans-regular text-base text-body opacity-[0.85] border border-solid border-[var(--color-white-200,#E0DCDC)] rounded-lg outline-none pl-4 mt-2'
                    />
                  </div>
                  <div className='flex flex-col mt-4'>
                    <label className=' font-graphik-semibold text-base text-headers opacity-[0.85]'>
                      {`Planning Authority`}
                    </label>
                    <div className='flex flex-row items-center border border-solid border-[var(--color-white-200,#E0DCDC)] rounded-lg mt-2'>
                      <span className=' pl-4 mr-2'>
                        <SearchSvgIcon />
                      </span>
                      <input
                        type='text'
                        value={loan?.planningAuthority || ''}
                        name='planningAuthority'
                        onChange={(e) => handleForm(e)}
                        placeholder='Search'
                        className=' w-full h-[51px] items-center font-dmsans-regular text-base text-body opacity-[0.85] outline-none rounded-lg'
                      />
                    </div>
                  </div>
                  <div className='flex flex-col mt-4'>
                    <label className=' font-graphik-semibold text-base text-headers opacity-[0.85]'>
                      {`Land Title Deed Code`}
                    </label>
                    <input
                      type='text'
                      value={loan?.landTitleDeedCode || ''}
                      name='landTitleDeedCode'
                      onChange={(e) => handleForm(e)}
                      placeholder='BHR111-AB-01'
                      className=' w-full h-[51px] items-center font-dmsans-regular text-base text-body opacity-[0.85] border border-solid border-[var(--color-white-200,#E0DCDC)] rounded-lg outline-none pl-4 mt-2'
                    />
                  </div>
                  <button
                    onClick={confirmDetail}
                    className=' flex flex-row items-center justify-center w-full h-[56px] rounded-md mt-10 bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
                  >
                    <h5 className=' font-graphik-semibold text-lg text-white uppercase'>
                      {`Submit`}
                    </h5>
                  </button>
                </section>
              </div>
            </div>
          </div>
          <div className='opacity-70 fixed inset-0 z-40 bg-purple'></div>
        </>
      ) : null}
    </>
  )
}

export default LoanRequestModal
