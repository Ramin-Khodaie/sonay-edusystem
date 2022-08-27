import { Flex, SimpleGrid } from "@chakra-ui/react";
import courseImage1 from "assets/img/courses/ielts.png";
import CourseRecord from "./CourseRecord";
import { useRef } from "react";

import "./CourseRecords.css";

const CourseRecords = ({scrollLeft, scrollRight}) => {
  const records = [
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: { courseImage1 },
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: { courseImage1 },
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: { courseImage1 },
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: { courseImage1 },
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: { courseImage1 },
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: { courseImage1 },
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
      courseName: "IELTS",
      teacherName: "John Doe",
      image: { courseImage1 },
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
  ];

const handlescrollLeft = () =>{
    const slider = document.getElementById('slider')
    slider.scroll = slider.scroll + 500
}  

const handlescrollRight = () =>{
    const slider = document.getElementById('slider')
    slider.scroll = slider.scroll + 500
}  

const recordRef = useRef()
  return (
    <div className="records-container" id="slider" ref={recordRef}>
      {records.map((record, idx) => (
        <CourseRecord key={idx} />
      ))}
    </div>
  );
};

export default CourseRecords;
