import CreateuserReduser from './user/userCreate/userCreateReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer:{
        createuser:CreateuserReduser
    }
})


export default store;