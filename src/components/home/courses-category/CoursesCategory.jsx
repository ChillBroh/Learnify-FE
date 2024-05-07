import React from "react";

import { SiInteractiondesignfoundation } from "react-icons/si";
import { FaBusinessTime } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { GiHealthNormal } from "react-icons/gi";
import { FaRobot } from "react-icons/fa6";
import { MdDataThresholding } from "react-icons/md";

const categories = [
  {
    name: "Art & Design",
    icon: <SiInteractiondesignfoundation className="h-16 w-auto" />,
    courseCount: 100,
  },
  {
    name: "Business",
    icon: <FaBusinessTime className="h-16 w-auto" />,
    courseCount: 10,
  },
  {
    name: "Development",
    icon: <FaComputer className="h-16 w-auto" />,
    courseCount: 1000,
  },
  {
    name: "Finance",
    icon: <GiReceiveMoney className="h-16 w-auto" />,
    courseCount: 500,
  },
  {
    name: "Health & Fitness",
    icon: <GiHealthNormal className="h-16 w-auto" />,
    courseCount: 30,
  },
  {
    name: "Technology",
    icon: <FaRobot className="h-16 w-auto" />,
    courseCount: 10000,
  },
  {
    name: "Data Science",
    icon: <MdDataThresholding className="h-16 w-auto" />,
    courseCount: 50,
  },
  {
    name: "Business",
    icon: <FaBusinessTime className="h-16 w-auto" />,
    courseCount: 100,
  },
];

const CoursesCategory = () => {
  return (
    <div className=" pb-10 bg-[#F9F8F4]">
      <div className="text-center mt-10 ">
        <div className="text-md pt-10 lg:text-xl">TOP CLASS COURSES</div>
        <div className="text-lg pt-10 pb-10 lg:text-5xl">
          Explore 4000+ Online Courses
        </div>
      </div>
      <div class="mx-12 lg:mx-48 grid grid-cols-2 xl:grid-cols-4 gap:4 lg:gap-6">
        {categories.map((category) => (
          <div className="mb-8 rounded-[20px] bg-white p-2 shadow-md  hover:shadow-lg  flex flex-rows items-center gap-6 justify-start lg:justify-center">
            <div className="  text-black text-3xl  h-[70px] w-[70px] flex items-center justify-center  rounded-2xl">
              {category.icon}
            </div>
            <div className=" text-dark mb-3 mt-5 text-lg justify-start flex flex-col font-semibold">
              <div> {category.name}</div>

              <div className="font-light">{category.courseCount} Courses</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesCategory;
