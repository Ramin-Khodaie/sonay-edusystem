import { bixios } from "services/main";

export const createCourse = (course) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.post("/courses/createcourse", {
        _id: course._id,
        name: course.name,
        status: course.status,
        prev_course: course.prev_course,
        image : course.image,
        price:course.price,
        description : course.description

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






export const courseList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcourselist"
      
      
      );

      
      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
       resolve(error.response.status);
    }
  });
};



export const courseByTeacher = (teacherId="0") => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcoursebyteacher" , {params:{teacher_id : teacherId}}

      );

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
       resolve(error.response.status);
    }
  });
};
