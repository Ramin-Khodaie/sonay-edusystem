import { useEffect, useState } from "react";
import { bixios } from "services/main";

export const useProduct = (productId) => {
    const [product , setProduct] = useState([]);


  useEffect(() => {
    
if(productId != "-1"){
  bixios
  .get("/products/getproduct" , {
      params: {
        product_id: productId,
      },
    })
  .then((response) => {
    if (response.status === 200) {
      
      setProduct(response.data.data);
    }
  })
  .catch((e) => {});
}

  }, []);

 

  return product;
};
