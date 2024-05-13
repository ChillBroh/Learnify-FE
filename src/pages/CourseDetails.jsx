import React, { useEffect, useState } from "react";
import { Button, Flex, Rate, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../util/AxiosInstance";
import { FaRegUser } from "react-icons/fa6";
import { message, Steps, theme } from "antd";
import Loader from "../components/Loader";

const CourseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [steps, setSteps] = useState([]);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get(`guest/course/guest-routes/${id}`);
      console.log(res.data.course.lessons);
      setData(res.data.course);
      setSteps(res.data.course.lessons);
    };
    getCourse();
  }, [id]);

  const handleCheckout = async () => {
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
      const enrollment = await axios.get(`/course/enroll/${userId}`);
      const enrol = enrollment.data.data;
      console.log(enrol.length);
      if (enrol.length > 0) {
        const courseEnrollment = enrollment.data.data.filter((item) => {
          return item.courseId === data?._id;
        });
        console.log(course);
        if (courseEnrollment.paymentStatus === "true") {
          console.log("coursee eka");
          navigate(`/course/detailed/${data?._id}`);
        } else {
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
          window.location = res.data.url;
        }
      } else {
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
        window.location = res.data.url;
      }
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
              <div className="flex items-end">
                <Button
                  type="primary"
                  onClick={handleCheckout}
                  className="w-full"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="pt-10 pb-16">
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current]?.description}</div>
            <div
              style={{
                marginTop: 24,
              }}
            >
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
