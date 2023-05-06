import { Button, CircularProgress, IconButton, Slide, Snackbar, makeStyles, useMediaQuery, useTheme } from "@material-ui/core"
import { ReactComponent as HomeIcon } from "../../assests/home.svg"
import { ReactComponent as LocationIcon } from "../../assests/map-pin.svg"
import { ReactComponent as SearchIcon } from "../../assests/search.svg"
import { memo, useContext, useEffect, useState } from "react"
import { StyleContext } from "../../styles"
import { DARK_THEME, DEFAULT_THEME } from "../../constants"
import WeekCard from "./weekCards"
import MapComponent from "./map"
import Alerts from "./alerts"
import StatsGraph from "./graph";
import { ReactComponent as AlertIcon } from "../../assests/alert.svg";
import { ReactComponent as SunIcon } from "../../assests/light_mode.svg";
import { ReactComponent as MoonIcon } from "../../assests/dark_mode.svg";
import moment from "moment"
import { useGetBulkWeatherDataMutation, useGetForecastDataQuery } from "../../services/weather"

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.unique.inverseWhite,
        height: "100%",
        borderRadius: theme.spacing(3.75),
        padding: theme.spacing(2),
        maxWidth: 1440,
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
            borderRadius: 0
        },
        scrollbarColor: `${theme.palette.background.main} ${theme.palette.background.main}`,
        "&::-webkit-scrollbar-track": {
            background: theme.palette.background.unique.inverseWhite,
        }
    },
    main: {
        display: "flex",
        justifyContent: "space-between",
        gap: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
        },
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: theme.spacing(1)
    },
    headerIcons: {
        background: theme.palette.background.main,
        height: theme.spacing(4.5),
        width: theme.spacing(4.5),
        padding: theme.spacing(1.2),
    },
    headerChild: {
        display: "flex",
        gap: theme.spacing(2.5),
        alignItems: "center",
        [theme.breakpoints.down("xs")]: {
            gap: theme.spacing(1),
        },
    },
    locationContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.background.unique.inverseBlack,
        gap: 5,
        whiteSpace: "nowrap",
        maxWidth: 250,
        [theme.breakpoints.down("xs")]: {
            maxWidth: 110,
        },
        "& > svg": {
            minWidth: 15
        },
        "& > p": {
            textOverflow: "ellipsis",
            overflow: "hidden",
        }
    },
    searchComponent: {
        display: "flex",
        background: theme.palette.background.main,
        color: theme.palette.background.unique.inverseBlack,
        padding: "10px 20px",
        borderRadius: theme.spacing(4),
        gap: theme.spacing(0.5),
        maxWidth: 600,
        width: "100%",
        "& > svg": {
            height: theme.spacing(2.5),
            width: theme.spacing(2.5),
        },
        "& > input": {
            background: "none",
            border: "none",
            outline: "none",
            color: theme.palette.background.unique.inverseBlack,
            width: "100%",
            "&::placeholder": {
                color: theme.palette.background.neutral[600],
            }
        },
        [theme.breakpoints.down("xs")]: {
            maxWidth: "100%",
            width: "inherit",
            marginTop: theme.spacing(1.5)
        }

    },
    leftContainer: {
        width: "75%",
        gap: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        }
    },
    tabContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 30,
        alignItems: "center",
        "& .MuiButton-root": {
            border: "none",
            color: theme.palette.background.unique.inverseBlack,
            borderRadius: `${theme.spacing(5)}px !important`,
            cursor: "pointer",
            textTransform: "none",
            width: theme.spacing(15),
            padding: 0,
            height: theme.spacing(5),
            fontWeight: 600,
        },
        "& .buttons-disabled": {
            color: theme.palette.background.neutral[500],
            fontWeight: 400,
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: theme.spacing(2)
        },
        "& > div": {
            display: "flex",
            gap: theme.spacing(2),
            cursor: "pointer",
            "& > button": {
                border: "none",
                outline: "none",
                background: "none",
                color: theme.palette.background.unique.inverseBlack,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontWeight: 400,
                fontSize: 16,
                cursor: "pointer",
            },
            [theme.breakpoints.down("xs")]: {
                justifyContent: "space-between",
                width: "100%"
            },
        }
    },
    rightButtonContainer: {
        display: "flex",
        position: "relative",
        gap: `0 !important`,
        width: ({ themeButton }) => themeButton ? 80 : 200,
        background: theme.palette.background.main,
        borderRadius: theme.spacing(5),
        border: "none",
        "&  > section": {
            width: ({ themeButton }) => themeButton ? 40 : "50%",
            height: theme.spacing(5),
            background: theme.palette.background.frenchGrey[1],
            transform: ({ checked, themeButton }) => checked === "AQI" || checked?.includes(DEFAULT_THEME) ? `translateX(${themeButton ? 40 : 100}px)` : "translateX(0px)",
            transition: "transform 300ms linear",
            position: "absolute",
            borderRadius: `${theme.spacing(5)}px !important`,
            [theme.breakpoints.down("xs")]: {
                transform: ({ checked }) => checked === "AQI" || checked?.includes(DEFAULT_THEME) ? "translateX(100%)" : "translateX(0px)",
                transition: "transform 300ms linear",
            }
        },
        "& .MuiButton-root": {
            border: "none",
            borderRadius: `${theme.spacing(5)}px !important`,
            cursor: "pointer",
            textTransform: "none",
            color: theme.palette.background.unique.inverseBlack,
            fontWeight: 600,
            fontSize: 12,
            minWidth: ({ themeButton }) => themeButton ? 40 : 100,
            padding: 0,
            height: theme.spacing(5),
            [theme.breakpoints.down("xs")]: {
                minWidth: ({ themeButton }) => themeButton ? 40 : "50%",
            },
            "&:disabled": {
                color: theme.palette.background.unique.inverseWhite,
            },

        },
        [theme.breakpoints.down("xs")]: {
            width: ({ themeButton }) => themeButton ? 80 : "100%",
            marginTop: ({ marginTop }) => marginTop
        }
    },
    lightMode: {
        "& > path ": {
            fill: theme.palette.background.unique.inverseBlack,
        }
    }

}))
const HomeComponent = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"))

    const classes = useStyles();
    const [type, setType] = useState("FORECAST");
    const [anchorEl, setAnchorEl] = useState(null);
    const [query, setQuery] = useState("");
    const [debounced, setDebouncedValue] = useState("");
    const [selectedDate, setSeletedDate] = useState(moment().format("YYYY-MM-DD"));
    const [bulkData, setBulkData] = useState({})
    // const dispatch = useDispatch();

    useEffect(() => {
        const time = setTimeout(() => {
            setDebouncedValue(query)
            // dispatch({ type: "user/forecast", payload: query })
        }, 1000)
        return () => {
            clearTimeout(time)
        }
    }, [query]);

    const [getBulkCurrent, response] = useGetBulkWeatherDataMutation();
    const forecastData = useGetForecastDataQuery(debounced ? debounced : "New Delhi");

    useEffect(() => {
        getBulkCurrent().then((res) => {
            setBulkData(res.data ? res.data : {})
        });
    }, [getBulkCurrent])
    const { data, error } = forecastData;
    const forecastError = error?.data?.error?.message
    const forecast = data

    return (

        forecastData.isLoading || response.isLoading ?
            <CircularProgress color="primary" />
            :
            <section className={classes.container}>
                <Header classes={classes} isMobile={isMobile} setAnchorEl={setAnchorEl} anchorEl={anchorEl} setQuery={setQuery} query={query}
                    location={forecast?.location}
                />

                <section className={classes.main}>
                    <section className={classes.leftContainer}>
                        <Tabs classes={classes} type={type} setType={setType}
                        />
                        <WeekCard reportType={type}
                            forecastday={forecast?.forecast?.forecastday}
                            current={forecast?.current}
                            selectedDate={selectedDate}
                            setSeletedDate={setSeletedDate}
                        />
                        <MapComponent
                            data={bulkData}
                        />
                    </section>
                    <StatsGraph stats={forecast} date={selectedDate} bulkData={bulkData} setQuery={setQuery} />
                    <Alerts handleClose={() => setAnchorEl(null)} anchorEl={anchorEl} alerts={forecast?.alerts?.alert} />
                </section>
                <Snackbar
                    TransitionComponent={TransitionLeft}
                    open={Boolean(forecastError)}
                    autoHideDuration={2000}
                    message={forecastError}
                // onClose={() => dispatch(setForecastError(""))}
                />
            </section>
    )
}


