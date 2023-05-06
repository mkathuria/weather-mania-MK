const { createSlice, createAction } = require("@reduxjs/toolkit");
export const setForecast = createAction("user/setForecast", function prepare(payload) {
    return {
        payload
    }
}
)
export const setForecastError = createAction("user/setForecastError", function prepare(payload) {
    return {
        payload
    }
}
)

export const user = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        forecast: {
            forecastday: {},
            alerts: {},
        },
        forecastError: "",
        name: ""
    },
    reducers: {
        update: (state, action) => {
            state["loggedIn"] = action.data
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setForecast, (state, action) => {
            state["forecast"] = action.payload
        })
        builder.addCase(setForecastError, (state, action) => {
            state["forecastError"] = action.payload
        })
    }
})