import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "../util/AxiosInstance";

export default function CourseDetailedPage() {

    const { id } = useParams();
    const [data, setData] = useState();
    const [tags, setTags] = useState();

    const [openQuestions, setOpenQuestions] = useState(false)

    useEffect(() => {
        getCourse()
    }, []);

    const getCourse = async () => {

        const res = await axios.get(`guest/course/guest-routes/${id}`);

        console.log(res.data.course);

        setData(res.data.course);
        setTags(res.data.course.tags)
    };

    const toggleQuestion = () => {

        if(openQuestions){
            setOpenQuestions(false)
        }else{
            setOpenQuestions(true)
        }
    }



    return (
        <>
        <div className={`flex flex-col h-fit items-center justify-between ${openQuestions ? 'hidden':'block'}`}  >

            {data && (
                <div className="flex flex-col absolute h-fit overflow-y-auto">
                    <div className=' w-screen h-[80vh] overflow-hidden'>
                        <img src={data.coverImage} className='w-full h-full object-cover'/>

                    </div>
                    <div className='bg-white absolute shadow bottom-0 w-screen rounded-t-3xl flex flex-col px-10 py-5 justify-between'>
                        <div className='flex flex-col justify-start'>
                            <span className=' text-4xl font-semibold '>{data.title}</span>
                            <hr className=' bg-gray-200 w-[95vw] h-[2px] my-2 self-center' />
                            <div className=' flex justify-between'>
                                <div className=' flex min-h-36 h-fit'>
                                    <span className=' text-xl mt-5'>{data.description}</span>
                                </div>
                                <div className=' flex flex-col items-end text-xl'>
                                    <span>Duration : <span className=' font-bold'>{data.duration}</span> h </span>
                                    <span>Assigned Instructor : <span className=' font-bold'>{data.instructor}</span> </span>
                                </div>

                            </div>


                        </div>
                        <div className='flex justify-between items-end'>
                            <div className=' flex flex-col '>
                                <div className=' mb-5'>

                                    <span className=' text-xl font-medium'> Tags</span>
                                    <hr className=' mt-2' />
                                </div>
                                <div className=' flex'>
                                    {tags.map((item) => (
                                        <div className=' px-5 py-2 bg-blue-300 mx-2 rounded-lg'>
                                            <span> {item} </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className=' hover:bg-blue-500 border-2 border-blue-500 text-blue-500 px-10 py-2 font-bold hover:text-white rounded-3xl text-lg' onClick={() => toggleQuestion()}> Start </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
        <div className={`flex flex-col h-fit items-center justify-between ${openQuestions ? 'block':'hidden'}`}>
        <button className=' hover:bg-blue-500 border-2 border-blue-500 text-blue-500 px-10 py-2 font-bold hover:text-white rounded-3xl text-lg' onClick={() => toggleQuestion()}> Go Back </button>
        </div>
        </>
    )
}