function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

const Header = (props) => {


    const { classes, isMobile, setAnchorEl, anchorEl, location } = props

    return (
        <>
            <header className={classes.nav}>
                <section className={classes.headerChild}>
                    <IconButton className={classes.headerIcons} aria-label="home">
                        <HomeIcon />
                    </IconButton>
                    <IconButton className={classes.headerIcons} aria-label="home" onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}>
                        <AlertIcon />
                    </IconButton>
                    <section className={classes.locationContainer}>
                        <LocationIcon height={15} width={15} />
                        <p>
                            {location?.name},{location?.country}
                        </p>
                    </section>

                </section>
                {!isMobile && <SearchComponent classes={classes} {...props} />}
                <section className={classes.headerChild}>
                    <ThemeSwitch />
                </section>
            </header>
            {isMobile && <SearchComponent classes={classes} {...props} />}
        </>
    )
}


const SearchComponent = ({ classes, query, setQuery }) => {
    return (
        <section className={classes.searchComponent}>
            <SearchIcon />
            <input name="search" id="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </section>
    )
}

const ThemeSwitch = () => {
    const theme = useTheme()
    const type = theme.palette.type
    const classes = useStyles({ checked: type, marginTop: 0, themeButton: true })
    const context = useContext(StyleContext)
    const setTheme = (theme) => {
        context.updateTheme(theme)
    }

    return (
        <section className={classes.rightButtonContainer}>
            <section ></section>
            <Button aria-label={DARK_THEME} disableTouchRipple={true} className={type === DARK_THEME ? "buttons-disabled" : ""} onClick={() => setTheme(DARK_THEME)} disabled={type === DARK_THEME}>
                <MoonIcon height={20} width={20} />
            </Button>
            <Button aria-label={DEFAULT_THEME} disableTouchRipple={true} className={type === DEFAULT_THEME ? "buttons-disabled" : ""} onClick={() => setTheme(DEFAULT_THEME)} disabled={type === DEFAULT_THEME}>
                <SunIcon height={20} width={20} className={classes.lightMode} />
            </Button>
        </section>
    )
}



