import React, { useEffect, useRef } from 'react'
import { CloseSvgIcon } from '../../assets/icons'

const BaseModal = ({ isOpen, setIsOpen }) => {
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
              <div className='flex flex-col w-full bg-white rounded-md'>
                {/*header*/}
                <section className='flex flex-col'>
                  <div className="flex justify-end pt-10 pr-10">
                    <button
                      onClick={() => setIsOpen(false)}
                    >
                      <CloseSvgIcon />
                    </button>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <h2 className=" font-graphik-bold text-[28px] text-[#1C1F20] tracking-[0.7px]">
                      {`Make Payment`}
                    </h2>
                  </div>
                </section>
                {/*body*/}
                <section className='flex flex-col justify-center my-10 px-16'>
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

export default BaseModal
