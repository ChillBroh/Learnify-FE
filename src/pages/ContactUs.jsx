import React from "react";
import { Input, Button } from "antd";
import MenuNav from "../components/MenuNavBar";

const ContactUs = () => {
  return (
    <div className=" bg-slate-100 h-[85vh]">
      <MenuNav />
      <div className="bg-blue-500 h-fit py-16 flex flex-col justify-center  items-center">
        <h1 className="text-white text-4xl">Contact Us</h1>
      </div>
      <div className="flex   flex-col items-center mt-8">
        <Input className="mb-4 w-64" placeholder="Name" />
        <Input className="mb-4 w-64" placeholder="Email" />
        <textarea
          className="mb-4 w-64 h-32 border-2 p-2 resize-none"
          placeholder="Message"
        />
        <Button type="primary">Submit</Button>
      </div>
    </div>
  );
};

export default ContactUs;
