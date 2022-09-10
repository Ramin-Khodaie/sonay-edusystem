import { SiBreaker } from "react-icons/si";
import { getUserInfo } from "services/user";
import { userInfoPending, userInfoSuccess , userInfoError } from "./UserInfoReducer";


export const userInfoAction = () => async (dispatch) => {

  
  dispatch(userInfoPending());

  
  const res = await getUserInfo();
  

  if (res.status === 200) {

      dispatch(userInfoSuccess(res.data));
   
  } else {
    
    dispatch(userInfoError());
  } 

};
