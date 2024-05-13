import React from "react";

const Footer = () => {
  return (
    <div className=" w-screen bottom-0  bg-blue-800 flex flex-col items-center py-10 ">
      <div className=" flex flex-col items-center text-white font-FuturaMdBt px-5 ">
        <span className="text-2xl mb-2">LEARNIFY</span>
        <span className=" text-sm text-gray-100">
          This website was developed as part of an assignment to create an
          educational platform using Microservice Architecture.
        </span>
        <span className=" text-sm text-gray-100">
          Thus, any information displayed here should not be considered as real
          data.
        </span>
      </div>
      <hr className=" w-11/12  my-5" />
      <span className="text-gray-100 font-FuturaMdBt px-5 text-sm">
        @ 2024 LEARNIFY. All rights reserved
      </span>
    </div>
  );
};

export default Footer;
