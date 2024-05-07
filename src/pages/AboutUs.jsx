import React from "react";
import MenuNav from "../components/MenuNavBar";

const AboutUs = () => {
  return (
    <div>
      <MenuNav />
      <div className="bg-black h-96 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl mb-8">About Us</h1>
      </div>
      <div className="bg-white  py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-black  text-lg mb-4">
            Welcome to our website! We are a team of passionate individuals
            dedicated to providing high-quality products and services.
          </p>
          <p className="text-black text-lg mb-4">
            Our mission is to make a positive impact on the world through
            innovative solutions and exceptional customer experiences.
          </p>
          <p className="text-black text-lg">
            Feel free to explore our website and learn more about what we do.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
