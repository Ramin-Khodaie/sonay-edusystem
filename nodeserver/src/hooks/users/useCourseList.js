import { useEffect, useState } from "react";
import { bixios } from "services/main";

export const useCourseList = (status , filters = {} , filter) => {
    const [courseList, setourseList] = useState([]);


  useEffect(() => {
    
    bixios
    .get("/courses/getcourselist",{
      params:{
        full_name : filters.full_name,
        status : filters.status
      }
    })
    .then((response) => {
      if (response.status === 200) {
        setourseList(response.data.data);
      }
    })
    .catch((e) => {});

  }, [status , filter]);

  return courseList;
};
