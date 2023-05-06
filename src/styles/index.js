import { ThemeProvider, createStyles, makeStyles } from "@material-ui/core";
import { createContext, useState } from "react";
import dark from "./dark"
import light from "./light";
import { LOCAL_THEME, DEFAULT_THEME, DARK_THEME } from "../constants"


export const StyleContext = createContext(null);
const useStyle = makeStyles((theme) =>
    createStyles({
        "@global": {
            body: {
                margin: 0,
                fontFamily: "Montserrat",
                "&::-webkit-scrollbar-track": {
                    background: "#1C1C1C",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#1C1C1C",
                }
            },
            span: {
                fontFamily: "Montserrat"
            },
            button: {
                fontFamily: "Montserrat"
            },
            div: {
                fontFamily: "Montserrat"
            },
            input: {
                fontFamily: "Montserrat"
            },
            ".MuiTypography-root": {
                fontFamily: "Montserrat"
            },
            "p": {
                fontFamily: "Montserrat"
            },

        }
    }))

const getTheme = (theme) => {
    return {
        dark,
        light
    }[theme]
}
export const GlobalStyle = ({ children }) => {
    useStyle()

    const [theme, setTheme] = useState(getCurrentTheme())
    const cotextValue = {
        currentTheme: getTheme(theme),
        updateTheme: (theme) => {
            localStorage.setItem(LOCAL_THEME, theme)
            setTheme(theme)
        }
    }
    return (
        <StyleContext.Provider value={cotextValue}>
            <ThemeProvider theme={cotextValue.currentTheme}>
                {children}
            </ThemeProvider>
        </StyleContext.Provider>
    )
}

export const getCurrentTheme = () =>
    localStorage.getItem(LOCAL_THEME) ||
    (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? DARK_THEME
        : DEFAULT_THEME);