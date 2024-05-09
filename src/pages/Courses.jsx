import React, { useEffect, useState } from "react";
import MenuNav from "../components/MenuNavBar";
import axios from "../util/AxiosInstance";
import Loader from "../components/Loader";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:4000/api/guest/course/guest-routes"
        );
        setData(res.data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      getAllCourses();
    };
  }, []);
  return (
    <div>
      <MenuNav />
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:px-48 px-12">
          <div className="text-center text-3xl font-bold text-[#411EE2] pt-10">
            All Courses In Our WebSite
          </div>
          <div className="grid pt-10 lg:grid-cols-4 md:grid-cols-3 gap-3 grid-cols-2">
            <div className="w-[100%] h-96 bg-red-800">1</div>
            <div className="w-[100%] h-96 bg-blue-500">2</div>
            <div className="w-[100%] h-96 bg-red-800">3</div>
            <div className="w-[100%] h-96 bg-red-800">4</div>
            <div className="w-[100%] h-96 bg-red-800">5</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
