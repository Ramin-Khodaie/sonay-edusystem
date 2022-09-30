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
  
  export const getTeacherAvg = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.get("/dashboard/getteacheravg");
  
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
        const res = await bixios.get("/dashboard/getrecentregistration");
  
        if (res.status === 200) {
          resolve(res);
        }
      } catch (error) {
        resolve(error.response.status);
      }
    });
  };
  
  export const getRecentMark = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.get("/dashboard/getrecentmark");
  
        if (res.status === 200) {
          resolve(res);
        }
      } catch (error) {
        resolve(error.response.status);
      }
    });
  };
  
  

  export const getTopStudent = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.get("/dashboard/gettopstudent");
  
        if (res.status === 200) {
          resolve(res);
        }
      } catch (error) {
        resolve(error.response.status);
      }
    });
  };
//////////////////////////////////////////////////////////////////////////
  

  export const getCompareStudentMark = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.get("/dashboard/getcomparestudentmark");
  
        if (res.status === 200) {
          resolve(res);
        }
      } catch (error) {
        resolve(error.response.status);
      }
    });
  };