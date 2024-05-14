import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../util/AxiosInstance";
import { Link } from "react-router-dom";
import { Button, message, Steps, theme } from "antd";
import QuizModal from "../components/QuizModal";

export default function CourseDetailedPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [tags, setTags] = useState();
  const [steps, setSteps] = useState([]);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    const res = await axios.get(`guest/course/guest-routes/${id}`);

    console.log(res.data.course);

    setData(res.data.course);
    setTags(res.data.course.tags);
    setSteps(res.data.course.lessons);
  };

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
    color: "black",
    backgroundColor: "white",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed black`,
    marginTop: 16,
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className={`flex flex-col h-fit items-center justify-between `}>
        {data && (
          <div className="flex flex-col  absolute h-fit ">
            <div className=" w-screen h-[150vh] ">
              <img
                src={data.coverImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white absolute shadow bottom-0 w-screen rounded-t-3xl flex flex-col px-10 py-5 justify-between">
              <div className="flex flex-col justify-start">
                <span className=" text-4xl font-semibold ">{data.title}</span>
                <hr className=" bg-gray-200 w-[95vw] h-[2px] my-2 self-center" />
                <div className=" flex justify-between">
                  <div className=" flex min-h-36 w-[80%] h-fit">
                    <span className=" text-xl mt-5">{data.description}</span>
                  </div>
                  <div className=" flex flex-col items-end text-xl">
                    <span>
                      Duration :{" "}
                      <span className=" font-bold">{data.duration}</span> h{" "}
                    </span>
                    <span>
                      Assigned Instructor :{" "}
                      <span className=" font-bold">{data.instructor}</span>{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className=" flex flex-col ">
                  <div className=" mb-5"></div>
                  <div className=" flex">
                    {tags.map((item, index) => (
                      <div
                        key={index}
                        className=" px-5 py-2 bg-blue-300 mx-2 rounded-lg"
                      >
                        <span> {item} </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to={`/course/progress/${data?._id}`}>
                  <button className=" hover:bg-blue-500 border-2 border-blue-500 text-blue-500 px-10 py-2 font-bold hover:text-white rounded-3xl text-lg">
                    {" "}
                    Track Course Progress
                  </button>
                </Link>
              </div>
              <div>
                <div className="pt-10 pb-16">
                  <Steps current={current} items={items} />
                  <div
                    className="text-xl flex flex-col items-start p-10"
                    style={contentStyle}
                  >
                    <div className="text-3xl pb-10">
                      {steps[current]?.title}
                    </div>
                    <div className="pb-10 ">
                      {steps[current]?.videoUrl && (
                        <iframe
                          width="800"
                          height="450"
                          src={steps[current]?.videoUrl}
                          frameborder="0"
                          allowfullscreen
                        ></iframe>
                      )}
                    </div>
                    <div>{steps[current]?.description}</div>
                    <div className="flex w-full justify-end">
                      <Button className="" onClick={handleModalOpen}>
                        Start Quiz
                      </Button>
                    </div>
                  </div>
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
                </div>
              </div>
            </div>
            <QuizModal
              open={modalOpen}
              close={handleCloseModal}
              quiz={steps[current]?.quiz}
            />
          </div>
        )}
      </div>
    </>
  );
}
