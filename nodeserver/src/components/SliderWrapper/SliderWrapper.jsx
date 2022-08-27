import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./SliderWrapper.css";
const SliderWrapper = (props) => {
  return (
    <div className="slider-container">
      <MdChevronLeft
        size={25}
        className="slider-icon left"
        onClick={props.scroolLeft}
      />
      {props.children}
      <MdChevronRight
        size={25}
        className="slider-icon right"
        onClick={props.scroolRight}
      />
    </div>
  );
};

export default SliderWrapper;
