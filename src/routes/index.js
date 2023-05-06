import { Routes, Route, Navigate } from "react-router-dom"
import { WeatherLayout } from "../layouts/weather"
import HomeComponent from "../components/home"
import { GlobalStyle } from "../styles"

const weatherRoutes = [
    { route: "/", component: <HomeComponent /> },
]

export const App = () => {

    return (
        <GlobalStyle>
            <Routes>
                {/* WEATHER rOUTE */}
                <Route path="/" element={<WeatherLayout />} >
                    {weatherRoutes.map((item, index) => (
                        <Route key={`weather_routes_${index}`} path={item.route} element={item.component} />
                    ))}
                </Route>
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </GlobalStyle>
    )
}