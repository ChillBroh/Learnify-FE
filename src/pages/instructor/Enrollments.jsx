import React, { useEffect, useState } from "react";
import { Table, Progress, Tag } from "antd";
import axios from "../../util/AxiosInstance";
import Loader from "../../components/Loader";

const Enrollments = () => {
  const [data, setData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, isLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      isLoading(true);
      try {
        const res = await axios.get("course/enroll");
        setData(res.data.data);
        isLoading(false);
      } catch (error) {
        isLoading(false);
        console.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, [modalOpen]);

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "no",
      render: (_, __, index) => <p>{index + 1}</p>,
    },
    {
      title: "Course",
      dataIndex: "courseId",
      key: "courseId",
    },
    {
      title: "User Name",
      dataIndex: "learnerId",
      key: "learnerId",
    },
    {
      title: "Completion Level",
      dataIndex: "completionLevel",
      key: "completionLevel",
      render: (text) => <Progress percent={text} />,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) =>
        text ? (
          <Tag color="green" className="text-xl">
            Paid
          </Tag>
        ) : (
          <Tag color="red" className="text-xl">
            Not Paid
          </Tag>
        ),
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button block>Update</Button>
    //       <Button danger onClick={() => handleDelete(record)}>
    //         Delete
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:px-48 pb-5 px-12">
          <div className="text-center lg:text-3xl text-md md:text-xl  font-bold pt-5">
            Enrollment Details
          </div>
          <div className="pt-10 pb-10">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default Enrollments;
