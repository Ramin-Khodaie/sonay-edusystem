import { bixios } from "services/main";

export const getMyRecentOrder = () => {
    return new Promise(async (resolve, reject) => {


      try {
        const res = await bixios.get("/purchase/getmyrecentorder");
        
  
        if (res.status === 200) {
          resolve(res);
        }
      } catch (error) {
        resolve(error.response.status);
      }
    });
  };
  
  
  
  
  
  
  export const getMyRecentOrderFilter = (filter) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.put("/purchase/getmyrecentorderfilter" , 
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
  
  
  
export const getMyRecentRegistration = () => {
  return new Promise(async (resolve, reject) => {


    try {
      const res = await bixios.get("/purchase/getmyrecentregistration");
      

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};






export const getMyRecentRegistrationFilter = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/purchase/getmyrecentregistrationfilter" , 
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


