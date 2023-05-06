import { put, takeLatest } from "redux-saga/effects"
import { setForecast, setForecastError } from "../user"
function* callForecast({ payload }) {
    const data = yield fetch(`http://api.weatherapi.com/v1/forecast.json?key=7b0f376bf5564d138f5133940230305&q=${payload}&days=7&alerts=yes&aqi=yes`).then(async (data) => {
        data = await data.json()

        return data
    });
    if (!data || !data.error) {
        yield put(setForecast(data))
    } else {
        yield put(setForecastError(data.error.message))
    }
}

export default function* fetchForecast() {
    yield takeLatest("user/forecast", callForecast)
}