import { bixios } from "services/main";

export const createProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.post("/products/createproduct", {
        _id: product._id,
        name: product.name,
        price: product.price,
        is_main: product.isMain,
        is_active : product.isActive,
        courses:product.courses,
        description : product.description

      });
      
      if (res.status === 200) {
        resolve(res.data);
      }
    } catch (error) {
      if (error.response.status === 422) resolve(error.response.data.detail);
      if (error.response.status === 500) resolve(error.response.data.detail);
    }
  });
};






export const productList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/products/getproductlist"
      
      
      );

      
      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
       resolve(error.response.status);
    }
  });
};
