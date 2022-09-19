import { bixios } from "services/main";


export const getRecentOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/purchase/getrecentorder");

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};



export const getRecentOrderFilter = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/purchase/getrecentorderfilter" , 
      {
        filter
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




export const getRecentRegistration = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/purchase/getrecentregistration");

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};






export const getRecentRegistrationFilter = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/purchase/getrecentregistrationfilter" , 
      {
        filter
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




export const getCourseDetailReport = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/purchase/getcoursedetail");

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};



export const getCourseDetailFilter = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/purchase/getcoursedetailfilter" , 
      {
        filter
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
