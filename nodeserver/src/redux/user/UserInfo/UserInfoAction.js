import { SiBreaker } from "react-icons/si";
import { getUserInfo } from "services/user";
import {  userInfoSuccess , userInfoError } from "./UserInfoReducer";


export const userInfoAction = () => async (dispatch) => {

  
  const res = await getUserInfo();
  

  if (res.status === 200) {

      dispatch(userInfoSuccess(res.data));
   
  } else {
    
    dispatch(userInfoError());
  } 

};
