import React from "react";
import PendingCoursesPanel from "../../components/admin/PendingCourses";
import UserDetailsPanel from "../../components/admin/UserDetailsPanel";

const Home = () => {


  return (

    <div className=' bg-slate-100 w-screen h-[calc(100vh-154px)] flex flex-row justify-evenly'>
      <div className=" w-1/4 h-full bg-zinc-100">
        <UserDetailsPanel/>
      </div>
      <div className=" w-1/3 h-full bg-slate-600 px-10 py-5 flex flex-col justify-evenly">
        <div className=" w-full h-[45%] bg-green-500 "></div>
        <div className=" w-full h-[45%] bg-green-200 ">

        </div>
      </div>
      <div className=""><PendingCoursesPanel/></div>
    </div>
  )

};

export default Home;
