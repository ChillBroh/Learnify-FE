import React, { useEffect, useState } from "react";
import InstructorNavBar from "../../components/InstructorNavBar";
import UserDetailsPanel from "../../components/admin/UserDetailsPanel";
import { Link } from "react-router-dom";
import axios from "../../util/AxiosInstance";



const Home = () => {

  const [courseData, setCourseData] = useState([])
  const [enrollData, setEnrollData] = useState([])

  useEffect(() => {

    getAllCourses()
    getAllEnrollments()
  }, []);

  const getAllCourses = async () => {

    try {
      const res = await axios.get("guest/course/guest-routes");
      setCourseData(res.data.data);

    } catch (error) {
      console.log(error);

    }
  };

  const getAllEnrollments = async () => {

    try {
      const res = await axios.get("guest/course/enroll");
      setEnrollData(res.data.data);

    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div className=" flex flex-row bg-slate-100 w-full h-full justify-evenly">
      <div className=' w-[33vw] ml-10 mb-10'>
        <UserDetailsPanel />
      </div>
      <div className=" p-10 w-[33vw] bg-white rounded-lg shadow h-[50vh] mt-16">
        <div>
          <span className=" font-FuturaMdBt text-2xl text-[#575757]">Overview</span>
          <hr className=" bg-blue-500 h-[2px]" />
        </div>
        <div className=" flex flex-col mt-5">
          <div className=" flex justify-between pr-5">
            <span className=" font-FuturaMdBt text-[#575757] text-lg">Number of course :</span>
            <span className=" text-blue-500"> {courseData.length}</span>
          </div>
          <div className="flex justify-between pr-5">
            <span className=" font-FuturaMdBt text-[#575757] text-lg">Number of enrollments :</span>
            <span className=" text-blue-500"> {enrollData.length} </span>
          </div>

        </div>

      </div>
      <div className=" p-10 bg-white rounded-lg shadow h-[50vh] mt-16">
        <div>
          <span className=" font-FuturaMdBt text-2xl text-[#575757]">Dashboard panels</span>
          <hr className=" bg-blue-500 h-[2px]" />
        </div>
        <div className=" flex flex-col h-full w-full items-center justify-evenly">
          <Link to={`/instructor/courses`}>
            <button className=" hover:bg-blue-500 w-full border-2 border-blue-500 text-blue-500 p-14 py-2 font-bold hover:text-white rounded-3xl text-lg">Courses DashBoard</button>
          </Link>
          <Link to={`/instructor/enrollment`}>
            <button className=" hover:bg-blue-500 border-2 border-blue-500 text-blue-500 px-10 py-2 font-bold hover:text-white rounded-3xl text-lg">Enrollment DashBoard</button>
          </Link>
        </div>


      </div>
    </div>
  );
};

export default Home;
