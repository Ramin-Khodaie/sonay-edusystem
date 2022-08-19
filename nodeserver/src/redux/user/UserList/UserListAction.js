import { SiBreaker } from "react-icons/si";
import { userList } from "services/user";
import { userListPending, userListSuccess , userListError } from "./UserListReducer";


export const userListAction = (filters) => async (dispatch) => {

  
  dispatch(userListPending());

  
  const res = await userList(filters);
  

  if (res.status === 200) {

      dispatch(userListSuccess(res.data.data));
   
  } else {
    
    dispatch(userListError());
  } 

};
