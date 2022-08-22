import { createSlice } from "@reduxjs/toolkit";
import { AddToCart } from "utils/productUtils";

const initialState = {
    showCartItem:false,
    cartItems:[]
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        AddCartItems:(state, {payload})=>{
            state.cartItems = AddToCart(state.cartItems, payload)
        },
        ToggleCartItem:(state)=>{
            state.showCartItem = !state.showCartItem
        }
    }
})

export const {AddCartItems, ToggleCartItem} = productSlice.actions

export default productSlice.reducer