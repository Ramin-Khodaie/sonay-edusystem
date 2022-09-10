import { createSlice } from "@reduxjs/toolkit"; 

const initialState= {
    userInfo:{},
    errorMessage : "" ,
    isPending : false
  

}


const userInfoSlice = createSlice({
    name:"userInfo",
    initialState:initialState,
    reducers:{
        userInfoPending:(state)=>{
            state.userInfo = {},
            state.isPending = true,
            state.errorMessage = "" 
           
   
        } ,

       
        userInfoSuccess:(state, {payload})=>{
            state.userInfo = payload,
            state.errorMessage = ""    
       
 
        },
        userInfoError:(state)=>{
            state.userInfo = {},
            state.errorMessage = "اشکال در فراخوانی آطلاعات کاربر" 
           
   
        }  
         
    }
})


export const {userInfoSuccess , userInfoError ,userInfoPending  } = userInfoSlice.actions
export default userInfoSlice.reducer
