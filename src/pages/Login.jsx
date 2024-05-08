import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import login from "../assets/login.jpg";
import axios from "axios";
import Loader from "../components/Loader";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/server/login",
        {
          userName: values.userName,
          password: values.password,
        }
      );
      const decoded = jwtDecode(res.data.accessToken);
      const payload = {
        decodedJWT: decoded,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      };
      setLoading(false);
      localStorage.setItem("jsonwebtoken", JSON.stringify(payload));
      navigate("/");
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.body || "Something went wrong!",
      });
      console.log(err);
    }
  };

  const inputStyle =
    "p-3 w-96 rounded-3xl border border-purple focus:outline-none focus:border-blue-500";

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="border px-12 mx-12 mt-36 py-12  bg-opacity-20 bg-black border-black rounded-lg">
          <div className="px-12 pt-10 lg:px-24">
            <div className="pb-12 text-center ">
              <span className="text-[46px] text-[#411EE2] font-extrabold ">
                SIGN IN
              </span>

              <Form name="basic" onFinish={onFinish} autoComplete="off">
                <div className="mt-4">
                  <Form.Item
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="userName"
                      className={inputStyle}
                    />
                  </Form.Item>
                </div>

                <div className="mt-2">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                      className={inputStyle}
                    />
                  </Form.Item>
                </div>
                <div className="mt-2">
                  <Form.Item>
                    <button
                      type="submit"
                      className="bg-[#411EE2] text-white font-bold px-6 py-3 rounded-md hover:bg-[#333333]"
                    >
                      Login
                    </button>
                  </Form.Item>
                </div>
                <div>
                  <Link to="/register" className="text-white hover:underline">
                    Not a member ? Register
                  </Link>
                </div>
              </Form>

              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
