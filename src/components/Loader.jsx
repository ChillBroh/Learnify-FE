import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loader = () => {
  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  return (
    <div className="text-center mb-[500px]" style={overlayStyles}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 36,
            }}
          />
        }
      />
    </div>
  );
};

export default Loader;
