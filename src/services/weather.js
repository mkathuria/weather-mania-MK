import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const weather = createApi({
    reducerPath: 'weather',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.weatherapi.com/v1' }),
    endpoints: (builder) => ({
        getForecastData: builder.query({
            query: (payload) => ({
                url: `/forecast.json?key=7b0f376bf5564d138f5133940230305&q=${payload}&days=7&alerts=yes&aqi=yes`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
        getBulkWeatherData: builder.mutation({
            query: () => ({
                url: '/current.json?key=7b0f376bf5564d138f5133940230305&q=bulk',
                method: 'POST',
                body: {
                    "locations": [
                        {
                            "q": "New Delhi",
                        },
                        {
                            "q": "London",
                        },
                        {
                            "q": "France",
                        },
                        {
                            "q": "USA",
                        }
                    ]
                },
                headers: {
                    'Content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Post'],
        }),

    }),
})

export const { useGetBulkWeatherDataMutation, useGetForecastDataQuery } = weather;