import React from 'react'
import Logo from '../../assets/webp/logo.webp'
import { toast } from 'react-toastify'
import { updateRole } from '../../api/user'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'

const UserRoleCard = ({role}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const update = async (role) => {
    try {
      if (role) {
        const updateResult = await updateRole({role,})
        if (updateResult?.status === 200 && updateResult?.data?.data) {
          toast.success('Successfully updated')
          const userData = updateResult?.data?.data
          dispatch(setUserData(userData))
          setTimeout(() => {
            navigate('/profile')
          }, 3000);
        }
      } else {
        toast.info('Please select one of the roles')
      }
    } catch (error) {
      console.error(error)
      toast.info('Failed')
    }
  }
  return (
    <li className="relative">
      <input
        type="radio"
        id={role?.id}
        name="roles"
        value={role?.value}
        className="hidden peer"
        required
      />      
      <label
        htmlFor={role?.id}
        className=" flex flex-col justify-center items-center w-full peer-checked:border-blue-600 text-center h-full py-8 px-8 shadow-xl text-white  border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-[lightred] peer-checked:text-lightred "
        onClick={() => update(role?.value)}
      >
        <img
          alt='logo'
          src={Logo}
          width={67}
          height={67}
          className=' opacity-[0.2]'
        />
        <h3 className=" font-graphik-medium text-lg text-body opacity-[0.8] mt-10">
          {role?.label}
        </h3>
      </label>
    </li>
  )
}

export default UserRoleCard
