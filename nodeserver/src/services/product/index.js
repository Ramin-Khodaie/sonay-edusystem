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



export const deleteProduct = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.delete("/products/deleteproduct" , {
        params:{
          '_id' : _id
        }
      });

      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
      resolve(error.response.status);
    }
  });
};






export const getProductList = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.put("/products/getproductlist",
      {filter:{
        name: filter.name,
        is_main: filter.isMain,
        is_active: filter.isActive,
        course: filter.courses.id,
      }}
      
      
      );

      
      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
       resolve(error.response.status);
    }
  });
};


export const getProductListByCourse = (course_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await bixios.get("/products/getproductbycourse" , {
        params : {
          course_id : course_id
        }
      }
      
      
      );

      
      if (res.status === 200) {
        resolve(res);
      }
    } catch (error) {
       resolve(error.response.status);
    }
  });
};

