




  import { bixios } from "services/main";


  
  
  
  export const getRedirectUrl = (courseId , userName , totalSum , products = []) => {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.post("/purchase/getredirecturl" , {
            course_id : courseId,
            username : userName,
            total_sum : totalSum ,
            products : products

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
  


  
  
  
  export const verifyRegistration = (userName , courseId , products ,price, authority ) => {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.get("/purchase/verifyregistration" , {
            params : {course_id : courseId,
              username : userName,
              products : products ,
              price : price,
              authority : authority}

        }
        
        
        );
  
        
        if (res.status === 200) {

          resolve(res);
        }
      } catch (error) {
        console.log(error ,2222)
         reject(error.response.status);
      }
    });
  };
  