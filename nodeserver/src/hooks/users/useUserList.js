import { useEffect, useState } from "react";
import { bixious } from "services/main";

export const useUserList = (status , filters = {} , filter) => {
    const [userList, setUserList] = useState([]);


  useEffect(() => {
    
    bixious
    .get("/users/getuserlist",{
      params:{
        full_name : filters.full_name,
        course : filters.course,
        status : filters.status
      }
    })
    .then((response) => {
      if (response.status === 200) {
        setUserList(response.data.data);
      }
    })
    .catch((e) => {});

  }, [status , filter]);

  return userList;
};
