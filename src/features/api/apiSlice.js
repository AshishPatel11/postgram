import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '../../services/cookies'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_BASE_URL,
        prepareHeaders: (headers) => {
            const token = getCookie("token")

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['users', 'posts'],
    endpoints: builder => ({
        addUser: builder.mutation({
            query: (user) => ({
                url: "/sign-up",
                method: "POST",
                body: user,
            })
        }),
        loginUser: builder.query({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user,
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: "/users/get-user",
                method: "GET"
            })
        })
    })
})

export const { useAddUserMutation, useLazyLoginUserQuery, useGetUserQuery } = apiSlice