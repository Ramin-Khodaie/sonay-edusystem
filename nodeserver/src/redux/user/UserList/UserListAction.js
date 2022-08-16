import { SiBreaker } from "react-icons/si";
import { userList } from "services/user";
import { userListSuccess } from "./UserListReducer";


export const userListAction = (filters) => async (dispatch) => {

  

  
  const res = await userList(filters);
  

  if (res.status === 200) {

      dispatch(userListSuccess(res.data.data));
   
  }
};
