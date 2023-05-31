import { weather } from "../services/weather";
import { news } from "../services/news";
const { combineReducers } = require("@reduxjs/toolkit");

const { user } = require("./user");

const reducers = combineReducers({
    [user.name]: user.reducer,
    [weather.reducerPath]: weather.reducer,
    [news.reducerPath]: news.reducer
})

export default reducers