import React, { useState } from 'react'
import LoanRequestModal from '../../modals/LoanRequestModal'
import LoanRequestDetailModal from '../../modals/LoanRequestDetailModal'
import LoanRequestSubmitModal from '../../modals/LoanRequestSubmitModal'
import { create, getLoansByUser } from '../../../api/loan'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import LoanRequestItem from './LoanRequestItem'

const DevelopmentLoan = () => {
  const [active, setActive] = useState('request')
  const [isOpen, setIsOpen] = useState(false)
  const [detailIsOpen, setDetailIsOpen] = useState(false)
  const [submistIsOpen, setSubmitIsOpen] = useState(false)
  const [loan, setLoan] = useState({
    planningPermissionCode: '',
    planningAuthority: '',
    landTitleDeedCode: '',
    companyUrl: 'www.planningpermisionapplication.dev',
    companyName: 'Briks and blocks limited',
    companyPhoneNumber: '094523546',
    companyDirector: 'John Deo',
    address: '',
    landValue: '',
    totalGDV: '',
    duration: '',
    amount: '',
    currency: '',
    repaymentMethod: '',
    developmentPlan: null,
    elevationCGIS: null,
    pricingSchedule: null,
  })
  const [loading, setLoading] = useState(false)
  const [loans, setLoans] = useState([])

  const getLoans = async () => {
    try {
      const result = await getLoansByUser()
      console.log('result :: ', result)
      if (result.status === 200) {
        setLoans(result.data.data)
      }
    } catch (error) {
      console.log('error :: ', error)
    }
  }

  useEffect(() => {
    getLoans()
  }, [])

  const submit = async () => {
    try {
      setLoading(true)

      const formData = new FormData()
  
      formData.append('planningPermissionCode', loan.planningPermissionCode)
      formData.append('planningAuthority', loan.planningAuthority)
      formData.append('landTitleDeedCode', JSON.stringify(loan.landTitleDeedCode))
      formData.append('companyUrl', loan.companyUrl)
      formData.append('companyName', loan.companyName)
      formData.append('companyPhoneNumber', loan.companyPhoneNumber)
      formData.append('companyDirector', loan.companyDirector)
      formData.append('address', loan.address)
      formData.append('landValue', loan.landValue)
      formData.append('totalGDV', loan.totalGDV)
      formData.append('duration', loan.duration)
      formData.append('amount', loan.amount)
      formData.append('currency', loan.currency)
      formData.append('repaymentMethod', loan.repaymentMethod)
      formData.append('developmentPlan', loan.developmentPlan)
      formData.append('elevationCGIS', loan.elevationCGIS)
      formData.append('pricingSchedule', loan.pricingSchedule)
  
      const result = await create(formData)
      if (result?.status === 201 && result?.data?.data) {
        setLoading(false)
        toast.success('Created a new loan request successfully')
        setSubmitIsOpen(false)
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
    <div className='px-4 py-10 container'>
      {/* buttons */}
      <div className='flex flex-row justify-between items-center mt-6'>
        <div className='flex flex-row items-center'>
          <button
            onClick={() => setActive('request')}
            className={`flex flex-row items-center justify-center w-[159px] h-[52px] ${active === 'request'? 'bg-[#2F90B6]' : 'bg-white'} border border-solid border-[#2FA2C8]`}
          >
            <h4 className={`font-graphik-regular text-lg ${active === 'request'? 'text-[#D9E3EA]' : 'text-[#2F8BB2]'}`}>
              {`Loan request`}
            </h4>
          </button>
          <button
            onClick={() => setActive('status')}
            className={`flex flex-row items-center justify-center w-[159px] h-[52px]  ${active === 'status'? 'bg-[#2F90B6]' : 'bg-white'} border border-solid border-[#2FA2C8]`}
          >
            <h4 className={`font-graphik-regular text-lg ${active === 'status'? 'text-[#D9E3EA]' : 'text-[#2F8BB2]'}`}>
              {`Loan status`}
            </h4>
          </button>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className=' flex w-[159px] h-[54px] rounded bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%] p-[1px] hover:scale-[1.01] active:scale-100 hover:shadow-sm'>
          <div className=' flex flex-row items-center justify-center w-full h-full rounded bg-white'>
            <h5 className=' font-graphik-regular text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]'>
              {`Request Loan`}
            </h5>
          </div>
        </button>
      </div>
      {/* loan request */}
      {active === 'request' && <div className=' mt-12'>
        {loans.length > 0 && loans.map((loan, index) => (
          <LoanRequestItem key={index} loan={loan} setLoans={setLoans} />
        ))}
      </div>}
      <LoanRequestModal isOpen={isOpen} setIsOpen={setIsOpen} setDetailIsOpen={setDetailIsOpen} loan={loan} setLoan={setLoan} />
      <LoanRequestDetailModal isOpen={detailIsOpen} setIsOpen={setDetailIsOpen} setSubmitIsOpen={setSubmitIsOpen} />
      <LoanRequestSubmitModal isOpen={submistIsOpen} setIsOpen={setSubmitIsOpen} loan={loan} setLoan={setLoan} submit={submit} loading={loading} />
    </div>
  )
}

export default DevelopmentLoan
