import CreateuserReduser from './user/userCreate/userCreateReducer'
import { configureStore } from '@reduxjs/toolkit'
import UserListReducer from './user/UserList/UserListReducer';

const store = configureStore({
    reducer:{
        createuser:CreateuserReduser,
        userList : UserListReducer
    }
})


export default store;