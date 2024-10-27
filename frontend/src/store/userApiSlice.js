import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants/constants";



const userApislice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
        query: (data)=>({
          url: `${USERS_URL}/login`,
          body: data,
          method: 'POST'
        }), 
      }),

      logout: builder.mutation({
        query:() => ({
         url: `${USERS_URL}/logout`,
         method: 'POST'   
        })
      }),

      register:builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}`,
              method : 'POST',
              body: data,
            })
      }),

      userprofile: builder.mutation({
        query: (data) =>({
         url: `${USERS_URL}/profile`,
         method: 'PUT',
         body: data
        })
      }),

      getusers: builder.query({
        query: () =>({
           url: USERS_URL,
           method: 'GET'
        })
      }),

      deleteuser: builder.mutation({
        query: (userId) =>({
          url:`${USERS_URL}/${userId}`,
          method:"DELETE"
        })
      }),

      getUserDetails: builder.query({
        query: (userId) => ({
          url: `${USERS_URL}/${userId}`,
          method: "GET",
        }),
        keepUnusedDataFor: 5,
      }),

      updateUser: builder.mutation({
        query: (data) =>({
          url: `${USERS_URL}/${data._id}`,
          method: 'PUT',
          body:{ ...data},
        }),
        invalidatesTags: ['User']
      })
    })
})

export const {useLoginMutation,useGetUserDetailsQuery, useLogoutMutation,useDeleteuserMutation,useGetusersQuery, useRegisterMutation, useUserprofileMutation,useUpdateUserMutation} = userApislice;