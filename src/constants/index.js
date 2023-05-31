
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
export const newsCategory = [
    { name: "Home", value: "home" },
    { name: "Arts", value: "arts" },
    { name: "Automobiles", value: "automobiles" },
    { name: "Books/review", value: "books" },
    { name: "Business", value: "business" },
    { name: "Fashion", value: "fashion" },
    { name: "Food", value: "food" },
    { name: "Health", value: "health" },
    { name: "Insider", value: "insider" },
    { name: "Magazine", value: "magazine" },
    { name: "Movies", value: "movies" },
    { name: "Nyregion", value: "nyregion" },
    { name: "Obituaries", value: "obituaries" },
    { name: "Opinion", value: "opinion" },
    { name: "Politics", value: "politics" },
    { name: "Realestate", value: "realestate" },
    { name: "Science", value: "science" },
    { name: "Sports", value: "sports" },
    { name: "Sundayreview", value: "sundayreview" },
    { name: "Technology", value: "technology" },
    { name: "Theater", value: "theater" },
    { name: "T-magazine", value: "t-magazine" },
    { name: "Travel", value: "travel" },
    { name: "Upshot", value: "upshot" },
    { name: "Us", value: "us" }
]
