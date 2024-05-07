import React from "react";
import awards from "../../../assets/awards.png";

const AwardsSection = () => {
  return (
    <div className="bg-white h-auto">
      <div className="text-center mt-5 mb-5 text-md lg:text-xl">
        <p>Trusted By Over 13400 Students & Organizations</p>
        <p>Recommended Around The world</p>
      </div>
      <div className="flex pt-10 justify-center">
        <img src={awards} alt="" className="w-[50%] h-auto" />
      </div>
    </div>
  );
};

export default AwardsSection;
