import React, { useEffect, useRef } from 'react'

const LoanRequestDetailModal = ({ isOpen, setIsOpen, setSubmitIsOpen }) => {
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

  const submit = () => {
    setIsOpen(false)
    setSubmitIsOpen(true)
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
              className='max-w-[972px] w-full'
            >
              {/*content*/}
              <div className='flex flex-col w-full bg-white rounded-md'>
                {/*body*/}
                <section className='flex flex-row items-center gap-16 my-[157px] px-12'>
                  <div className=' flex flex-col items-center w-2/3'>
                    <h3 className=' font-graphik-bold text-lg text-headers opacity-[0.85]'>
                      {`Development Details`}
                    </h3>
                    <h4 className=' font-dmsans-regular text-lg text-body opacity-[0.85] mt-2'>
                      {`Please fill the required filed below`}
                    </h4>
                    <div className=' w-full mt-9'>
                      <div className=' flex flex-row items-center justify-between'>
                        <h5 className=' font-graphik-semibold text-base text-body opacity-50'>
                          {`Planning Permission Application`}
                        </h5>
                        <h5 className=' font-graphik-regular text-base text-green-500'>
                          {`Approved`}
                        </h5>
                      </div>
                      <div className=' flex flex-row justify-between items-center w-full h-[51px] bg-[#E0DCDC] rounded-lg border border-solid px-4 mt-2'>
                        <h4 className=' font-dmsans-regular text-base text-body opacity-50'>
                          {`UK1085745222`}
                        </h4>
                        <h5 className=' font-dmsans-regular text-base text-links'>
                          {`www.planningpermisionapplication.dev`}
                        </h5>
                      </div>
                    </div>
                    <button
                      onClick={submit}
                      className=' flex w-full h-14 rounded-lg bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[1px] hover:scale-[1.01] active:scale-100 hover:shadow-sm mt-6'>
                      <div className=' flex flex-row items-center justify-center w-full h-full rounded-lg bg-white'>
                        <h5 className=' font-graphik-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] uppercase'>
                          {`CONFIRM DETAILS`}
                        </h5>
                      </div>
                    </button>
                  </div>
                  <div className=' w-1/3'>
                    <div className=' flex flex-col justify-center w-full rounded-lg bg-[#FAFAFA] shadow-[0px_0px_24px_0px_rgba(0,0,0,0.25)] px-7 py-6'>
                      <h2 className=' font-graphik-bold text-lg text-body opacity-50'>
                        {`Land Ownership Details`}
                      </h2>
                      <h3 className=' font-graphik-semibold text-base text-headers opacity-[0.85] mt-5'>
                        {`Company`}
                      </h3>
                      <h3 className=' font-dmsans-regular text-lg text-body opacity-50 mt-1'>
                        {`Briks and blocks limited`}
                      </h3>
                      <h3 className=' font-dmsans-regular text-lg text-body opacity-50 mt-1'>
                        {`094523546`}
                      </h3>
                      <h3 className=' font-graphik-semibold text-base text-headers opacity-[0.85] mt-5'>
                        {`Directors`}
                      </h3>
                      <h3 className=' font-dmsans-regular text-lg text-body opacity-50 mt-1'>
                        {`Director 1 -`} {` John Deo`}
                      </h3>
                    </div>
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

export default LoanRequestDetailModal
