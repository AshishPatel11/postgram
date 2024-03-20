import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '../../services/cookies'
import { readImage } from '../../services/readImage'

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
        }),
        getFeedPosts: builder.query({
            query: page => ({
                url: `/posts/get-feed-posts?page=${parseInt(page)}`,
                method: "GET"
            }),
            providesTags: ['posts']
        }),
        getUserData: builder.query({
            query: userId => ({
                url: `users/get-users-profile?userId=${userId}`,
                method: "GET"
            }),
        }),
        getPostImage: builder.query({
            query: postId => ({
                url: `/posts/get-feed-image?postId=${postId}`,
                method: "GET",
                responseHandler: (response) => response.blob()
            }),
            transformResponse: async (response) => {
                return await readImage(response);
            }
        })
    })
})

export const {
    useAddUserMutation,
    useLazyLoginUserQuery,
    useGetUserQuery,
    useGetFeedPostsQuery,
    useGetUserDataQuery,
    useGetPostImageQuery
} = apiSlice