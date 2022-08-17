import { SiBreaker } from "react-icons/si";
import { createUser } from "services/user";
import {
  createUserPending,
  createUserError,
  createUserSuccess,
} from "./userCreateReducer";

export const createUserAction = (user) => async (dispatch) => {
  
  dispatch(createUserPending());
  const res = await createUser(user);
  
console.log(12, res)
  switch (res.result) {
    case "ok":
      dispatch(createUserSuccess("کاربر با موفقیت ثبت شد"));
      break;
    case "empty_field":
      dispatch(createUserError("تمامی فیلدها تکمیل شوند."));
      break;
    case "not_unique":
      dispatch(createUserError("کاربر از قبل ثبت شده است."));
      break;
  }
};
