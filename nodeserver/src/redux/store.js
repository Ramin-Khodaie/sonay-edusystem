import CreateuserReduser from './user/userCreate/userCreateReducer'
import { configureStore } from '@reduxjs/toolkit'
import UserListReducer from './user/UserList/UserListReducer';
import CreateCourseReducer from './course/createCource/createCourseReducer'
import courseListReducer from './course/courseList/courseListReducer'
import productCreateReducer from './product/productCreate/productCreateReducer'


const store = configureStore({
    reducer:{
        createuser : CreateuserReduser,
        userList : UserListReducer,
        createcourse : CreateCourseReducer,
        courseList : courseListReducer,
        createProduct : productCreateReducer,
    }
})


export default store;