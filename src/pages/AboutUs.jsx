import React from "react";
import MenuNav from "../components/MenuNavBar";

const AboutUs = () => {
  return (
    <div className="  h-[85vh]">
      <MenuNav />
      <div className="bg-blue-500 h-fit py-16 flex flex-col justify-center  items-center">
        <h1 className="text-white text-4xl">About Us</h1>
      </div>
      <div className="bg-white  py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-black  text-lg mb-4 text-center">
            Welcome to our website! We are a team of passionate individuals
            dedicated to providing high-quality products and services.
          </p>
          <p className="text-black text-lg mb-4 text-center">
            Our mission is to make a positive impact on the world through
            innovative solutions and exceptional customer experiences.
          </p>
          <p className="text-black text-lg text-center">
            Feel free to explore our website and learn more about what we do.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
