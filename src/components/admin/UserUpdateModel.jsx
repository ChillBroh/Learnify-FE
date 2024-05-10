import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from '../../util/AxiosInstance'



export default function UserUpdateModel({ open, onClose, user }) {

    const [UserName, setUserName] = useState(user.userName)
    const [Email, setEmail] = useState(user.email)
    const [Number, setNumber] = useState(user.mobileNo)


    useEffect(() => {
        setUserName(user.userName);
        setEmail(user.email);
        setNumber(user.mobileNo);
    }, [user]);

    const handleUserName = (e) => {
        setUserName(e.target.value)

    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleNumber = (e) => {
        setNumber(e.target.value)
    }

    const handleUpdate = async () => {

        console.log("Stored : " + UserName)

        const payload = {
            userName: UserName,
            email: Email,
            mobileNo: Number
        }

        const res = await axios.patch('user/common/', payload)
        console.log(res.status)
        if (res.status === 200) {

            console.log("tp")

            toast("User details updated successfully!")

           
            console.log("tq")

            setTimeout(function () {
                onClose()
            }, 3000);
            setTimeout();


        }
    }


    return (
        //Background 
        <div onClick={onClose} className={` absolute z-[999] inset-0 flex justify-center items-center ${open ? 'visible bg-black/50 ' : 'invisible'}`}>
            {/**Actual modal */}
            <ToastContainer autoClose={3000} />
            <div onClick={(e) => e.stopPropagation()} className={`bg-white p-2 items-center flex flex-row w-fit h-fit rounded-md shadow transition-all ${open ? 'opacity-100' : 'opacity-0'}`}>

                <div className=' flex w-full  flex-col h-fit items-center'>
                    <span className=' font-semibold font-FuturaMdBt mt-10 text-3xl '>Update My Details</span>
                    <div className=' mx-10 w-[30vw] mt-10 h-10 border-b-2 border-black flex justify-center'>
                        <input type='text' className='pl-5 font-FuturaMdBt w-full  ' placeholder={user.userName} onChange={handleUserName} />
                    </div>
                    <div className=' mx-10 w-[30vw] mt-10 h-10 border-b-2 border-black flex justify-center'>
                        <input type='email' className=' pl-5 font-FuturaMdBt w-full  ' placeholder={user.email} onChange={handleEmail} />
                    </div>
                    <div className=' mx-10 w-[30vw] mt-10 h-10 border-b-2 border-black flex justify-center'>
                        <input type='text' className=' pl-5 font-FuturaMdBt w-full  ' placeholder={user.mobileNo} onChange={handleNumber} />
                    </div>
                    <div className=' mx-10 mb-10 w-[30vw] mt-10 h-10 items-center  flex justify-center'>
                        <span className=' px-10 py-2 bg-blue-500 text-white rounded-xl cursor-pointer font-semibold hover:scale-105' onClick={() => handleUpdate()}>Save</span>
                    </div>

                </div>
                <div className=' ml-16 text-4xl absolute top-0 right-0 mt-5 mr-5 cursor-pointer justify-center items-center flex text-[#575757]'>
                    <span onClick={onClose}>&times;</span>
                </div>
            </div>

        </div>
    )
}