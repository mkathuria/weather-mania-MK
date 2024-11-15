import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const weather = createApi({
    reducerPath: 'weather',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.weatherapi.com/v1' }),
    endpoints: (builder) => ({
        getForecastData: builder.query({
            query: (payload) => ({
                url: `/forecast.json?key=ff046475e0c4416fac371505230111&q=${payload}&days=7&alerts=yes&aqi=yes`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            }),
        }),
        getBulkWeatherData: builder.mutation({
            query: () => ({
                url: '/current.json?key=42435fa1f48547ef9a482238233105&q=bulk',
                method: 'POST',
                body: {
                    "locations": [
                        {
                            "q": "New Delhi",
                        },
                        {
                            "q": "Irkutsk",
                        },
                        {
                            "q": "London",
                        },
                        {
                            "q": "Tokyo",
                        },
                        {
                            "q": "New York",
                        },
                        {
                            "q": "Beijing",
                        },
                        {
                            "q": "Johannesburg",
                        },
                        {
                            "q": "Auckland",
                        },
                        {
                            "q": "Sydney",
                        },
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
