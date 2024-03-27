import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '../../services/cookies'
import { io } from 'socket.io-client'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_BASE_URL,
        prepareHeaders: (headers) => {
            const token = getCookie("token")

            // passing the auth token if found in cookies
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
            }),
            providesTags: ['users']
        }),
        updateUser: builder.mutation({
            query: user => ({
                url: "/users/update-user",
                method: "PUT",
                body: user
            }),
            invalidatesTags: ['users']
        }),
        getFeedPosts: builder.query({
            query: params => ({
                url: `/posts/get-feed-posts?`,
                method: "GET",
                params
            }),
            providesTags: ['posts'],
            async onCacheEntryAdded(args, { updateCachedData, cacheEntryRemoved, cacheDataLoaded }) {
                const token = getCookie('token')
                const socket = io('http://localhost:5000', {
                    extraHeaders: {
                        token
                    }
                })
                socket.on("connect", (err) => {
                    console.log(err)
                });

            }
        }),
        getUserData: builder.query({
            query: userId => ({
                url: `users/get-users-profile?userId=${userId}`,
                method: "GET"
            }),
            providesTags: ['users'],

        }),
        getPostImage: builder.query({
            query: postId => ({
                url: `/posts/get-feed-image?postId=${postId}`,
                method: "GET",
            }),

        }),
        createPost: builder.mutation({
            query: postData => ({
                url: "/posts/create-post",
                method: "POST",
                body: postData,
            }),
            // invalidatesTags: ['posts'],
        })
    })
})

export const {
    useAddUserMutation,
    useLazyLoginUserQuery,
    useGetUserQuery,
    useGetFeedPostsQuery,
    useGetUserDataQuery,
    useGetPostImageQuery,
    useCreatePostMutation,
    useUpdateUserMutation
} = apiSlice