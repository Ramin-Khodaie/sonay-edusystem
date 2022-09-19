




  import { bixios } from "services/main";


  
  
  
  export const getRedirectUrl = (courseId , courseName, userName , totalSum , products = []) => {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.post("/purchase/getredirecturl" , {
            course_id : courseId,
            course_name : courseName,
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
  


  
  
  
  export const verifyRegistration = (oid, authority ) => {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.get("/purchase/verifyregistration" , {
            params : {oid : oid,
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
  