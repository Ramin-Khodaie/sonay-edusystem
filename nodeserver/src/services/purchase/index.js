




  import { bixios } from "services/main";


  
  
  
  export const registerForCourse = (courseId , userName , totalSum , products = []) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await bixios.post("/purchase/registerfornewcourse" , {
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
  