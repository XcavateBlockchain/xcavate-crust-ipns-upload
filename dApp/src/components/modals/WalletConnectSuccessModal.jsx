import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setDid, setSuccessWalletModal, setToken, setUserData } from '../../redux/features/userSlice'
import Congrates from '../../assets/webp/congrates.webp'
import {
  apiWindow,
  getCompatibleExtensions,
} from '../../utilities/session'
import { connectDid } from '../../api/user'
import { toast } from 'react-toastify'

const WalletConnectSuccessModal = () => {
  const { kilt } = apiWindow
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalRef = useRef(null)
  const user = useSelector((state) => state.user)
  const [extensions, setExtensions] = useState(getCompatibleExtensions());

  const closeModal = useCallback( () => {
    dispatch(setSuccessWalletModal(false))
  }, [dispatch])
  
  useEffect(() => {
    function handler() {      
      setExtensions(getCompatibleExtensions())
    }

    window.dispatchEvent(new CustomEvent('kilt-dapp#initialized'))
    window.addEventListener('kilt-extension#initialized', handler)
    return () =>
      window.removeEventListener('kilt-extension#initialized', handler)
  }, [])

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }
    window.addEventListener('mousedown', handler)

    return () => {
      window.removeEventListener('mousedown', handler)
    }
  }, [closeModal])

  const verifyIdentify = useCallback(
    async (extension) => {
      try {
        if (kilt && kilt[extension]) {
          const didList = await kilt[extension].getDidList()
          if (didList.length > 0) {
            const did = didList[0].did || ''
            dispatch(setDid(did))
            closeModal()
            
            const connectDidResult = await connectDid({did,})
            console.log('connect did result :: ', connectDidResult)
            if (connectDidResult?.status === 204) {
              navigate('/link-credential')
            } else if (connectDidResult?.status === 202 && connectDidResult?.data?.data) {
              const data = connectDidResult?.data?.data
              const userData = data?.user || {}
              const token = data?.token || ''
              dispatch(setUserData(userData))
              dispatch(setToken(token))
              navigate('/profile')
            } else {
              toast.info('Please contact XCavate admin')
            }
          } else {
            closeModal()
            navigate('/did-payment')
          }
        }
      } catch (error) {
        toast.info(`${error?.response?.statusText || 'Unexpected error'}`)
      }
    },
    [kilt, closeModal, dispatch, navigate],
  )

  return (
    <>
    {user?.successWalletModal ? (
      <>
        <div
          className='flex fixed justify-center items-center inset-0 z-50 backdrop-blur-sm backdrop-brightness-50'
        >
          <div
            ref={modalRef}
            className='max-w-[563px] w-full'
          >
            {/*content*/}
            <div className='flex flex-col w-full bg-white rounded-md border-2 border-solid border-black shadow-[0px_1.522387981414795px_13.701492309570312px_0px_rgba(0,0,0,0.18)]'>
              {/*body*/}
              <section className='flex flex-col items-center mt-[69px]'>
                <img
                  alt='congrates'
                  src={Congrates}
                  width={60}
                  height={60}
                />
                <h3 className=' text-center font-graphik-bold text-[28px] text-[#1C1F20] tracking-[0.7px] mt-3'>
                  {`Wallet Connect Successful`}
                </h3>
                <div className='px-[30px] mt-4'>
                  <h5 className=' text-center font-graphik-light text-lg text-[#151719] leading-[143.7%] opacity-[0.7]'>
                    {`We would need you to verify your identity before you can list or invest in properties. This typically involves submitting personal information and supporting documents, such as a government-issued ID or proof of address. `}
                  </h5>
                </div>
                <button onClick={() => verifyIdentify(extensions[0])} className=' w-[213px] h-[60px] rounded-lg mt-[21px] bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[2px]'>
                  <div className=' flex flex-row items-center justify-center w-full h-full rounded-[7px] bg-white'>
                    <h5 className=' font-graphik-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'>
                      {`Verify Identity`}
                    </h5>
                  </div>
                </button>
                <h5 className=' font-graphik-light text-lg text-[#1C1F20] mt-4 mb-[45px] cursor-pointer' onClick={() => closeModal(0)}>
                  {`Later`}
                </h5>
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

export default WalletConnectSuccessModal
