import courseImage1 from "assets/img/courses/ielts.png";
import CourseRegisterRecord from "./CourseRegisterRecord";
import { forwardRef, useImperativeHandle } from "react";
import {  useColorMode } from "@chakra-ui/react";

const CourseRegisterRecords = ({data , handleSelectCourseHistory}, ref) => {
  const records = [

    {
      name: "IELTS",
      id: "cc",
      state : "attended"
    },
    {
      name: "IELTS",
      id: "cc",
      state : "attended"
    },
    {
      name: "IELTS",
      id: "cc",
      state : "current"
    },
    {
      name: "IELTS",
      id: "cc",
      state : "upcoming"
    },
    {
      name: "IELTS",
      id: "cc",
      state : "upcoming"
    },
    {
      name: "IELTS",
      id: "cc",
      state : "upcoming"
    },
    {
      name: "IELTS",
      id: "cc",
      state : "upcoming"
    },

    
  ];


  const handleSliderLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const handleSliderRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  useImperativeHandle(ref, () => ({
    gotoLeft: handleSliderLeft,
    gotoRight: handleSliderRight,
  }));
  const colorMode = useColorMode()
  const lightStyle = {
 
    "border-radius": "2rem",
    'background-color' : 'white' , 

    
    
  }

  const darkStyle = {
 
    "border-radius": "2rem",
    'background-color' : '#1b254b'
    
  }



  return (
    <div
      className="records-container"
      id="slider"
      dir="ltr"
      
      style={colorMode.colorMode === 'light' ? lightStyle : darkStyle }
 
    >
      {data.map((record, idx) => (
        <>
              <CourseRegisterRecord key={idx} data={record} handleSelectCourseHistory={handleSelectCourseHistory} />

        </>
  
      ))}
    </div>
  );
};

export default forwardRef(CourseRegisterRecords);
