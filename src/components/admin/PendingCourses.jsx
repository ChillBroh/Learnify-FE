import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function PendingCoursesPanel() {

  const userToken = localStorage.getItem("jsonwebtoken");
  const userDetails = JSON.parse(userToken);
  const user = userDetails ? userDetails.decodedJWT : "";

  const [pendingCourses, setPendingCourses] = useState([])

  useEffect(() => {
    getAllPendingCourses()
  }, []);

  const getAllPendingCourses = async () => {

    const config = {
      headers: {
        'Authorization': `Bearer ${userToken}`

      }
    }

    await axios.get(`http://localhost:4000/api/course//course/false`, config).then((res) => {
      setPendingCourses(res.data)
    }).catch((error) => {
      console.log(error)
    })

  }

  


  return (
    <div className=' w-full h-full bg-red-300'>
      <div className='flex flex-col'>
        <span>Approval Pending Courses</span>
        <div className='p-2'>
          {pendingCourses.map((item) => (
            <div className=' p-2 w-full h-fit flex flex-row justify-between bg-white rounded-lg'>
              <div>{item.title}</div>
              <div className=' flex'>
                <span className='p-1 bg-green-400 cursor-pointer'>approve</span>
                <span className='p-1 bg-green-400 cursor-pointer'>&times; </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}