const Tabs = memo(({ type, setType }) => {
    const [selected, setSelected] = useState(0);
    const classes = useStyles({ checked: type, marginTop: 16 })
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"))


    return (
        <>
            <header className={classes.tabContainer}>
                <div>
                    <button className={selected !== 0 ? "buttons-disabled" : ""} onClick={() => setSelected(0)}>Today</button>
                    {/* <button className={selected !== 1 ? "buttons-disabled" : ""} onClick={() => setSelected(1)}>Tommorow</button> */}
                    <button className={selected !== 2 ? "buttons-disabled" : ""} onClick={() => setSelected(2)}>Next 7 days</button>
                </div>
                {!isMobile &&
                    <RightTab classes={classes} setType={setType} type={type} />
                }
            </header >
            {isMobile &&
                <RightTab classes={classes} setType={setType} type={type} />
            }
        </>
    )
}, (prev, next) => {

})

const RightTab = ({ classes, setType, type }) => {
    return (
        <div className={classes.rightButtonContainer}>
            <section ></section>
            <Button aria-label="FORECAST" disableTouchRipple={true} className={type === "FORECAST" ? "buttons-disabled" : ""} onClick={() => setType("FORECAST")} disabled={type === "FORECAST"}>Forecast</Button>
            <Button aria-label="AQI" disableTouchRipple={true} className={type === "AQI" ? "buttons-disabled" : ""} onClick={() => setType("AQI")} disabled={type === "AQI"}>Air Quality</Button>
        </div>
    )
}

export default HomeComponent