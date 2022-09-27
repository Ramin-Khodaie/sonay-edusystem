import { bixios } from "services/main";


export const getCounts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/dashboard/getcounts");

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};

export const getYearCompare = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.get("/dashboard/getyearcomparedata");
  
        if (res.status === 200) {
          resolve(res);
        }
      } catch (error) {
        resolve(error.response.status);
      }
    });
  };
  
  