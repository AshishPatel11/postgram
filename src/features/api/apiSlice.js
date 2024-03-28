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
        //add new user endpoint
        addUser: builder.mutation({
            query: (user) => ({
                url: "/sign-up",
                method: "POST",
                body: user,
            })
        }),
        //login user endpoint
        loginUser: builder.query({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user,
            })
        }),
        //get user by token endpoint
        getUser: builder.query({
            query: () => ({
                url: "/users/get-user",
                method: "GET"
            }),
            providesTags: ['users']
        }),
        //update current user endpoint
        updateUser: builder.mutation({
            query: user => ({
                url: "/users/update-user",
                method: "PUT",
                body: user
            }),
            invalidatesTags: ['users']
        }),
        //get all posts endpoint
        getFeedPosts: builder.query({
            query: params => ({
                url: `/posts/get-feed-posts?`,
                method: "GET",
                params
            }),
            providesTags: ['posts'],
            //socket connection for getting live post data
            async onCacheEntryAdded(args, { updateCachedData, cacheEntryRemoved, cacheDataLoaded }) {
                const token = getCookie('token')
                const socket = io('http://localhost:5000', {
                    extraHeaders: {
                        token
                    }
                })
                try {
                    await cacheDataLoaded;
                    const newPostListner = (event) => {
                        updateCachedData((draft) => {
                            draft.data.data.unshift(event) // inserting data in the array at the beggining
                        })
                    }
                    socket.on('new-post', newPostListner)
                } catch (error) {
                    console.error(error)
                }
                await cacheEntryRemoved;
                socket.close()
            }
        }),
        //Endpoint userData based on id provided in search params
        getUserData: builder.query({
            query: userId => ({
                url: `users/get-users-profile?userId=${userId}`,
                method: "GET"
            }),
            providesTags: ['users'],

        }),
        //Endpoint for getting the images of post
        getPostImage: builder.query({
            query: postId => ({
                url: `/posts/get-feed-image?postId=${postId}`,
                method: "GET",
            }),

        }),
        //Endpoint for creating new post
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