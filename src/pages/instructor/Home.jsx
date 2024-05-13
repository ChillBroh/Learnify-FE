import React from "react";
import InstructorNavBar from "../../components/InstructorNavBar";
import UserDetailsPanel from "../../components/admin/UserDetailsPanel";

const Home = () => {
  return (
    <div className=" flex flex-row bg-slate-100 w-full h-full">
      <div className=' w-[33vw] ml-10 mb-10'>
        <UserDetailsPanel/>
      </div>
    </div>
  );
};

export default Home;
