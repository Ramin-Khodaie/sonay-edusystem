import courseImage1 from "assets/img/courses/ielts.png";
import StudentRecord from "./StudentRecord";
import { forwardRef, useImperativeHandle } from "react";


const StudentRecords = ({ data , handleStudentSelect},ref) => {

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
      {data.map((record, idx) => (
        <StudentRecord key={idx} studentRecord={record} handleStudentSelect={handleStudentSelect}/>
      ))}
    </div>
  );
};

export default forwardRef(StudentRecords);
