import { useEffect, useState } from "react";
import { bixious } from "services/main";

export const useUserList = (status , filters = {}) => {
    const [userList, setUserList] = useState([]);


  useEffect(() => {
    
    bixious
    .get("/users/getuserlist")
    .then((response) => {
      if (response.status === 200) {
        setUserList(response.data.data);
      }
    })
    .catch((e) => {});

  }, [status]);

  return userList;
};
