import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import cartSliceReducer from "./cartSlice.js"
import  authReducer from "./authSilce.js"

const reduxStore = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        cart:cartSliceReducer,
        auth:authReducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})

export default reduxStore;