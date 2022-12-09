import { bixios } from "services/main";

export const uploadImage = (headers , data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/media/uploadimage", data , {headers : headers});
      
      if (res.status === 200) {
        resolve(res.data);
      }
    } catch (error) {
      if (error.response.status === 422) resolve(error.response.data.detail);
      if (error.response.status === 500) resolve(error.response.data.detail);
    }
  });
};
