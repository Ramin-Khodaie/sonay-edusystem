import { createSlice } from "@reduxjs/toolkit"; 

const initialState= {
    isLoading:false,
    message:"",
    error:""
}


const ProductCreateSlice = createSlice({
    name:"ProductCreate",
    initialState:initialState,
    reducers:{
        createProductPending:(state, {payload})=>{
            state.isLoading = true
            state.error = ""
            state.message = ""
        },
        createProductSuccess:(state, {payload})=>{
            state.isLoading = false
            state.message = payload
            state.error = ""
        },  
        createProductError:(state, {payload}) =>{
            state.isLoading = false
            state.message = ""
            state.error = payload
        }
    }
})


export const {createProductPending, createProductSuccess, createProductError} = ProductCreateSlice.actions

export default ProductCreateSlice.reducer
