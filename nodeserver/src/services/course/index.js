import { bixios } from "services/main";

export const createCourse = (course) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.post("/courses/createcourse", {
        _id: course._id,
        course_name: course.course_name,
        status: course.status,
        next_course: course.next_course,
        image : course.image

      });
      
      if (res.status === 200) {
        resolve(res.data);
      }
    } catch (error) {
      if (error.response.status === 422) resolve(error.response.data.detail);
      if (error.response.status === 500) resolve(error.response.data.detail);
    }
  });
};






export const courseList = (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcourselist", {
        params:{
          full_name : filters.full_name,
          course : filters.course,
          status : filters.status
        }
      }
      
      
      );

      
      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
       resolve(error.response.status);
    }
  });
};
