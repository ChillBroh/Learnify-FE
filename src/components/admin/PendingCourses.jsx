
import React, { useEffect, useState } from 'react'
import axios from "../../util/AxiosInstance";

export default function PendingCoursesPanel() {

  const [pendingCourses, setPendingCourses] = useState([])

  useEffect(() => {
    getAllPendingCourses()
  }, []);

  const getAllPendingCourses = async () => {

    try {
      const res = await axios.get('course//course/false')
      console.log(res.data)
      setPendingCourses(res.data)
    } catch (error) {
      console.log(error)
    }
  

  }

  const onApprove = async(id) => {

    const courseId = id
    const payload = {
      authorized : true
      }

     try {
      const res =  await axios.patch(`course//course/${courseId}`,payload)

      if(res.status === 201){
    
        setPendingCourses((prevPendingCourses) => {
          getAllPendingCourses()
          return prevPendingCourses
        })
      }else{
        console.log("GetAllPendingCourses NotRunning!")
      }
      
     } catch (error) {
      console.log(error)
     }
  } 
  
  const onCancel = async(id) => {

    const courseId = id
    const payload = {
      authorized : false
      }

     try {
      const res =  await axios.patch(`course//course/${courseId}`,payload)

      if(res.status === 201){
       
        setPendingCourses((prevPendingCourses) => {
          getAllPendingCourses()
          return prevPendingCourses
        })
      }else{
        console.log("GetAllPendingCourses NotRunning!")
      }
      
     } catch (error) {
      console.log(error)
     }
  } 


  return (
    <div className=' w-full h-full  '>
      <div className='flex flex-col items-center  px-5'>
        <span className=' text-2xl font-bold my-5'> Pending Courses</span>
        <div className='p-2 w-[calc(30vw)] h-[68vh] bg-white rounded-2xl'>
          {pendingCourses.map((item) => (
            <div className=' p-2 w-full h-fit flex flex-row justify-between items-center bg-gray-300 rounded-lg mt-5 overflow-y-auto'>
              <div className=' font-FuturaMdBd font-semibold mx-2'>{item.title}</div>
              
              <div className=' flex font-FuturaMdBt text-md text-white items-center'>
                <span className='p-1 bg-green-400 cursor-pointer rounded-xl shadow ' onClick={() => onApprove(item._id)}>approve</span>
                <span className='p-1 m-2 cursor-pointer text-black' onClick={() =>onCancel(item._id)}>&times; </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}