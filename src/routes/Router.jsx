import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Blog from "../pages/Blog";
import Courses from "../pages/Courses";
import Modules from "../pages/Modules";
import InstructorHome from "../pages/instructor/Home";
import AdminHome from "../pages/admin/Home";
import Swal from "sweetalert2";
import InstructorCourses from "../pages/instructor/Courses";
import InstructorEnrollment from "../pages/instructor/Enrollments";

const Router = () => {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("jsonwebtoken") ? true : false;

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("jsonwebtoken");
    const isAuthenticated = token ? true : false;
    const payload = JSON.parse(token);
    console.log(payload);
    const isAdmin = payload.decodedJWT.userRole === "admin";

    if (!isAuthenticated || !isAdmin) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Logout Login to your Admin Account",
      });
      return <Navigate to="/login" />;
    }
    return children;
  };
  const InstructorRoute = ({ children }) => {
    const token = localStorage.getItem("jsonwebtoken");
    const isAuthenticated = token ? true : false;
    const payload = JSON.parse(token);
    console.log(payload);
    const isAdmin = payload.decodedJWT.userRole === "instructor";

    if (!isAuthenticated || !isAdmin) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Logout Login to your Instructor Account",
      });
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/modules" element={<Modules />} />

      <Route
        path="/instructor/home"
        element={
          <ProtectedRoute>
            <InstructorRoute>
              <InstructorHome />
            </InstructorRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/courses"
        element={
          <ProtectedRoute>
            <InstructorRoute>
              <InstructorCourses />
            </InstructorRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/enrollment"
        element={
          <ProtectedRoute>
            <InstructorRoute>
              <InstructorEnrollment />
            </InstructorRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/home"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
