import React, { useEffect, useRef, useCallback, useState } from "react"
import { CloseSvgIcon, WalletSvgIcon } from "../../assets/icons"
import { useSelector, useDispatch } from 'react-redux'
import { setAddWalletModal, setSporranSession, setSuccessWalletModal } from '../../redux/features/userSlice'
import SporranWallet from '../../assets/webp/sporran_wallet.webp'
import KeplrWallet from '../../assets/webp/keplr_wallet.webp'
import TrustWallet from '../../assets/webp/trust_wallet.webp'
import { useNavigate } from 'react-router-dom'
import {
  apiWindow,
  getCompatibleExtensions,
  getSession,
} from '../../utilities/session'
import { exceptionToError } from '../../utilities/exceptionToError';

const WalletConnectModal = () => {
  const { kilt } = apiWindow
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalRef = useRef(null)
  const user = useSelector((state) => state.user)

  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [session, setSession] = useState(null)
  const [extensions, setExtensions] = useState(getCompatibleExtensions());

  const closeModal = () => {
    dispatch(setAddWalletModal(false))
  }

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
  
  useEffect(() => {
    function handler() {      
      setExtensions(getCompatibleExtensions())
    }

    window.dispatchEvent(new CustomEvent('kilt-dapp#initialized'))
    window.addEventListener('kilt-extension#initialized', handler)
    return () =>
      window.removeEventListener('kilt-extension#initialized', handler)
  }, [])

  const goWalletDownload = () => {
    closeModal()
    navigate(`/wallet-download`)
  }

  const showSuccessfulModal = () => {
    dispatch(setAddWalletModal(false))
    dispatch(setSuccessWalletModal(true))
  }

  const onConnect = useCallback((session) => {
    setSession(session)
  }, [])

  const handleConnect = useCallback(
    async (extension) => {
      try {
        if (kilt && kilt[extension]) {
          setProcessing(true)
          setError(undefined)
          
          console.log('kilt extension', kilt[extension])
          console.log('session', await getSession(kilt[extension]))
  
          const sporranSession = await getSession(kilt[extension])
         
          onConnect(sporranSession)
          dispatch(setSporranSession(sporranSession))
          dispatch(setAddWalletModal(false))
          dispatch(setSuccessWalletModal(true))
        } else {
          navigate('/wallet-download')
        }
      } catch (exception) {
        const { message } = exceptionToError(exception)
        if (message.includes('closed')) {
          setError('closed')
        } else if (message.includes('Not authorized')) {
          setError('unauthorized')
        } else {
          setError('unknown')
          console.error(exception)
        }
        setProcessing(false)
      }
    },
    [onConnect, kilt],
  )

  return (
    <>
    {user?.addWalletModal ? (
      <>
        <div
          className='flex fixed justify-center items-center inset-0 z-50 backdrop-blur-sm backdrop-brightness-50'
        >
          <div
            ref={modalRef}
            className='max-w-[563px] w-full'
          >
            {/*content*/}
            <div className='flex flex-col w-full bg-white rounded-md'>
              {/*header*/}
              <section className='flex flex-col'>
                <div className="flex justify-end pt-6 pr-6">
                  <button
                    onClick={() => closeModal()}
                  >
                    <CloseSvgIcon />
                  </button>
                </div>
                <div className="flex items-center justify-center mt-8 ">
                  <span className=" mr-2" >
                    <WalletSvgIcon />
                  </span>
                  <h2 className=" font-graphik-bold text-[28px] text-[#1C1F20] tracking-[0.7px]">
                    {`Connect Wallet`}
                  </h2>
                </div>
              </section>
              {/*body*/}
              <section className='flex flex-col mt-6 px-[58px]'>
                <button className="flex items-center justify-between w-full h-[68px] bg-[#151719] px-4 mb-2 rounded" onClick={() => handleConnect(extensions[0])}>
                  <div className="flex items-center">
                    <img
                      alt="sporran wallet"
                      src={SporranWallet}
                      width={48}
                      height={48}
                      className="mr-2"
                    />
                    <h4 className=" font-graphik-medium text-white text-xl opacity-[0.7]">
                      {`Sporran Wallet`}
                    </h4>
                  </div>
                  <h5 className=" font-graphik-light text-white text-base opacity-[0.7]">
                    {`Recommended`}
                  </h5>
                </button>
                <button className="flex items-center justify-between w-full h-[68px] bg-[#151719] px-4 mb-2 rounded" onClick={() => showSuccessfulModal()}>
                  <div className="flex items-center">
                    <img
                      alt="keplr wallet"
                      src={KeplrWallet}
                      width={48}
                      height={48}
                      className="mr-2"
                    />
                    <h4 className=" font-graphik-medium text-white text-xl opacity-[0.7]">
                      {`Keplr Wallet`}
                    </h4>
                  </div>
                  <h5 className=" font-graphik-light text-[#2F80ED] text-base opacity-[0.7]">
                    {`Soon`}
                  </h5>
                </button>
                <button className="flex items-center justify-between w-full h-[68px] bg-[#151719] px-4 rounded">
                  <div className="flex items-center">
                    <img
                      alt="trust wallet"
                      src={TrustWallet}
                      width={48}
                      height={48}
                      className="mr-2"
                    />
                    <h4 className=" font-graphik-medium text-white text-xl opacity-[0.7]">
                      {`Trust Wallet`}
                    </h4>
                  </div>
                  <h5 className=" font-graphik-light text-[#2F80ED] text-base opacity-[0.7]">
                    {`Soon`}
                  </h5>
                </button>
              </section>
              {/* footer */}
              <section className='flex flex-col justify-center mt-4'>
                <div className=" text-center inline font-graphik-light text-base">
                  <h5 className=" inline text-[#151719]">
                    {`By connecting you agree to Xcavate `}
                  </h5>
                  <h5 className=" inline text-[#2F80ED] cursor-pointer">
                    {`Terms & Conditions`}
                  </h5>
                </div>
                <h5 className=" text-center font-graphik-light text-lg text-[#2F80ED] mt-6 mb-[45px] cursor-pointer">
                  {`What is a wallet?`}
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

export default WalletConnectModal
