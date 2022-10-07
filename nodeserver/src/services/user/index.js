import { bixios } from "services/main";






export const getUserInfo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/users/userinfo"
      //  {
      //   params:{
      //     full_name : filters.full_name,
      //     course : filters.course,
      //     status : filters.status
      //   }
      // }
      
      
      );

      
      if (res.status === 200) {
        
        resolve(res);
      }
    } catch (error) {
       console.log(error);
    }
  });
};


export const createUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.post("/users/createuser", {
        _id: user._id,
        username: user.username,
        full_name: user.full_name,
        phone: user.phone,
        email: user.email,
        password: user.password,
        courses: user.courses,
        roles: user.roles,
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






export const getUserList = (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/users/getuserlist",
       {
        filter:{
          full_name : filters.fFullName,
          course : filters.fCourse,
          status : filters.fStatus
        }
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





export const studentByCourse= (courseId , role) => {
 if(courseId !== ""){
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/users/getuserbycourse",
       {
        params:{
          course_id : courseId,
          role : role,
      
        }
      }
      
      
      );

      
      if (res.status === 200) {
        resolve(res.data.data);
      }
    } catch (error) {
       resolve(error.response.status);
    }
  });
 }else{
return([])
 }
};




export const getTeacherList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/users/getteacherlist"
      
      );

      
      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
       resolve(error.response.status);
    }
  });
};
