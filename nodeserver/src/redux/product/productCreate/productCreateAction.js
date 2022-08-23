import { SiBreaker } from "react-icons/si";
import { createProduct } from "services/product";
import {
  createProductPending,
  createProductError,
  createProductSuccess,
} from "./productCreateReducer";

export const createProductAction = (Product) => async (dispatch) => {
  
  dispatch(createProductPending());
  const res = await createProduct(Product);
  
  switch (res.result) {
    case "ok":
      dispatch(createProductSuccess("کاربر با موفقیت ثبت شد"));
      break;
    case "empty_field":
      dispatch(createProductError("تمامی فیلدها تکمیل شوند."));
      break;
    case "not_unique":
      dispatch(createProductError("کاربر از قبل ثبت شده است."));
      break;
  }
};
