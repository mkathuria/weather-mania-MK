import { makeStyles } from "@material-ui/core"
import { Outlet } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#717172",
        [theme.breakpoints.up("xl")]: {
            display: "flex",
            minHeight: "100vh"
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