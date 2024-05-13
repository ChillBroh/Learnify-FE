import React from "react";
import "./HeroSection.css";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section className="hero">
        <div className="flex px-12   lg:px-48">
          <div className=" mb-48 mt-36 ">
            <p className="whitespace-nowrap text-md lg:text-xl mb-5 text-left">
              100% Quality Courses
            </p>
            <p className="whitespace-nowrap text-lg  lg:text-5xl mb-5 font-extrabold">
              Find Your Perfect Courses
            </p>
            <p className=" text-md lg:text-xl">
              We Have 40K+ Online Courses and 10K+ Instructors
            </p>

            <Link to={"/courses"}>
              <button className="bg-blue-500 rounded-xl p-6 mt-12 text-white">
                <div className="flex flex-row">
                  <div>Explore All Courses</div>
                  <div className="ml-5 mt-1">
                    <FaArrowRight />
                  </div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
