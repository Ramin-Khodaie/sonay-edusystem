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
        confirm_password : user.confirmPassword,
        courses: user.courses,
        role: user.role,
        is_enable : user.is_enable
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



export const deleteUser= (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.delete("/users/deleteuser" , {
        params:{
          'username' : username
        }
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};


export const enableUser= (username,isEnable) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.delete("/users/enableuser" , {
        params:{
          'username' : username,
          "is_enable" : isEnable
        }
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};


export const getUserByRole = (role) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/users/getuserbyrole",
       {
        params:{
          role : role,
         
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

export const getUserList = (filters) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/users/getuserlist",
       {
        filter:{
          full_name : filters.fFullName,
          course : filters.fCourse,
          status : filters.fStatus,
          is_enable : filters.isEnable
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
