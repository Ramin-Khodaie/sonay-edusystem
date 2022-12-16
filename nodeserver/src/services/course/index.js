import { bixios } from "services/main";

export const createCourse = (course) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.post("/courses/createcourse", {
        _id: course._id,
        name: course.name,
        status: course.status,
        prev_course: course.prev_course,
        image: course.image,
        price: course.price,
        description: course.description,
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


export const getCourse = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcourse" , {
        params:{
          '_id' : _id
        }
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};



export const deleteCourse = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.delete("/courses/deletecourse" , {
        params:{
          '_id' : _id
        }
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response);
    }
  });
};

export const getCourseListLimited = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcourselistlimited");

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};



export const getCourseList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcourselist");

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};


export const getCourseBySearch = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/courses/getcoursebysearch", {
        filter : {
          name:filter.fFullName,
          teacher : filter.fTeacher.id,
          status : filter.fStatus.id
        }
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      return([])
    }
  });
};


export const courseByTeacher = (teacherId = "0") => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcoursebyteacher", {
        params: { teacher_id: teacherId },
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};

export const courseHistory = (courseId = "0") => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcoursehistory", {
        params: { course_id: courseId },
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response);
    }
  });
};

export const courseDetail = (courseId = "0", username = "0", State) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/getcoursedetail", {
        params: { course_id: courseId, username: username, state: State },
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      if (error.response.status === 422) {
        resolve(error);
      }
    }
  });
};

export const registrationSuccess = (courseId = "0", username = "0") => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/courses/registrationsuccess", {
        params: { course_id: courseId, username: username },
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};
