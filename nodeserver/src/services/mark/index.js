import { bixios } from "services/main";

export const createMark = (mark) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.post("/marks/createmark", {
        classActivity: mark.classActivity,
        quiz: mark.quiz,
        extra: mark.extra,
        midterm: mark.midterm,
        final: mark.final,
        sum: mark.summ,
        homework: mark.homework,
        writing: mark.writing,
        reading: mark.reading,
        listening: mark.listening,
        speaking: mark.speaking,
        activiy: mark.activiy,
        message: mark.message,
        student : mark.student,
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

// export const productList = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await bixios.get("/products/getproductlist"

//       );

//       if (res.status === 200) {
//         resolve(res);
//       }
//     } catch (error) {
//        resolve(error.response.status);
//     }
//   });
// };
