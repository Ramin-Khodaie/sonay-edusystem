import CourseRecords from "components/CourseRecord/CourseRecords";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./SliderWrapper.css";
const SliderWrapper = (props) => {
  const handlescrollLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const handlescrollRight = () => {
    const slider = document.getElementById("slider");    
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  return (
    <div className="slider-container">
      <MdChevronLeft
        size={25}
        className="slider-icon left"
        onClick={handlescrollLeft}
      />
      {props.children}
      <MdChevronRight
        size={25}
        className="slider-icon right"
        onClick={handlescrollRight}
      />
    </div>
  );
};

export default SliderWrapper;
