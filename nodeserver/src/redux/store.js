import CreateuserReduser from "./user/userCreate/userCreateReducer";
import UserListReducer from "./user/UserList/UserListReducer";
import CreateCourseReducer from "./course/createCource/createCourseReducer";
import courseListReducer from "./course/courseList/courseListReducer";

import OrderReducer from "./product/orderReducer";

import productListReducer from "./product/productList/ProductListReducer";
import productCreateReducer from "./product/productCreate/productCreateReducer";
import UserInfoReducer from "./user/UserInfo/UserInfoReducer";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
const persistConfig = {
  key: "root",
  storage,
  whitelist: ['getUserInfo' , 'order']
};

const rootReducer = combineReducers({
  createuser: CreateuserReduser,
  userList: UserListReducer,
  createcourse: CreateCourseReducer,
  courseList: courseListReducer,

  order: OrderReducer,

  createProduct: productCreateReducer,
  productList: productListReducer,

  getUserInfo: UserInfoReducer,
});

// const store = configureStore({
//   reducer: {
//     createuser: CreateuserReduser,
//     userList: UserListReducer,
//     createcourse: CreateCourseReducer,
//     courseList: courseListReducer,

//     order: OrderReducer,

//     createProduct: productCreateReducer,
//     productList: productListReducer,

//     getUserInfo: UserInfoReducer,
//   },
// });

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
        reducer: persistedReducer,
      });
export default  store
