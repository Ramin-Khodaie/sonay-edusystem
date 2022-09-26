import { createSlice } from "@reduxjs/toolkit"; 

const initialState= {
    userInfo:{},
    errorMessage : "" ,

  

}


const userInfoSlice = createSlice({
    name:"userInfo",
    initialState:initialState,
    reducers:{

       
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


export const {userInfoSuccess , userInfoError   } = userInfoSlice.actions
export default userInfoSlice.reducer
