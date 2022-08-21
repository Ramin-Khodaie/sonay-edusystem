import { useEffect, useState } from "react";
import { bixios } from "services/main";

export const useUser = (userId) => {
    const [user, setUser] = useState([]);


  useEffect(() => {
    
if(userId != "-1"){
  bixios
  .get("/users/getuser" , {
      params: {
        user_id: userId,
      },
    })
  .then((response) => {
    if (response.status === 200) {
      
      setUser(response.data.data);
    }
  })
  .catch((e) => {});
}

  }, []);

 

  return user;
};
