import { SiBreaker } from "react-icons/si";
import { getUserList } from "services/user";
import { userListPending, userListSuccess , userListError } from "./UserListReducer";


export const userListAction = () => async (dispatch) => {

  
  dispatch(userListPending());

  
  const res = await userList();
  

  if (res.status === 200) {

      dispatch(userListSuccess(res.data.data));
   
  } else {
    
    dispatch(userListError());
  } 

};
