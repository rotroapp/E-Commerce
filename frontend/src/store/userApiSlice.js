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
      })

    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUserprofileMutation} = userApislice;