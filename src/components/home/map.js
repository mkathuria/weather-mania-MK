import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import features from "./features.json"
import { Button, Dialog, DialogTitle, Tooltip, Typography, makeStyles, styled, useTheme } from "@material-ui/core";
import { ReactComponent as CloseIcon } from "../../assests/close.svg";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 30
    },
    titleContainer: {
        color: theme.palette.background.unique.inverseBlack,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .MuiTypography-root": {
            fontSize: 20,
        },
        "& .MuiButton-root": {
            border: "none",
            borderRadius: `${theme.spacing(5)}px !important`,
            cursor: "pointer",
            textTransform: "none",
            color: theme.palette.background.unique.inverseBlack,
            background: theme.palette.background.neutral[100],
            fontWeight: 600,
            fontSize: 12,
            width: theme.spacing(15),
            padding: 0,
            height: theme.spacing(5),
        }
    },
    mapContainer: {
        height: ({ isDialog }) => isDialog ? "100%" : 400,
        width: "100%",
        background: theme.palette.background.neutral[50],
        borderRadius: ({ isDialog }) => isDialog ? 0 : theme.spacing(2.5),
        marginTop: ({ isDialog }) => isDialog ? 0 : 30
    }
}))
export default function MapComponent({ data, setQuery }) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    return (
        <section className={classes.container}>
            <section className={classes.titleContainer}>
                <Typography>Global Map</Typography>
                {/* <Button onClick={() => setOpen(true)}>View wide</Button> */}
            </section>
            <Map data={data} setQuery={setQuery} />
            <WideMap classes={classes} setOpen={setOpen} open={open} data={data} setQuery={setQuery} />
        </section>
    )
}

const Map = ({ isDialog, data, setQuery }) => {
    const classes = useStyles({ isDialog });
    const theme = useTheme()
    return (
        <ComposableMap className={classes.mapContainer}>
            <ZoomableGroup zoom={1.5} minZoom={1.5} maxZoom={1.5} center={[10, 10]} disableZooming={true}>
                <Geographies geography={features}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} />
                        ))
                    }
                </Geographies>
                {data.bulk && data.bulk.length && data.bulk.map((item, index) => (
                    <Tooltip arrow={true} title={item?.query?.location?.name}>
                        <Marker key={`marker${index}`} coordinates={[item?.query?.location?.lon, item?.query?.location?.lat]}>
                            <circle r={6} fill={theme.palette.background.frenchGrey[1]} onClick={() => setQuery(item?.query?.location?.name)} style={{ cursor: "pointer" }} />
                        </Marker>
                    </Tooltip>
                ))}
            </ZoomableGroup>
        </ComposableMap>
    )
}

const CustomDialog = styled(Dialog)({
    "& > div > div": {
        maxWidth: 1440,
        width: "100%",
        height: 600
    },
    "& .MuiTypography-root": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        "& > svg": {
            cursor: "pointer"
        },

    }
})

const WideMap = ({ setOpen, open, data, setQuery }) => {
    return (
        <CustomDialog open={open}>
            <DialogTitle>
                <span> Global View</span>
                <CloseIcon onClick={() => setOpen(false)} />
            </DialogTitle>
            <Map isDialog={true} data={data} setQuery={setQuery} />
        </CustomDialog>
    )
}