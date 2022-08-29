import courseImage1 from "assets/img/courses/ielts.png";
import CourseRecord from "./CourseRecord";

import "./CourseRecords.css";

const CourseRecords = (props) => {
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

  return (
    <div className="records-container" id="slider">
      {records.map((record, idx) => (
        <CourseRecord key={idx} courserecord={record} />
      ))}
    </div>
  );
};

export default CourseRecords;
