/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { crearTema } from "../theme"

const ThemeContext = createContext(null)

export function ColorModeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("inventory-manager-color-mode") === "dark"
            ? "dark"
            : "light";
    })

    useEffect(() => {
        localStorage.setItem("inventory-manager-color-mode", mode);
    }, [mode]);

    const theme = useMemo(() => crearTema(mode), [mode])

    const colorMode = useMemo(() => ({
        mode,
        toggleColorMode: () => {
            setMode(currentMode => currentMode === 'light' ? 'dark' : 'light')
        }
    }), [mode])

    return (
        <ThemeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export function useColorMode() {
    const context = useContext(ThemeContext);

    if (context === null) {
        throw new Error(
            "useColorMode debe utilizarse dentro de ColorModeProvider."
        );
    }

    return context;
}