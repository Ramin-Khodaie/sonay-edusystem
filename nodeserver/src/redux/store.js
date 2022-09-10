import CreateuserReduser from './user/userCreate/userCreateReducer'
import { configureStore } from '@reduxjs/toolkit'
import UserListReducer from './user/UserList/UserListReducer';
import CreateCourseReducer from './course/createCource/createCourseReducer'
import courseListReducer from './course/courseList/courseListReducer'

import OrderReducer from './product/orderReducer';

import productListReducer from './product/productList/ProductListReducer'
import productCreateReducer from './product/productCreate/productCreateReducer'
import UserInfoReducer from './user/UserInfo/UserInfoReducer';


const store = configureStore({
        reducer: {
                createuser: CreateuserReduser,
                userList: UserListReducer,
                createcourse: CreateCourseReducer,
                courseList: courseListReducer,

                order: OrderReducer,

                createProduct: productCreateReducer,
                productList: productListReducer,

                getUserInfo : UserInfoReducer,
                

        }
})


export default store;