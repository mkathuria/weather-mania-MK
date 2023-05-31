import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const news = createApi({
    reducerPath: 'news',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.nytimes.com/svc' }),
    endpoints: (builder) => ({
        getWorldTopStoriesData: builder.query({
            query: (payload) => ({
                url: `/topstories/v2/${payload}.json?api-key=GQhsfVFM3kybAF37xJ7Rt6oekxPiAusI`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
    }),
})

export const { useGetWorldTopStoriesDataQuery } = news;