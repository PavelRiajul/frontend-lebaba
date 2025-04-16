import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/getbaseurl'


const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/reviews`,
         credentials: 'include'
    }),
    tagTypes: ["Reviews"],
    endpoints: (builder) =>({
        //post review
        postAReview: builder.mutation({
            query: (reviewData) =>({
                url: '/post-review',
                method: 'POST',
                body: reviewData
            }),
            invalidatesTags: (result, error, {postId}) => [{type: "Reviews", id:postId }]
        }),
        //get review counts 
        getReviewsCount: builder.query({
            query: () => ({
                url: "/total-reviews"
            })
        }),
        //get review data for user
        getReviewByUserId: builder.query({
            query: (userId) => ({
                url: `/${userId}`
            }),
            providesTags: (result) => result ? [{type: "Reviews", id: result[0]?.email}] : []
        })
    })
})

export const {useGetReviewByUserIdQuery,useGetReviewsCountQuery,usePostAReviewMutation} = reviewsApi;
export default reviewsApi