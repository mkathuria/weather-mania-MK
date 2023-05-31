import { CircularProgress, Grid, IconButton, Tab, Tabs, Tooltip, makeStyles, styled } from "@material-ui/core";
import { useGetWorldTopStoriesDataQuery } from "../../services/news";
import { ReactComponent as ArrowIcon } from "../../assests/arrow.svg";
import { useState } from "react";
import { newsCategory } from "../../constants";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        background: theme.palette.background.unique.inverseWhite,
        height: "100%",
        borderRadius: theme.spacing(3.75),
        padding: theme.spacing(2),
        maxWidth: 1500,
        margin: "auto",
        [theme.breakpoints.down("md")]: {
            padding: theme.spacing(2),
            borderRadius: 0,
            maxWidth: "100%"
        },
        scrollbarColor: `${theme.palette.background.main} ${theme.palette.background.main}`,
        "&::-webkit-scrollbar-track": {
            background: theme.palette.background.unique.inverseWhite,
        }
    },
    boxContainer: {
        marginTop: 10
    },
    newsCard: {
        display: "flex",
        background: theme.palette.type.includes("light") ? "black" : "rgba(255, 255, 255, 0.2)",
        borderRadius: 12,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(4px)",
        backdropFilter: "blur(4px)",
        color: "white",
        height: theme.spacing(15),
        border: "1px solid rgba(255, 255, 255, 0.3)",
        "& > img": {
            height: "100%",
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
        },
    },
    dateContainer: {
        color: theme.palette.background.neutral[300],
        display: "flex",
        justifyContent: "space-between",
        "& > span": {
            "&::first-letter": {
                textTransform: "capitalize"
            }
        }
    },
    textContainer: {
        display: "flex",
        flexFlow: "column",
        gap: 10,
        padding: 10,
        "& > h4": {
            margin: 0
        }
    },
    mainTitle: {
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        "& >  h2": {
            color: theme.palette.background.unique.inverseBlack,
        },

    },
    headerIcons: {
        padding: 0,
        height: theme.spacing(4.5),
        width: theme.spacing(4.5),
        "& > span > svg": {
            color: theme.palette.background.unique.inverseBlack,
        },
        "&:hover": {
            background: theme.palette.background.neutral[600],
        }
    },
}))


export default function WorldTopNews() {
    const [value, setValue] = useState(0)
    const data =
        // {
        //     data: require("./data.json")
        // }
        useGetWorldTopStoriesDataQuery(newsCategory[value].value);
    const classes = useStyles()
    const navigate = useNavigate()
    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <IconButton className={classes.headerIcons} onClick={() => navigate("/")}>
                    <ArrowIcon />
                </IconButton>
                <h2 >
                    News (Top Stories)
                </h2>
            </header>
            <Tabs value={value} onChange={(e, tab) => {
                setValue(tab);
            }}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile

            >
                {newsCategory.map((item, index) => (
                    <StyledTab label={item.name} {...a11yProps(index)} key={`news_category_${index}`} />
                ))}
            </Tabs>
            {data.isLoading ? <CircularProgress /> :
                <Grid container spacing={{ xs: 2, md: 3, lg: 3 }} className={classes.boxContainer}>
                    {data.data && data.data.results && data.data.results.map((item, index) => {
                        const multimedia = item.multimedia && item.multimedia.length ? item.multimedia[item.multimedia.length - 1] : {}
                        return (
                            <Grid spacing={3} item xs={12} sm={6} md={4} lg={3} key={`news_card_${index}`} style={{ padding: 10 }} onClick={() => window.open(item.url)}>
                                <div className={classes.newsCard}>
                                    <img src={multimedia?.url} />
                                    <div className={classes.textContainer}>
                                        <div className={classes.dateContainer}>
                                            <span >
                                                {moment(item.published_date).fromNow()}
                                            </span>
                                            <span >
                                                · {item.section}
                                            </span>
                                        </div>
                                        <Tooltip title={item.title}>
                                            <h4>{item.title.length > 45 ? item.title.substring(0, 45) + "..." : item.title}</h4>
                                        </Tooltip>
                                    </div>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            }
        </div >
    )
}


const StyledTab = styled(Tab)(({ theme }) => (
    {
        color: theme.palette.background.unique.inverseBlack,
        textTransform: "none",
        minWidth: "fit-content",
        "& > .Mui-selected": {
            color: theme.palette.background.unique.inverseBlack,
        }
    }
))

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}