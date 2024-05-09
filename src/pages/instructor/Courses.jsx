import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import axios from "../../util/AxiosInstance";
import DetailsDrawer from "../../components/DetailsDrawer";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";
import AddCourseModal from "../../components/instructor/AddCourseModal";

const Courses = () => {
  const [data, setData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, isLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "no",
      render: (_, __, index) => <p>{index + 1}</p>,
    },
    {
      title: "",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (img, record) => (
        <p>
          <label>
            <img
              className=""
              src={
                img === "No Image"
                  ? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  : img
              }
              alt="avatar"
              style={{
                width: "120px",
                height: "120px",
                cursor: "pointer",
              }}
              onClick={() => handleDrawer(record)}
            />
          </label>
        </p>
      ),
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
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${record.title}. This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmation.isConfirmed) {
      isLoading(true);
      try {
        await axios.delete(`http://localhost:4000/api/course/${record._id}`);
        setData(data.filter((course) => course._id !== record._id));
        isLoading(false);
        Swal.fire(
          "Course Deleted",
          `${record.title} Course has been deleted`,
          "success"
        );
      } catch (error) {
        isLoading(false);
        console.error("Error deleting course:", error);
        Swal.fire("Error", "Error deleting course", "error");
      }
    }
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
              <Button type="primary" onClick={handleModalOpen}>
                Add Courses
              </Button>
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
          {modalOpen && (
            <AddCourseModal open={modalOpen} close={handleCloseModal} />
          )}
        </div>
      )}
    </>
  );
};

export default Courses;
