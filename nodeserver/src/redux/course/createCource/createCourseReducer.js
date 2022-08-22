import { createSlice } from "@reduxjs/toolkit"; 

const initialState= {
    isLoading:false,
    message:"",
    error:""
}


const courseCreateSlice = createSlice({
    name:"courseCreate",
    initialState:initialState,
    reducers:{
        createCoursePending:(state, {payload})=>{
            state.isLoading = true
            state.error = ""
            state.message = ""
        },
        createCourseSuccess:(state, {payload})=>{
            state.isLoading = false
            state.message = payload
            state.error = ""
        },  
        createCourseError:(state, {payload}) =>{
            state.isLoading = false
            state.message = ""
            state.error = payload
        },
        createCourseCleanUp:(state) =>{
            state.isLoading = false
            state.message = ""
            state.error = ""
        }
        
    }
})


export const {createCoursePending, createCourseSuccess, createCourseError , createCourseCleanUp} = courseCreateSlice.actions

export default courseCreateSlice.reducer
