import React from "react";
import MenuNav from "../components/MenuNavBar";
import HeroSection from "../components/home/hero/HeroSection";
import AwardsSection from "../components/home/awards/AwardsSection";
import CoursesCategory from "../components/home/courses-category/CoursesCategory";

const Home = () => {
  return (
    <div>
      <MenuNav />
      <HeroSection />
      <AwardsSection />
      <CoursesCategory />
  
    </div>
  );
};

export default Home;
