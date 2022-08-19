import { SiBreaker } from "react-icons/si";
import { createCourse } from "services/course";
import {
  createCoursePending,
  createCourseError,
  createCourseSuccess,
} from "./createCourseReducer";

export const createCourseAction = (course) => async (dispatch) => {
  
  dispatch(createCoursePending());

  const res = await createCourse(course);



  switch (res.result) {
    case "ok":
      dispatch(createCourseSuccess("دوره با موفقیت ثبت شد"));
      break;
    case "empty_field":
      dispatch(createCourseError("تمامی فیلدها تکمیل شوند."));
      break;
    case "not_unique":
      dispatch(createCourseError("دوره از قبل ثبت شده است."));
      break;
  }
};
