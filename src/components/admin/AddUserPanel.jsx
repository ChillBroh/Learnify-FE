import React, { useEffect, useState } from 'react'
import axios from "../../util/AxiosInstance"
import Swal from "sweetalert2";

export default function AddUserPanel() {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [userRole, setUserRole] = useState('instructor')
    const [psw, setPsw] = useState('')
    const [rePsw, setRePsw] = useState('')

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleMobileNo = (e) => {
        setMobileNo(e.target.value)
    }

    const handleUserRole = (e) => {
        setUserRole(e.target.value)
    }

    const handlePsw = (e) => {
        setPsw(e.target.value)
    }

    const handleRePsw = (e) => {
        setRePsw(e.target.value)
    }

    const handleAddUser = async(e) => {

        e.preventDefault()

        if (psw !== rePsw) {

            Swal.fire(
                'Password Mismatch',
                'Please make sure the passwords match.',
                'error'
            );
            return; // Exit function if passwords don't match
        }

        const newUser = {
            userName : userName,
            email : email,
            mobileNo : mobileNo,
            userRole : userRole,
            password : psw,
            image : 'https://th.bing.com/th/id/OIP.MtqzdcGHvL8kNnw5IDh1iQHaHa?rs=1&pid=ImgDetMain'
        }

        const res = await axios.post('auth/register', newUser )

        clearStates()

        Swal.fire(
            ` Successfully Added ${userRole} user`,
            "",
            "success"
          )

          

    }

    const clearStates = () => {
        setUserName('')
        setEmail('')
        setMobileNo('')
        setPsw('')
        setRePsw('')
        setUserRole('instructor')
    }

    return (
        <form className=' w-full h-full rounded-xl pt-5 bg-white flex flex-col justify-between shadow' onSubmit={handleAddUser}>
            <div className='flex flex-col items-center'>
                <span className=' font-FutuBt font-bold  text-3xl text-[#575757]'>Add New User</span>
                <div className=' w-full flex justify-between px-5 my-5'>
                    <input type='text' required placeholder='User Name' className=' py-2 w-[45%] border-b-2 pl-2 border-b-[#575757] rounded' onChange={handleUserName} />
                    <input type='email' required placeholder='Email' className=' py-2 w-[45%] border-b-2 pl-2 border-b-[#575757] rounded' onChange={handleEmail} />
                </div>
                <div className=' w-full flex justify-between px-5  '>
                    <input type='number' required placeholder='Mobile no' className='  py-2 w-[45%] border-b-2 pl-2 border-b-[#575757] rounded' onChange={handleMobileNo} />
                    <div className=' border-b-2 pl-2 border-b-[#575757] bg-white rounded w-[45%] flex items-center'>
                        <label> Select role : </label>
                        <select onChange={handleUserRole} defaultValue='instructor' >
                            <option value='instructor'> Instructor</option>
                            <option value='admin'> Admin </option>
                        </select>
                    </div>

                </div>
                <div className=' w-full flex justify-between px-5 my-5'>
                    <input type='password' required placeholder='Password' className=' py-2 w-[45%] border-b-2 pl-2 border-b-[#575757] rounded' onChange={handlePsw} />
                    <input type='password' required placeholder='Confirm Password' className=' py-2 w-[45%] border-b-2 pl-2 border-b-[#575757] rounded' onChange={handleRePsw} />
                </div>
            </div>

            <div className='flex w-full justify-end pr-5  items mb-5'>
                <button type='submit' className={`px-5 py-2 border-blue-500 border-2 rounded-2xl text-[#575757] font-semibold hover:scale-105 cursor-pointer hover:text-white hover:bg-blue-500 hover:border-0 ${psw !== rePsw && 'opacity-50 pointer-events-none'}`} >Add User</button>
            </div>
        </form>
    )
}