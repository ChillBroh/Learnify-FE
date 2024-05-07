import React from "react";
import { Input, Button } from "antd";
import MenuNav from "../components/MenuNavBar";

const ContactUs = () => {
  return (
    <div>
      <MenuNav />
      <div className="bg-black h-96 flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl mb-8">Contact Us</h1>
      </div>
      <div className="flex flex-col items-center mt-8">
        <Input className="mb-4 w-64" placeholder="Name" />
        <Input className="mb-4 w-64" placeholder="Email" />
        <textarea
          className="mb-4 w-64 h-32 p-2 resize-none"
          placeholder="Message"
        />
        <Button type="primary">Submit</Button>
      </div>
    </div>
  );
};

export default ContactUs;
