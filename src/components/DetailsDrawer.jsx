import React from "react";
import { Drawer, Tag } from "antd";

const DetailsDrawer = ({ visible, close, selectedCourse }) => {
  return (
    <Drawer
      title={selectedCourse ? selectedCourse.title : "Course Details"}
      onClose={close}
      open={visible}
      width={700}
    >
      {selectedCourse && (
        <div className="flex flex-col gap-4 text-lg">
          <p className="text-xl font-bold">Course Details</p>
          <div>
            {" "}
            <img
              className="w-28 h-auto"
              src={
                selectedCourse.coverImage === "no image"
                  ? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  : selectedCourse.coverImage
              }
              alt=""
            />
          </div>
          <p>Title: {selectedCourse.title}</p>
          <p>Instructor: {selectedCourse.instructor}</p>
          <p>Description {selectedCourse.description}</p>
          <p>Duration: {selectedCourse.duration}</p>
          <p>Price: {selectedCourse.price}$</p>
          <p>
            Tags:{" "}
            {selectedCourse.tags.map((tag) => {
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
          </p>
          <p>createdAt: {selectedCourse.createdAt}</p>
          <p className="text-xl font-bold">Lessons</p>
          {selectedCourse.lessons.map((lesson, index) => (
            <div className="text-lg" key={index}>
              <p>Title: {lesson.title}</p>
              <p>Description: {lesson.description}</p>
              <p>
                Video URL : <a href={lesson.videoUrl}>{lesson.videoUrl}</a>{" "}
              </p>
              {lesson.quiz.map((quiz, index2) => (
                <div className="text-lg" key={index2}>
                  <p>Question: {quiz.question}</p>
                  <p>Answer: {quiz.correctAnswer}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};

export default DetailsDrawer;
