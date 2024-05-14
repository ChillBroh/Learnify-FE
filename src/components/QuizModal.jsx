import React, { useState } from "react";
import { Modal } from "antd";
import { Input, Radio, Space } from "antd";
import Swal from "sweetalert2";
const QuizModal = ({ open, close, quiz }) => {
  const [value, setValue] = useState(1);
  const [num, setNum] = useState(0);
  const handleCancel = () => {
    close();
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    console.log(num);
    console.log(quiz.length);
    console.log(quiz);
  };
  const handleAnswer = () => {
    let ans;
    value === quiz[num].correctAnswer ? (ans = true) : (ans = false);

    if (ans) {
      Swal.fire({
        icon: "success",
        title: "Right Answer",
        text: "Congratulations! You Can Explore next Module",
      });
      close();
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong Answer",
        text: "Answer is Wrong! Try Again",
      });
    }
  };
  return (
    <>
      <Modal
        title="Complete This Quiz Your Have 3 Attempts"
        open={open}
        onCancel={handleCancel}
        okText={num === quiz.length - 1 ? "Submit" : "Next Question"}
        onOk={handleAnswer}
      >
        <div className="text-xl">
          <p>{quiz[num].question}</p>
          <div className="p-5 pl-10 ">
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical" className="text-lg">
                <Radio value={"option1"}>{quiz[num].option1}</Radio>
                <Radio value={"option2"}>{quiz[num].option2}</Radio>
                <Radio value={"option3"}>{quiz[num].option3}</Radio>
                <Radio value={"option4"}>{quiz[num].option4}</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default QuizModal;
