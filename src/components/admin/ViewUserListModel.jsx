import React, { useEffect, useState } from 'react'
import axios from '../../util/AxiosInstance'
import Loader from '../Loader'

export default function ViewUserListModel({ open, onClose, userType }) {

    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        console.log('User type is : ' + userType)
        getUserList()
    }, [userType])

    const getUserList = async () => {

        if (userType === 'instructor') {
            const res = await axios.get(`user/common/instructor`)

            if (res.status === 200) {
                setUserList(res.data)
                console.log(res.data)
                setLoading(false)

            }

        }

        if (userType === 'admin') {
            const res = await axios.get(`user/common/admin`)

            if (res.status === 200) {
                setUserList(res.data)
                console.log(res.data)
                setLoading(false)
            }

        }

    }

    return (
        <div onClick={onClose} className={` absolute z-[999] inset-0 flex justify-center items-center ${open ? 'visible bg-black/50 ' : 'invisible'}`}>
            {/**Actual modal */}

            <div onClick={(e) => e.stopPropagation()} className={`bg-white p-2 items-start flex flex-row w-fit h-fit rounded-md shadow transition-all ${open ? 'opacity-100' : 'opacity-0'}`}>

                <div className=' flex flex-col w-[50vw] h-[50vh] text-[#575757] items-center'>
                    <div className=' flex py-2 w-full justify-center mb-3'>
                        <span className={`${userType === 'instructor' ? 'block' : 'hidden'} text-2xl text-[#575757] font-semibold`}>Current Instructors List</span>
                        <span className={`${userType === 'admin' ? 'block' : 'hidden'} text-2xl text-[#575757] font-semibold`}>Current Administrators List</span>
                    </div>
                    {loading ? (
                        <div className=' w-full h-full'>
                            <Loader />
                        </div>
                    ) : (
                        <div className=' overflow-auto w-full px-5'>

                            {userList.map((item) => (

                                <div className='w-[90%] flex my-2 justify-between py-2 px-4 border-2 text-[#575757] border-[#575757] font-FuturaMdBt rounded-xl' key={item.id}>
                                    <span>{item.userName}</span>
                                    <span> Mobile no : {item.mobileNo ? item.mobileNo : 'No mobile Number yet'}</span>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                <div className=' text-4xl  cursor-pointer justify-center items-center flex text-[#575757]'>
                    <span onClick={onClose}>&times;</span>
                </div>
            </div>

        </div>
    )
}