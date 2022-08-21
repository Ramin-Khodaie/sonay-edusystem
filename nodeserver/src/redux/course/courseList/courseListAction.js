import { SiBreaker } from "react-icons/si";
import { courseList } from "services/course";
import { courseListPending, courseListSuccess , courseListError } from "./courseListReducer";


export const courseListAction = () => async (dispatch) => {

  
  dispatch(courseListPending());

  
  const res = await courseList();
  

  if (res.status === 200) {

      dispatch(courseListSuccess(res.data.data));
   
  } else {
    
    dispatch(courseListError());
  } 

};
