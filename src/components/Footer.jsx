import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="lg:fixed bottom-0 left-0 right-0 mt-5  bg-white lg:bg-opacity-20  p-4 px-10 flex flex-rows justify-between gap-8 text-white">
      <div className="flex flex-row">
        <div className="text-black"> Copyright @2023 </div>
        <div>
          <img src={logo} alt="" className="h-6 w-auto" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
