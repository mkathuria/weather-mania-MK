import { weather } from "../services/weather";
const { combineReducers } = require("@reduxjs/toolkit");

const { user } = require("./user");

const reducers = combineReducers({
    [user.name]: user.reducer,
    [weather.reducerPath]: weather.reducer
})

export default reducers