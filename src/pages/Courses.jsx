import React, { useEffect, useState } from "react";
import MenuNav from "../components/MenuNavBar";
import axios from "../util/AxiosInstance";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { Button, Tag } from "antd";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllCourses = async () => {
      setLoading(true);
      try {
        const res = await axios.get("guest/course/guest-routes");
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllCourses();
  }, []);

  return (
    <div>
      <MenuNav />
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:px-28 pb-24 px-12">
          <div className="text-center text-3xl font-bold text-blue-500 pt-10">
            Let's Explore the Courses on Learnify
          </div>
          <div className="grid pt-10 lg:grid-cols-4 md:grid-cols-3 gap-3 grid-cols-1">
            {data.map((item) => (
              <div
                key={item._id}
                className="group relative flex flex-col justify-between  shadow-2xl rounded-b-xl border-2 "
              >
                <div>
                  <div className="min-h-80 aspect-h-1  aspect-w-1 w-full py-3 px-2 overflow-hidden   lg:aspect-none group-hover:opacity-40 lg:h-80">
                    <img
                      src={item.coverImage}
                      alt="cover"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="flex justify-between p-3">
                    <h3 className="text-2xl  text-[#295cb1] ">
                      <Link to={`/course/${item._id}`}>
                        <span
                          aria-hidden="true"
                          className="absolute  inset-0 rounded-t-3xl "
                        />
                        {item.title}
                      </Link>
                      <p className="mt-2 text-sm font-normal text-[#575757]">
                        This is Dummy Descripion . You Can See the Full course
                        details by clicking on title
                      </p>
                    </h3>
                  </div>

                </div>
                <div>
                  <div className="px-2 pb-3">
                    {item.tags.map((tag) => {
                      let color = tag.length > 5 ? "geekblue" : "green";
                      if (tag === "loser") {
                        color = "volcano";
                      }
                      return (
                        <Tag color={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      );
                    })}
                  </div>
                  <div className="flex flex-row mr-2 space-x-3 justify-between">
                    <p className="text-lg text-[#575757] text-left p-2 ">
                      Price : <span className=" text-blue-700 font-semibold"> {item.price}</span>$
                    </p>

                    <Link to={`/course/${item._id}`}>
                      <Button type="primary">Enroll</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
