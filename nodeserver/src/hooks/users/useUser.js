import { useEffect, useState } from "react";
import { bixious } from "services/main";

export const useUser = (userId) => {
    const [user, setUser] = useState([]);


  useEffect(() => {
    
if(userId != "-1"){
  bixious
  .get("/users/getuser" , {
      params: {
        user_id: userId,
      },
    })
  .then((response) => {
    if (response.status === 200) {
      
      setUser(response.data.data);
      console.log(response.data.data)
    }
  })
  .catch((e) => {});
}

  }, []);

 

  return user;
};
