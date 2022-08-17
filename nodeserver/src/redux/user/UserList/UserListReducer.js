import { createSlice } from "@reduxjs/toolkit"; 

const initialState= {
    userList:[],
    errorMessage : "" ,
    isPending : false

}


const userListSlice = createSlice({
    name:"userList",
    initialState:initialState,
    reducers:{

        userListPending:(state)=>{
            state.userList = [],
            state.errorMessage = ""   ,
            state.isPending = true  
        },
       
        userListSuccess:(state, {payload})=>{
            state.userList = payload,
            state.errorMessage = ""    
            state.isPending = false  
 
        },
        userListError:(state)=>{
            state.userList = [],
            state.errorMessage = "اشکال در فراخوانی لیست کاربران" 
            state.isPending = false  
   
        }  
         
    }
})


export const {userListSuccess , userListError ,userListPending  } = userListSlice.actions
export default userListSlice.reducer
