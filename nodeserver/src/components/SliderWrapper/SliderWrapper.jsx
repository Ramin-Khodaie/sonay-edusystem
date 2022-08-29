import CourseRecords from "components/CourseRecord/CourseRecords";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./SliderWrapper.css";
const SliderWrapper = (props) => {


  const sliderRef = useRef(undefined)
  const {onLeft} = props
  const handlescrollLeft = () => {   
    sliderRef.current.gotoLeft()
  };

  const handlescrollRight = () => {    
    sliderRef.current.gotoRight()
  };

  return (
    <div className="slider-container">
      <MdChevronLeft
        size={25}
        className="slider-icon left"
        onClick={handlescrollLeft}
      />
      {React.Children.map(props.children,child=>React.cloneElement(child,{ref:sliderRef}))}
      <MdChevronRight
        size={25}
        className="slider-icon right"
        onClick={handlescrollRight}
      />
    </div>
  );
};

export default SliderWrapper;
