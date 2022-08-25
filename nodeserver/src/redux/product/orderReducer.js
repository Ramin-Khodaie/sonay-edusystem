import { createSlice } from "@reduxjs/toolkit";
import { RemoveOneItem } from "utils/orderUtils";
import { DeleteCartitem } from "utils/orderUtils";
import { AddToCart } from "utils/orderUtils";

const initialState = {
    cartItems: []
}

const orderReducer = createSlice({
    name: "product",
    initialState,
    reducers: {
        AddCartItems: (state, { payload }) => {
            state.cartItems = AddToCart(state.cartItems, payload)
        },
        ToggleCartItem: (state) => {
            state.showCartItem = !state.showCartItem
        },
        DeleteCartItem:(state, {payload})=>{            
            state.cartItems = DeleteCartitem(state.cartItems, payload)
        },
        RemoveAnItem:(state,{payload})=>{
            console.log(44, payload)
            state.cartItems = RemoveOneItem(state.cartItems, payload)
        }
    }
})

export const { AddCartItems, ToggleCartItem,DeleteCartItem,RemoveAnItem } = orderReducer.actions

export default orderReducer.reducer