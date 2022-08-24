import { createSlice } from "@reduxjs/toolkit";
const initialState= {
    productList : [],
    errorMessage : "",
    isPending : false
}



const productListSlice = createSlice({
    name : "productList",
    initialState : initialState,
    reducers:{
        productListPending:(state)=>{
            state.isPending = true,
            state.errorMessage = "",
            state.productList = []
        },
        productListSuccess:(state , {payload})=>{
            state.isPending = false,
            state.errorMessage = "",
            state.productList = payload
        },
        productListError:(state)=>{
            state.isPending = false,
            state.errorMessage = "اشکال در فراخوانی لیست کاربران" 
            state.productList = []
        },
    }
})


export const {productListError,productListPending,productListSuccess} = productListSlice.actions
export default productListSlice.reducer