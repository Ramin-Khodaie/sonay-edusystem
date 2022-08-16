import { createSlice } from "@reduxjs/toolkit"; 

const initialState= {
    userList:[]

}


const userListSlice = createSlice({
    name:"userList",
    initialState:initialState,
    reducers:{
       
        userListSuccess:(state, {payload})=>{

            console.log(555,payload)
            state.userList = payload     
        },  
         
    }
})


export const {userListSuccess  } = userListSlice.actions
export default userListSlice.reducer
