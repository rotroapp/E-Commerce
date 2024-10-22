import { createSlice } from "@reduxjs/toolkit";
import { updatecart } from "../util/cartUpdate";


const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):{
    cartItems: [], shippingAdd:{} , paymentMethod: 'PayPal'

};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state,action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);
        
            if(existItem){
                state.cartItems = state.cartItems.map((x) =>( x._id === existItem._id ? item: x))
            }else{
                state.cartItems = [...state.cartItems , item]
            }
            return updatecart(state);
        },

        removeCart: (state, action) => {
            const id = action.payload;

            state.cartItems = state.cartItems.filter(item => item._id != id);
            return updatecart(state);
        },

        shippingAddress: (state, action) => {
            state.shippingAdd = action.payload;
            return updatecart(state)
        },
        
        setPaymentMethod: (state,action) => {
            state.paymentMethod = action.payload
            return updatecart(state)
        },

        clearCartItems: (state,action) => {
            state.cartItems = []
            return updatecart(state)
        }
    }
});


export default cartSlice.reducer;
export const {addToCart, removeCart, clearCartItems,shippingAddress ,setPaymentMethod} = cartSlice.actions;
