import React, { useEffect, useState } from "react";
import { Button, Flex, Rate, Tag } from "antd";

import { useParams } from "react-router-dom";
import axios from "../util/AxiosInstance";
import { FaRegUser } from "react-icons/fa6";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const CourseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get(`guest/course/guest-routes/${id}`);
      console.log(res.data.course);
      setData(res.data.course);
    };
    getCourse();
  }, [id]);

  const handleCheckout = async () => {
    try {
      const res = await axios.post("payment/create-checkout-session", {
        body: JSON.stringify({
          items: [{ name: data?.title, price: data?.price, quantity: 1 }],
        }),
      });
      console.log("res is", res);
      // window.location = url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="lg:px-32 lg:py-12 px-12 py-12">
      <div className="grid grid-cols-1 w-full h-[500px] md:grid-cols-2 gap-8">
        <div className="bg-white  shadow-md rounded-lg overflow-hidden">
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
              <Rate tooltips={desc} value={5} />
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
            <Button type="primary" onClick={handleCheckout} className="w-full">
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
