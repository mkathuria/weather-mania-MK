import reducers from "./reducers"
// import products from "./reducers/saga";
import createSagaMiddleware from "redux-saga";
import { weather } from "./services/weather";
const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");


const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer: reducers,
    middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: true }), weather.middleware]
})

// sagaMiddleware.run(products)