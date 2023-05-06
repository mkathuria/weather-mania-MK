import { Dialog, DialogTitle, Divider, Paper, Popover, makeStyles, styled } from "@material-ui/core"
import { useState } from "react";
import { ReactComponent as CloseIcon } from "../../assests/close.svg";

const useStyles = makeStyles((theme) => ({
    main: {
        padding: theme.spacing(2.5),
        background: theme.palette.background.main,
        "& .MuiDialogTitle-root": {
            padding: 0
        },
        "& .MuiTypography-root": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: theme.palette.background.unique.inverseBlack,
            "& > svg": {
                cursor: "pointer"
            },
        },
        display: "flex",
        flexFlow: "column",
        gap: theme.spacing(2),
    },
    alertCard: {
        cursor: "pointer",
        borderRadius: theme.spacing(1),
        color: theme.palette.background.unique.inverseBlack,
        padding: 10,
        fontSize: 14,
        "& p": {
            margin: 0
        },
        "& > div > span": {
            fontWeight: 600,
            fontSize: 15,
        },
        "& > div > svg": {
            marginTop: theme.spacing(1.25)
        },
        "& > div > section": {
            display: "flex",
            gap: 5,
            fontSize: 12,
            whiteSpace: "nowrap",
            "& p:nth-child(2)": {
                fontWeight: 600
            },

        },
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        },
    },
}))

const StyledPopover = styled(Popover)({
    "& .MuiPaper-root": {
        minWidth: 200,
    },
    "& .MuiDialogTitle-root": {
        padding: 10
    }
})

export default function Alerts({ anchorEl, handleClose, alerts }) {
    const classes = useStyles()
    const [state, setState] = useState({
        alert: {},
        open: false
    })
    const showDetails = (alert) => {
        setState({
            alert,
            open: true
        })
    }

    return (
        <StyledPopover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <DialogTitle>
                <span>Alerts</span>
            </DialogTitle>
            <Divider />
            <aside className={classes.main}>

                {alerts && alerts.length ? alerts.map((item, index) => {
                    return (
                        <Paper key={`alerts_${index}`} className={classes.alertCard} onClick={() => showDetails(item)}>
                            <p>
                                {item.headline}
                            </p>
                        </Paper>
                    )
                }) : "No alerts"}
                <DetailDialog state={state} setState={setState} />
            </aside>
        </StyledPopover>
    )
}


const CustomDialog = styled(Dialog)({
    "& > div > div": {
        maxWidth: 1440,
        width: "100%",
        height: 600,
        "& > section": {
            padding: 10
        }
    },
    "& .MuiTypography-root": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        "& > svg": {
            cursor: "pointer"
        }
    },

})
const DetailDialog = ({ state, setState }) => {
    return (
        <CustomDialog open={state.open}>
            <DialogTitle>
                <span> Details</span>
                <CloseIcon onClick={() => setState({
                    alert: {},
                    open: false
                })} /></DialogTitle>
            <Divider />
            <section>
                {state?.alert?.desc}
            </section>
        </CustomDialog>
    )
}