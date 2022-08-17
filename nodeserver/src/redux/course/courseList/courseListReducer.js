import { createSlice } from "@reduxjs/toolkit";
const initialState= {
    courseList : [],
    errorMessage : "",
    isPending : false
}



const courseListSlice = createSlice({
    name : "courseList",
    initialState : initialState,
    reducers:{
        courseListPending:(state)=>{
            state.isPending = true,
            state.errorMessage = "",
            state.courseList = []
        },
        courseListSuccess:(state , {payload})=>{
            state.isPending = false,
            state.errorMessage = "",
            state.courseList = payload
        },
        courseListError:(state)=>{
            state.isPending = false,
            state.errorMessage = "اشکال در فراخوانی لیست کاربران" 
            state.courseList = []
        },
    }
})


export const {courseListError,courseListPending,courseListSuccess} = courseListSlice.actions
export default courseListSlice.reducer