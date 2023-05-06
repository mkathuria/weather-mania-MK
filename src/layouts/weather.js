import { makeStyles } from "@material-ui/core"
import { Outlet } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.backgroundBg[5],
        // minHeight: "100vh",
        padding: 20,
        [theme.breakpoints.down("sm")]: {
            padding: 0
        },
    }
}))
export const WeatherLayout = () => {
    const classes = useStyles()
    return (
        <section className={classes.container}>
            <Outlet />
        </section>
    )
}