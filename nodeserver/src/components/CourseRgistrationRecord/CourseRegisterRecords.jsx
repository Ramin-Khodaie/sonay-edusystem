import courseImage1 from "assets/img/courses/ielts.png";
import CourseRegisterRecord from "./CourseRegisterRecord";
import { forwardRef, useImperativeHandle } from "react";

const CourseRegisterRecords = ({}, ref) => {
  const records = [
    {
      courseName: "IELTS",
      teacherName: "حسن محبی",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "کاظم اشتری",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "مختار ثقفی",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
  ];

  const handleSliderLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const handleSliderRight = () => {
    console.log(9000, "here");
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  useImperativeHandle(ref, () => ({
    gotoLeft: handleSliderLeft,
    gotoRight: handleSliderRight,
  }));

  return (
    <div
      className="records-container"
      id="slider"
      style={{
        "background-color": "#EDF2F7",
        "border-radius": "2rem",
        
      }}
    >
      {records.map((record, idx) => (
        <CourseRegisterRecord key={idx} />
      ))}
    </div>
  );
};

export default forwardRef(CourseRegisterRecords);
