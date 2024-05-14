import React, { useEffect, useState } from 'react';
import axios from '../util/AxiosInstance';
import Loader from "./Loader";

export default function ViewEnrolledCourses() {
    const [enrolledList, setEnrolledList] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coursesList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    const getEnrolledCourses = async () => {
        try {
            const user = localStorage.getItem('jsonwebtoken');
            const userData = JSON.parse(user);
            const userID = userData.decodedJWT.userId;

            const res = await axios.get(`learner/courses/enrolled/${userID}`);

            if (res.status === 200) {
                setEnrolledList(res.data);
                await getEachCourse(res.data);
            } else {
                setErrorMsg(res.data);
            }
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
        }
    };

    const getEachCourse = async (enrolledList) => {
        try {
            const coursesArray = [];

            for (const element of enrolledList) {
                const courseID = element.courseId;
                const res = await axios.get(`course/guest-routes/${courseID}`);
                if (res.status === 201) {
                    coursesArray.push(res.data.course);
                }
            }
            setCourseList(coursesArray);
            setLoading(false)
        } catch (error) {
            setErrorMsg(error.response.data);
            console.error('Error fetching course details:', error);
        }
    };

    return (

        <div className='flex flex-col  w-full h-[45%] bg-white p-10 rounded-xl shadow'>


            <div className=' border-b-2 border-[#575757]'>
                <span className=' text-3xl font-semibold '>Enrolled Courses</span>
            </div>
            {errorMsg ? (
                <div className='flex justify-center items-center w-full h-full'>
                    <span className=' font-FuturaMdBt text-lg text-[#aeaeae]'>{errorMsg}</span>
                </div>
            ) : (

            <div className=' flex flex-wrap mt-5 overflow-auto'>
                {loading ? (
                    <div className=' w-full h-full'>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {coursesList.map((course, index) => (

                            <div className='flex items-center group cursor-pointer'>
                                <div className=' w-4 h-4 rounded-full m-2 border-2 border-[#575757] transition-colors duration-300 ease-in-out group-hover:bg-blue-500'></div>
                                <div key={index} className='flex flex-col px-1 w-72 h-fit py-2 bg-white rounded-lg shadow border-2 border-[#575757] '>

                                    <div className=' flex items-center'>
                                        <img src={course.coverImage} className='w-5 h-5 rounded m-2' alt='Course Cover' />
                                        <span>{course.title}</span>
                                    </div>
                                    <hr className='mx-2' />
                                    <div className=' flex justify-between px-2'>
                                        <span className=' text-sm '>Completion : </span>
                                        <span>{enrolledList[index].completionLevel}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            )}

        </div>
    );
}
