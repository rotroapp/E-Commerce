import { PRODUCT_URL, UPLOAD_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";


export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    getProducts: builder.query({
        query: ({keyword,pageNumber}) => ({
            url: PRODUCT_URL,
            params: {
              keyword,
              pageNumber,
            }
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
    }),

    updateProduct: builder.mutation({
      query: (detail) =>({
        url: `${PRODUCT_URL}/${detail._id}`,
        method: "PUT",
        body:detail
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
   uploadProductImage: builder.mutation({
       query:(data) => ({
       url:`${UPLOAD_URL}`,
       method: 'POST',
       body: data
       })
   }),
    
   deleteProduct: builder.mutation({
    query: (id) => ({
      url: `${PRODUCT_URL}/${id}`,
      method: "DELETE"
    })
   }),

   createReview: builder.mutation({
    query: (data) => ({
      url: `${PRODUCT_URL}/${data.productId}/reviews`,
      method: "POST",
      body: data
    }),
    invalidatesTags:['Product']
   }),

     getTopProducts: builder.query({
      query: () =>({
        url:`${PRODUCT_URL}/top`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
     })
  })
})

export const { useGetProductsQuery,useGetTopProductsQuery,useCreateReviewMutation,useUploadProductImageMutation,useDeleteProductMutation,useCreateProductsMutation, useGetProductDetailQuery ,useUpdateProductMutation} = productSlice;