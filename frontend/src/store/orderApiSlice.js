import { apiSlice } from "./apiSlice";
import { ORDER_URL, PAYPAL_URL } from "../constants/constants";



export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDER_URL,
                method: 'POST',
                body: order
            }),
        }),
    
        getOrderDetails: builder.query({
            query: (id) => ({
               url:`${ORDER_URL}/${id}`,
            }),
            keepUnusedDataFor:5,
        }),

        payOrder: builder.mutation({
            query: ({orderId,details}) => ({
                 url: `${ORDER_URL}/${orderId}/pay`,
                 method: 'PUT',
                 body:details
            }),
        }),

        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL
            }),
            keepUnusedDataFor: 5,
        }),

        getMyOrders: builder.query({
            query: () => ({
             url: `${ORDER_URL}/mine`,
            }),
            keepUnusedDataFor:5,
        }),

        getOrders: builder.query({
            query: () => ({
               url: ORDER_URL
            }),
            keepUnusedDataFor: 5,
        }),

        updateDeliver: builder.mutation({
            query: (Orderid) => ({
                url: `${ORDER_URL}/${Orderid}/deliver`,
                method: 'PUT'
            })
        })
    
    }),

  
    
});

export const {useCreateOrderMutation,usePayOrderMutation,useGetOrdersQuery,useUpdateDeliverMutation, useGetOrderDetailsQuery,useGetPayPalClientIdQuery, useGetMyOrdersQuery} = orderApiSlice;