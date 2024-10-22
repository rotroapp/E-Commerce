import { PRODUCT_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";


export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    getProducts: builder.query({
        query: () => ({
            url: PRODUCT_URL,
        }),   
     keepUnusedDataFor: 5,
    }),

    getProductDetail: builder.query({
        query: (id) =>  ({
            url : `${PRODUCT_URL}/${id}`
        }),
      keepUnusedDataFor:5,
    }),

    createProducts: builder.mutation({
      query: () => ({
          url: PRODUCT_URL,
          method: 'POST',
      }),
      invalidatesTags: ['Product']
    })
  }),
})

export const { useGetProductsQuery,useCreateProductsMutation, useGetProductDetailQuery } = productSlice;