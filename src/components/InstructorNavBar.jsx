import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import axios from "../util/AxiosInstance";
import { Input, Select } from "antd";
const { Search } = Input;

const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
  },
];

const InstructorNavBar = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("jsonwebtoken");
  const userDetails = JSON.parse(userToken);
  const user = userDetails ? userDetails.decodedJWT : "";
  const accessToken = userDetails ? userDetails.accessToken : "";
  const [nav, setNav] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/logout", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res);

      localStorage.removeItem("jsonwebtoken");
      localStorage.removeItem("role");
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "Successfully LoggedOut!!",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.response.data.message || "Something went wrong!",
      });
    }
  };

  const searchHandler = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
    }, 2000);
  };

  const handleNav = () => {
    setNav(!nav);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav className="flex flex-row w-full px-16 justify-around py-4 sticky bg-white top-0 z-[999]">
      <div className="flex items-center">
        <Link to="/instructor/home">
          <img
            src={logo}
            alt="Logo"
            className="h-10 lg:h-10 w-auto rounded-full"
          />
        </Link>
      </div>

      {/* <!-- left header section --> */}
      <div className="items-center text-xl hidden space-x-5 md:flex gap-8">
        <Link to={"/instructor/courses"} className=" hover:underline">Courses</Link>
        <Link to={"/instructor/enrollment"} className="hover:underline">Enrollment Details</Link>
      </div>
      {/* <!-- right header section --> */}
      <div className="items-center space-x-3 hidden md:flex">
        {user ? (
          <>
            <div className="text-xl">Hello {user.userName}</div>
            <button className=""></button>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  {/* {user.name} */}
                  <img
                    className="h-12 w-12 rounded-full"
                    src={user.image}
                    alt=""
                  ></img>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 h-auto origin-top-right p-1 rounded-md bg-white border-2 border-blue-500 shadow-lg ring-1 ring-[#333333] ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <h2 className="block px-4 py-2 text-sm text-[#41A4FF] hover:bg-blue-500 hover:text-white hover:rounded">
                      {user.userName}
                    </h2>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          className={classNames(
                            active
                              ? "bg-gray-100 text-[#41A4FF]"
                              : "text-[#41A4FF]",
                            "block px-4 py-2 text-sm hover:bg-blue-500 hover:text-white hover:rounded"
                          )}
                          to="/user"
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-[#41A4FF]"
                              : "text-[#41A4FF]",
                            "block w-full px-4 py-2 text-left text-sm hover:bg-red-500 hover:text-white hover:rounded"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        ) : (
          <div className="items-center space-x-3 hidden md:flex">
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-black font-bold bg-white border border-black text-center   cursor-pointer rounded-3xl"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-white font-bold bg-gray-800 text-center   cursor-pointer rounded-3xl"
              >
                Sign up
              </Link>
            </>
          </div>
        )}
      </div>

      {/* <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <AiOutlineClose size={20} style={{ color: "black" }} />
        ) : (
          <AiOutlineMenu size={20} style={{ color: "black" }} />
        )}
      </div> */}

      {/* <div
        className={
          !nav
            ? "fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray bg-white ease-in-out duration-500 md:hidden"
            : "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray bg-white ease-in-out duration-500 md:hidden"
        }
      >
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-48 h-auto" />
          </Link>
        </div>
        <ul className="p-4 mt-20">
          <li className="p-4 border-b border-gray-600">
            <Link
              to="/"
              onClick={() => {
                setNav(false);
              }}
              spy={true}
              smooth={true}
              duration={500}
            >
              Home
            </Link>
          </li>

          <li className="p-4 border-b border-gray-600">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2">
                  My Travel Details
                </Menu.Button>
              </div>
            </Menu>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2">
                  Balance
                </Menu.Button>
              </div>
            </Menu>
          </li>
          <li className="p-4 border-b border-gray-600">
            {user ? (
              <>
                <button className=""></button>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                
                      <img
                        class="h-8 w-8 rounded-full"
                        src={profile}
                        alt=""
                      ></img>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-[#333333] ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <h2 className="block px-4 py-2 text-sm text-[#9744BE]">
                          {user.name}
                        </h2>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={() => {
                                setNav(false);
                              }}
                              spy={true}
                              smooth={true}
                              duration={500}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                              to="/user"
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={handleLogout}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block w-full px-4 py-2 text-left text-sm"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <div className="items-center space-x-3 hidden md:flex">
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-white font-bold bg-[#9744BE] text-center hover:bg-[#7d5391] cursor-pointer rounded-md"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-white font-bold bg-gray-800 text-center hover:bg-gray-600 cursor-pointer rounded-md"
                  >
                    Sign up
                  </Link>
                </>
              </div>
            )}
          </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default InstructorNavBar;
