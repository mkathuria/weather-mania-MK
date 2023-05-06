import { ReactComponent as Overcast } from "../assests/overcast.svg"
import { ReactComponent as Sunny } from "../assests/sunny.svg"
import { ReactComponent as Snow } from "../assests/snowy.svg"
import { ReactComponent as Rainy } from "../assests/rainy.svg"
import { ReactComponent as Cloud } from "../assests/cloud.svg"
import { ReactComponent as HeavySnow } from "../assests/heavy_snow.svg"

export const LOCAL_THEME = "LOCAL_THEME"
export const DARK_THEME = "dark"
export const DEFAULT_THEME = "light";
export const US_EPA_SCALE = {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy for sensitive group",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous",
}
export const UK_DEFRA_INDEX = (index) => {
    switch (index) {
        case 1:
        case 2:
        case 3:
            return {
                band: "Low",
                value: 1 ? "0-11" : 2 ? "12-23" : "24-35"
            }
        case 4:
        case 5:
        case 6:
            return {
                band: "Moderate",
                value: 4 ? "36-41" : 5 ? "42-47" : "48-53"
            }
        case 7:
        case 8:
        case 9:
            return {
                band: "High",
                value: 7 ? "54-58" : 8 ? "59-64" : "65-70"
            }
        case 10:
            return {
                band: "Very High",
                value: ">71"
            }
        default:
            return {
                band: "",
                value: ""
            }
    }
}
export const weatherCodes = {
    395: { icon: <Snow height={50} width={50} />, name: "heavy_snow" },
    392: { icon: <Snow height={50} width={50} />, name: "light_snow" },
    389: { icon: <Rainy height={50} width={50} />, name: "heavy_rain" },
    386: { icon: <Rainy height={50} width={50} />, name: "light_rain" },
    377: { icon: <HeavySnow height={50} width={50} />, name: "heavy_ice_pallet" },
    374: { icon: <Snow height={50} width={50} />, name: "light_ice_pallet" },
    371: { icon: <Snow height={50} width={50} />, name: "heavy_snow_shower" },
    368: { icon: <Snow height={50} width={50} />, name: "light_snow_shower" },
    365: { icon: <HeavySnow height={50} width={50} />, name: "heavy_sleet_shower" },
    362: { icon: <Snow height={50} width={50} />, name: "light_sleet_shower" },
    359: { icon: <Rainy height={50} width={50} />, name: "torrential_rain_shower" },
    356: { icon: <Rainy height={50} width={50} />, name: "heavy_rain_shower" },
    353: { icon: <Rainy height={50} width={50} />, name: "light_rain_shower" },
    350: { icon: <Snow height={50} width={50} />, name: "ice_pellet" },
    338: { icon: <HeavySnow height={50} width={50} />, name: "heavy_snow" },
    335: { icon: <HeavySnow height={50} width={50} />, name: "patchy_heavy_snow" },
    332: { icon: <Snow height={50} width={50} />, name: "moderate_snow" },
    329: { icon: <Snow height={50} width={50} />, name: "patchy_moderate_snow" },
    326: { icon: <Snow height={50} width={50} />, name: "light_snow" },
    323: { icon: <Snow height={50} width={50} />, name: "Patchy light_snow" },
    320: { icon: <Snow height={50} width={50} />, name: "heavy_sleet" },
    317: { icon: <Snow height={50} width={50} />, name: "light_sleet" },
    314: { icon: <Rainy height={50} width={50} />, name: "heavy_freezing_rain" },
    311: { icon: <Rainy height={50} width={50} />, name: "light_freezing_rain" },
    308: { icon: <Rainy height={50} width={50} />, name: "heavy_rain" },
    305: { icon: <Rainy height={50} width={50} />, name: "heavy_rain_at_times" },
    302: { icon: <Rainy height={50} width={50} />, name: "moderate_rain" },
    299: { icon: <Rainy height={50} width={50} />, name: "moderate_rain_at_times" },
    296: { icon: <Rainy height={50} width={50} />, name: "light_rain" },
    293: { icon: <Rainy height={50} width={50} />, name: "patchy_light_rain" },
    284: { icon: <Snow height={50} width={50} />, name: "heavy_freezing_drizzle" },
    281: { icon: <Snow height={50} width={50} />, name: "Freezing_drizzle" },
    266: { icon: <Snow height={50} width={50} />, name: "light_drizzle" },
    263: { icon: <Snow height={50} width={50} />, name: "patchy_light_drizzle" },
    260: { icon: <Snow height={50} width={50} />, name: "freezing_fog" },
    248: { icon: <Snow height={50} width={50} />, name: "fog" },
    230: { icon: <Snow height={50} width={50} />, name: "blizzard" },
    227: { icon: <Snow height={50} width={50} />, name: "blowing_snow" },
    200: { icon: <Snow height={50} width={50} />, name: "thundery_outbreaks_in_nearby" },
    185: { icon: <Snow height={50} width={50} />, name: "patchy_freezing_drizzle_nearby" },
    182: { icon: <Snow height={50} width={50} />, name: "patchy_sleet_nearby" },
    179: { icon: <Snow height={50} width={50} />, name: "patchy_snow_nearby" },
    176: { icon: <Rainy height={50} width={50} />, name: "patchy_rain_nearby" },
    143: { icon: <Snow height={50} width={50} />, name: "mist" },
    122: { icon: <Overcast height={50} width={50} />, name: "overcast" },
    119: { icon: <Cloud height={50} width={50} />, name: "cloudy" },
    116: { icon: <Cloud height={50} width={50} />, name: "partly_cloudy" },
    113: { icon: <Sunny height={50} width={50} />, name: "sunny" },
}