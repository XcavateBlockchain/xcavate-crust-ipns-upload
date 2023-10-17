import React, { useEffect, useRef } from 'react'
import { LoadingSvgIcon, Upload2SvgIcon } from '../../assets/icons'

const styles = {
  input: ' flex flex-row items-center w-full h-[51px] px-4 font-dmsans-regular text-base text-body opacity-[0.85] mt-2 rounded border border-solid border-[#E0DCDC] outline-none',
}

const LoanRequestSubmitModal = ({ isOpen, setIsOpen, loan, setLoan, submit, loading }) => {
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

  const handleFileChange = (e) => {
    const name = e.target.name
    setLoan({
      ...loan,
      [name]: e.target.files[0],
    })
  }

  const cancel = () => {
    setIsOpen(false)
  }

  const handleForm = (e) => {
    const name = e.target.name
    const value = e.target.value

    setLoan({
      ...loan,
      [name]: value,
    })
  }

  const loanSubmit = () => {
    submit()
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
              className=' flex flex-col max-w-[1146px] w-full'
            >
              {/*content 1*/}
              <div className='flex flex-col w-full bg-white rounded-md'>
                {/*body*/}
                <section className='grid grid-cols-3 gap-2 px-7 py-10'>
                  <div>
                    <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                      {`Planning permission code`}
                    </label>
                    <input
                      type='text'
                      value={loan?.planningPermissionCode || ''}
                      name='planningPermissionCode'
                      onChange={(e) => handleForm(e)}
                      className={styles.input}
                      placeholder='UK1085745222'
                    />
                  </div>
                  <div>
                    <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                      {`Land title deed number`}
                    </label>
                    <input
                      type='text'
                      value={loan?.landTitleDeedCode || ''}
                      name='landTitleDeedCode'
                      onChange={(e) => handleForm(e)}
                      className={styles.input}
                      placeholder='BHR111-AB-01'
                    />
                  </div>
                  <div>
                    <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                      {`Address`}
                    </label>
                    <input
                      type='text'
                      value={loan?.address || ''}
                      name='address'
                      onChange={(e) => handleForm(e)}
                      className={styles.input}
                      placeholder='352 London'
                    />
                  </div>
                </section>
              </div>
              {/*content 2*/}
              <div className='flex flex-col w-full bg-white rounded-md mt-3'>
                {/*body*/}
                <section className='flex flex-col justify-center px-7 py-10'>
                  <h3 className=' font-graphik-semibold text-2xl text-headers opacity-[0.85]'>
                    {`Loan Details`}
                  </h3>
                  <div className='grid grid-cols-3 gap-2 mt-10'>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        {`Existing  land value`}
                      </label>
                      <input
                        type='text'
                        value={loan?.landValue || ''}
                        name='landValue'
                        onChange={(e) => handleForm(e)}
                        className={styles.input}
                        placeholder='£1,000,000'
                      />
                    </div>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        {`Total GDV`}
                      </label>
                      <input
                        type='text'
                        value={loan?.totalGDV || ''}
                        name='totalGDV'
                        onChange={(e) => handleForm(e)}
                        className={styles.input}
                        placeholder='£3,000,000'
                      />
                    </div>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        {`Loan duration`}
                      </label>
                      <input
                        type='text'
                        value={loan?.duration || ''}
                        name='duration'
                        onChange={(e) => handleForm(e)}
                        className={styles.input}
                        placeholder='6 months'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-3 gap-2 mt-6'>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        {`Loan amount`}
                      </label>
                      <input
                        type='text'
                        value={loan?.amount || ''}
                        name='amount'
                        onChange={(e) => handleForm(e)}
                        className={styles.input}
                        placeholder='£1,000,000'
                      />
                    </div>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        &nbsp;
                      </label>
                      <input
                        type='text'
                        value={loan?.currency || ''}
                        name='currency'
                        onChange={(e) => handleForm(e)}
                        className={styles.input}
                        placeholder='GBP'
                      />
                    </div>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        &nbsp;
                      </label>
                      <input
                        type='text'
                        value={loan?.repaymentMethod || ''}
                        name='repaymentMethod'
                        onChange={(e) => handleForm(e)}
                        className={styles.input}
                        placeholder='Repayment method'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-3 gap-2 mt-6'>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        {`Development plan`}
                      </label>
                      <div className='flex items-center justify-center w-full mt-2'>
                        <label
                          htmlFor='developmentPlan'
                          className='flex flex-col items-center justify-center w-full h-22 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 px-5   dark:border-gray-600 dark:hover:border-gray-500 '
                        >
                          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <Upload2SvgIcon />
                            <p className='mb-2 text-center font-dmsans-regular text-xs text-body'>
                              <span className=' font-dmsans-medium'>Click to upload</span>
                            </p>
                          </div>
                          <input
                            id='developmentPlan'
                            onChange={(e) => handleFileChange(e)}
                            type='file'
                            className='hidden'
                            name='developmentPlan'
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        {`Elevation/ CGIS`}
                      </label>
                      <div className='flex items-center justify-center w-full mt-2'>
                        <label
                          htmlFor='elevationCGIS'
                          className='flex flex-col items-center justify-center w-full h-22 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 px-5   dark:border-gray-600 dark:hover:border-gray-500 '
                        >
                          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <Upload2SvgIcon />
                            <p className='mb-2 text-center font-dmsans-regular text-xs text-body'>
                              <span className=' font-dmsans-medium'>Click to upload</span>
                            </p>
                          </div>
                          <input
                            id='elevationCGIS'
                            onChange={(e) => handleFileChange(e)}
                            type='file'
                            className='hidden'
                            name='elevationCGIS'
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className=' font-graphik-semibold text-lg text-headers opacity-[0.85]'>
                        {`Estimated pricing schedule`}
                      </label>
                      <div className='flex items-center justify-center w-full mt-2'>
                        <label
                          htmlFor='pricingSchedule'
                          className='flex flex-col items-center justify-center w-full h-22 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 px-5   dark:border-gray-600 dark:hover:border-gray-500 '
                        >
                          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <Upload2SvgIcon />
                            <p className='mb-2 text-center font-dmsans-regular text-xs text-body'>
                              <span className=' font-dmsans-medium'>Click to upload</span>
                            </p>
                          </div>
                          <input
                            id='pricingSchedule'
                            onChange={(e) => handleFileChange(e)}
                            type='file'
                            className='hidden'
                            name='pricingSchedule'
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4 mt-10'>
                    <button
                      onClick={cancel}
                      className=' flex w-full h-14 rounded-lg bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[1px] hover:scale-[1.01] active:scale-100 hover:shadow-sm'>
                      <div className=' flex flex-row items-center justify-center w-full h-full rounded-lg bg-white'>
                        <h5 className=' font-graphik-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] uppercase'>
                          {`Cancel`}
                        </h5>
                      </div>
                    </button>
                    <button
                      disabled={loading}
                      onClick={loanSubmit}
                      className=' flex flex-row items-center justify-center w-full h-14 rounded-md bg-gradient-to-r hover:scale-[1.01] hover:shadow-sm active:scale-[1] from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'
                    >
                      {loading? <LoadingSvgIcon /> : <h5 className=' font-graphik-semibold text-lg text-white uppercase'>
                        {`Submit`}
                      </h5>}
                    </button>
                  </div>
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

export default LoanRequestSubmitModal
