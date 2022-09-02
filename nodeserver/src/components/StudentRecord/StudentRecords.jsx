import courseImage1 from "assets/img/courses/ielts.png";
import StudentRecord from "./StudentRecord";
import { forwardRef, useImperativeHandle } from "react";


const StudentRecords = ({onSelectStudent},ref) => {
  const records = [
    {
      studentName: "IELTS",
      teacherName: "حسن محبی",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "کاظم اشتری",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "مختار ثقفی",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
    {
        studentName: "IELTS",
      teacherName: "John Doe",
      image: courseImage1,
      startDate: "2022/05/01",
      endDate: "2022/06/01",
    },
  ];

  const handleSliderLeft = () =>{
    const slider = document.getElementById("studentSlider")
    slider.scrollLeft = slider.scrollLeft + 500
  }

  const handleSliderRight = () =>{
    console.log(9000, "here")
    const slider = document.getElementById("studentSlider")
    slider.scrollLeft = slider.scrollLeft - 500
  }


useImperativeHandle(ref, ()=>({
  gotoLeft : handleSliderLeft,
  gotoRight:handleSliderRight
}))

  return (
    <div className="records-container"  id="studentSlider" >
      {records.map((record, idx) => (
        <StudentRecord key={idx} studentRecord={record} onSelect = {onSelectStudent}/>
      ))}
    </div>
  );
};

export default forwardRef(StudentRecords);
