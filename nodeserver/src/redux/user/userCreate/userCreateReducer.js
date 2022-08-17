import { createSlice } from "@reduxjs/toolkit"; 

const initialState= {
    isLoading:false,
    message:"",
    error:""
}


const userCreateSlice = createSlice({
    name:"userCreate",
    initialState:initialState,
    reducers:{
        createUserPending:(state, {payload})=>{
            state.isLoading = true
            state.error = ""
            state.message = ""
        },
        createUserSuccess:(state, {payload})=>{
            state.isLoading = false
            state.message = payload
            state.error = ""
        },  
        createUserError:(state, {payload}) =>{
            state.isLoading = false
            state.message = ""
            state.error = payload
        }
    }
})


export const {createUserPending, createUserSuccess, createUserError} = userCreateSlice.actions

export default userCreateSlice.reducer
