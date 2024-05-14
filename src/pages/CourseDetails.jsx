import React, { useEffect, useState } from "react";
import { Button, Flex, Rate, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../util/AxiosInstance";
import { FaRegUser } from "react-icons/fa6";
import { message, Steps, theme } from "antd";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
const CourseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(true);

  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get(`guest/course/guest-routes/${id}`);
      setData(res.data.course);
      getEnrolledCourses(res.data.course);
    };
    const getEnrolledCourses = async (courseData) => {
      const token = localStorage.getItem("jsonwebtoken");
      const userDetails = JSON.parse(token);
      const userId = userDetails?.decodedJWT.userId;
      console.log("user is", userId);
      if (userId) {
        const res = await axios.get(`course/enroll/${userId}`);
        console.log("res is", res.data.data);
        const courses = res.data.data;
        if (courses.length > 0) {
          console.log("data is", courseData);
          const isEnrolled = courses.filter((course) => {
            return course.courseId === courseData?._id;
          });
          console.log("is enrolled", isEnrolled);
          if (isEnrolled.length > 0) {
            setEnrolled(true);
          } else {
            setEnrolled(false);
          }
        } else {
          setEnrolled(false);
        }
      } else {
        setEnrolled(false);
      }
    };
    getCourse();
  }, [id]);

  const handleCheckout = async () => {
    // get token
    const token = localStorage.getItem("jsonwebtoken");
    const isToken = token ? true : false;

    if (!isToken) {
      navigate("/login");
    }
    const userDetails = JSON.parse(token);
    const userId = userDetails?.decodedJWT.userId;
    console.log(userId);
    setLoading(true);

    try {
      // send request for payment service
      const res = await axios.post("payment/create-checkout-session", {
        name: data?.title,
        price: data?.price,
        quantity: 1,
        id: data?._id,
        image: data?.coverImage,
        userId: userId,
      });
      console.log("res is", res);
      setLoading(false);
      // redirect to relevant url
      window.location = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {loading ? (
        <div>
          <Loader />
          <div className="min-h-screen lg:px-32 lg:py-12 px-12 py-12">1</div>
        </div>
      ) : (
        <div className="min-h-screen lg:px-32 lg:py-12 px-12 py-12">
          <div className="grid grid-cols-1 w-full h-[500px] md:grid-cols-2 gap-8">
            <div className="bg-white  shadow-md rounded-lg ">
              <img
                src={data?.coverImage}
                alt="course-logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white shadow-md  rounded-lg px-6 py-8">
              <div className="text-3xl font-semibold mb-4">{data?.title}</div>
              <div className="text-xl mb-4">{data?.description}</div>
              <div className="text-lg flex flex-row mb-4 gap-3">
                <Flex gap="middle" vertical>
                  <Rate value={5} />
                </Flex>
                <div className="text-xl">
                  <FaRegUser />{" "}
                </div>
                <div>4500 Already Enrolled</div>
              </div>
              <div className="text-xl font-bold">Course Details</div>
              <div className="text-lg pb-4 pl-5">
                <ul>
                  <li className="pt-4 pb-2">
                    <span className="font-semibold pt-4 pb-4">Duration:</span>{" "}
                    {data?.duration} hours
                  </li>
                  <li className="pt-2 pb-2">
                    <span className="font-semibold pt-4 pb-4">Price: </span>
                    {data?.price}
                  </li>
                  <li className="pt-2 pb-2">
                    <span className="font-semibold pt-4 pb-4">Level: </span>
                    {"Intermediate"}
                  </li>
                  <li className="pt-2 pb-2">
                    <span className="font-semibold">Language: </span>
                    {"English"}
                  </li>
                  <li className="pt-2 pb-2">
                    <span className="font-semibold ">Categoris:</span>{" "}
                    {data?.tags.map((tag) => {
                      let color = tag.length > 5 ? "geekblue" : "green";
                      if (tag === "loser") {
                        color = "volcano";
                      }
                      return (
                        <Tag color={color} key={tag} className="text-lg">
                          {tag.toUpperCase()}
                        </Tag>
                      );
                    })}
                  </li>
                </ul>
              </div>
              {enrolled ? (
                <div className="">
                  <Link to={`/course/detailed/${data?._id}`}>
                    <Button type="primary" className="w-full bg-red">
                      View Course
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-end">
                  <Button
                    type="primary"
                    onClick={handleCheckout}
                    className="w-full"
                  >
                    Enroll Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
