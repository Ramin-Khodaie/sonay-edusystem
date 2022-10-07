import { SiBreaker } from "react-icons/si";
import { getProductList } from "services/product";
import { productListPending, productListSuccess , productListError } from "./ProductListReducer";


export const productListAction = () => async (dispatch) => {

  
  dispatch(productListPending());

  
  const res = await productList();
  

  if (res.status === 200) {

      dispatch(productListSuccess(res.data.data));
   
  } else {
    
    dispatch(productListError());
  } 

};
