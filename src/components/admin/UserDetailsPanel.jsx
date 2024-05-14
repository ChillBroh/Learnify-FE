import React, { useEffect, useState } from 'react'
import axios from '../../util/AxiosInstance'
import UserUpdateModel from './UserUpdateModel'
import Loader from '../Loader'

export default function UserDetailsPanel() {

  const [userData, setUserData] = useState('')
  const [updateModel, setUpdateModel] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserDetails()
  }, [updateModel])

  const getUserDetails = async () => {
    const user = localStorage.getItem('jsonwebtoken')
    const userData = JSON.parse(user)
    const userID = userData.decodedJWT.userId


    const res = await axios.get(`user/common/user/${userID}`)

    if (res.status == 200) {
      setUserData(res.data)
      setLoading(false)
    }
  }

  const toggleUpdateModel = () => {
    if (updateModel) {
      setUpdateModel(false)
    } else {
      updateModel(true)
    }
  }

  return (
    <div className=' flex flex-col mt-16 p-5 h-[68vh] justify-between bg-white rounded-lg shadow'>

      {loading ? (
        <div className=' w-full h-full'>
          <Loader />
        </div>
      ) : (
        <div className='flex flex-col text-[#575757]'>
          <div className='flex justify-center items-center flex-col p-5 font-FuturaMdBt'>
            <img src={userData.image} className='w-28 h-28 rounded-full my-5' />
            <span className=' text-3xl font-bold'>{userData.userName}</span>
          </div>
          <div className=' flex flex-col justify-between'>
            <div className=' flex flex-col items-start'>
              <span className='text-lg'>My email </span>
              <span className=' text-sm'>{userData.email}</span>
            </div>
            <div className=' flex flex-col items-start mt-10'>
              <span className='text-lg'>My contact no </span>
              <span className='text-sm'>{userData.mobileNo}</span>
            </div>
          </div>
        </div>
      )}
      <div className='flex place-self-end items-end'>
        <span className=' px-5 py-2 border-blue-500 border-2 rounded-2xl text-[#575757] font-semibold hover:scale-105 cursor-pointer hover:text-white hover:bg-blue-500 hover:border-0' onClick={() => setUpdateModel(true)}>update</span>
      </div>
      <UserUpdateModel open={updateModel} onClose={() => toggleUpdateModel()} user={userData} />

    </div>
  )
}