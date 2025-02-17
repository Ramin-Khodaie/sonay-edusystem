import { bixios } from "services/main";

export const createMark = (mark) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.post("/marks/createmark", {
        _id:mark._id,
        classActivity: mark.classActivity,
        quiz: mark.quiz,
        extra: mark.extra,
        midterm: mark.midterm,
        final: mark.final,
        sum: mark.sum,
        homework: mark.homework,
        writing: mark.writing,
        reading: mark.reading,
        listening: mark.listening,
        speaking: mark.speaking,
        activity: mark.activity,
        message: mark.message,
        student : mark.student,
        course : mark.course,
        teacher : mark.teacher
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


export const markByTeacher = (teacherId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/marks/getmarkbyteacher", {
        params:{
          teacher_id : teacherId
        }
      });

      if (res.status === 200) {
        resolve(res.data.data);
      }
    } catch (error) {
      return([])
    }
  });
};




export const markBySearch = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/marks/getmarkbysearch", {
        filter
      });

      if (res.status === 200) {
        resolve(res.data.data);
      }
    } catch (error) {
      return([])
    }
  });
};


