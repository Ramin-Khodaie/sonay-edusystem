import { useEffect, useState } from "react";
import { bixios } from "services/main";

export const useCourse = (courseId) => {
    const [course , setCourse] = useState([]);


  useEffect(() => {
    
if(courseId != "-1"){
  bixios
  .get("/courses/getcourse" , {
      params: {
        course_id: courseId,
      },
    })
  .then((response) => {
    if (response.status === 200) {
      
      setCourse(response.data.data);
    }
  })
  .catch((e) => {});
}

  }, []);

 

  return course;
};
