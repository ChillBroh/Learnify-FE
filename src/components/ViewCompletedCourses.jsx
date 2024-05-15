import React, { useEffect, useState } from 'react';
import axios from '../util/AxiosInstance';

export default function ViewCompletedCourses() {
    const [completedList, setCompletedList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coursesList, setCourseList] = useState([]);

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    const getEnrolledCourses = async () => {
        try {
            const user = localStorage.getItem('jsonwebtoken');
            const userData = JSON.parse(user);
            const userID = userData.decodedJWT.userId;

            const res = await axios.get(`learner/courses/completed/${userID}`);
            
            console.log("Recived res : " + res)
           
            if (res.status === 200) {
                setCompletedList(res.data);
                await getEachCourse(res.data)

            } 
        } catch (error) {
          
            setErrorMsg(error.response.data);
            console.error('Error fetching completed courses:', error);
        }
    };

    const getEachCourse = async (completedList) => {
        try {
            const coursesArray = [];

            for (const element of completedList) {
                const courseID = element.courseId;
                const res = await axios.get(`course/guest-routes/${courseID}`);
                if (res.status === 201) {
                    coursesArray.push(res.data.course);
                }
            }
            setCourseList(coursesArray);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    return (
        <div className='flex flex-col  w-full h-[45%] bg-white p-10 rounded-xl shadow'>
            <div className=' border-b-2 border-[#575757]'>
                <span className=' text-3xl font-semibold '>Completed Courses</span>
            </div>
            {errorMsg ? (
                <div className='flex justify-center items-center w-full h-full'>
                    <span className=' font-FuturaMdBt text-lg text-[#aeaeae]'>{errorMsg}</span>
                </div>
            ) : (

                <div className=' flex flex-wrap mt-5 overflow-auto w-full h-[500px] '>

                    {coursesList.map((course, index) => (


                        <div className='flex items-center group cursor-pointer'>
                            <div className=' w-4 h-4 rounded-full m-2 border-2 border-[#575757] transition-colors duration-300 ease-in-out group-hover:bg-blue-500'></div>
                            <div key={index} className='flex flex-col px-1 w-72 h-fit py-2 bg-white rounded-lg shadow border-2 border-[#575757] '>

                                <div className=' flex items-center'>
                                    <img src={course.coverImage} className='w-5 h-5 rounded m-2' alt='Course Cover' />
                                    <span>{course.title}</span>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
