import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import axios from "../../util/AxiosInstance";
import DetailsDrawer from "../../components/DetailsDrawer";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";

const Courses = () => {
  const [data, setData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      isLoading(true);
      try {
        const res = await axios.get("course/course/user");
        setData(res.data.data);
        isLoading(false);
      } catch (error) {
        isLoading(false);
        console.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, []);

  const handleDrawer = (record) => {
    setSelectedCourse(record);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "no",
      render: (_, __, index) => <p>{index + 1}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <p
          className="hover:cursor-pointer"
          onClick={() => handleDrawer(record)}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <p>{text}$</p>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
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
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button block>Update</Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (record) => {
    isLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/course/${record._id}`);
      setData(data.filter((course) => course._id !== record._id));
      Swal.fire(
        "Course Deleted",
        `${record.title} Course has been deleted`,
        "success"
      );
    } catch (error) {
      console.error("Error deleting course:", error);
      Swal.fire("Error", "Error deleting course", "error");
    }
    isLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="lg:px-48 pb-5 px-12">
          <div className="text-center lg:text-3xl text-md md:text-xl  font-bold pt-5">
            Your Course Details
          </div>
          <div>
            <div className="flex justify-center lg:justify-end">
              <Button type="primary">Add Courses</Button>
            </div>
          </div>
          <div className="pt-10 pb-10">
            <Table columns={columns} dataSource={data} />
          </div>
          <DetailsDrawer
            visible={drawerVisible}
            close={handleCloseDrawer}
            selectedCourse={selectedCourse}
          />
        </div>
      )}
    </>
  );
};

export default Courses;
