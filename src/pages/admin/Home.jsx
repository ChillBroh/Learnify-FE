import React, { useState } from "react";
import PendingCoursesPanel from "../../components/admin/PendingCourses";
import UserDetailsPanel from "../../components/admin/UserDetailsPanel";
import AddUserPanel from "../../components/admin/AddUserPanel";
import ViewUserListModel from "../../components/admin/ViewUserListModel";

const Home = () => {

  const[openUserList, setUserListOpen] = useState(false)
  const[userRole, setUserType] = useState('')

  return (

    <div className=' bg-slate-100 w-screen h-[calc(100vh-100px)] flex flex-row justify-evenly'>
      <div className=" w-1/4 h-full bg-zinc-100">
        <UserDetailsPanel/>
      </div>
      <div className=" w-[36vw] h-full   py-5 flex flex-col justify-evenly">
        <div className=" w-full h-[60%]  ">
          <AddUserPanel/>
        </div>
        <div className=" w-full h-[40%] flex flex-col items-center justify-evenly font-FuturaMdBt font-semibold text-xl text-[#575757]">
          <div onClick={() =>{ setUserType('instructor'); setUserListOpen(true);}} className=" flex justify-center bg-white py-5 rounded-xl w-[80%] my-5 border-2 border-[#575757] hover:border-green-500 hover:bg-gray-200 ">
            <span >View Instructors</span>
          </div>
          <div onClick={() => { setUserType('admin'); setUserListOpen(true); }} className=" flex justify-center bg-white py-5 rounded-xl w-[80%] my-5 border-2 border-[#575757] hover:border-green-500 hover:bg-gray-200 ">
            <span >View Admins</span>
          </div>
        </div>
      </div>
      <div className=" flex justify-end"><PendingCoursesPanel/></div>
      <ViewUserListModel open={openUserList} onClose={() => setUserListOpen(false)} userType={userRole} />
    </div>
  )

};

export default Home;
