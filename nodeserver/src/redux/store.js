import CreateuserReduser from './user/userCreate/userCreateReducer'
import { configureStore } from '@reduxjs/toolkit'
import UserListReducer from './user/UserList/UserListReducer';
import CreateCourseReducer from './course/createCource/createCourseReducer'
import courseListReducer from './course/courseList/courseListReducer'
import ProductReducer from './product/productReducer';

const store = configureStore({
    reducer:{
        createuser : CreateuserReduser,
        userList : UserListReducer,
        createcourse : CreateCourseReducer,
        courseList : courseListReducer,
        product:ProductReducer
    }
})


export default store;