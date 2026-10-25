import { createTheme } from "@mui/material";

export function crearTema(mode) {
    const esModoClaro = mode === 'light'

    const colores = {
        primary: esModoClaro ? "#8115d3" : "#F1F3F9",
        secondary: esModoClaro ? "#dcdddf" : "#181a23",
        background: esModoClaro ? "#F7F8FC" : "#101318",
        paper: esModoClaro ? "#FFFFFF" : "#191E27",
        text: esModoClaro ? "#171923" : "#F1F3F9",
        textSecondary: esModoClaro ? "#575c6c" : "#cfd0d3",
        divider: esModoClaro ? "#E5E7EF" : "#303744"
    };

    return createTheme({
        palette: {
            mode,
            primary: {
                main: colores.primary
            },
            background: {
                default: colores.background,
                paper: colores.paper,
            },
            custom: {
                main: colores.secondary
            },
            text: {
                primary: colores.text,
                secondary: colores.textSecondary,
            },
            divider: colores.divider,
        },
        typography: {
            fontFamily: "Roboto, Arial, sans-serif",
            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 700,
            },
            button: {
                fontWeight: 600,
            },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true
                },
                styleOverrides: {
                    root: {
                        borderRadius: 20,
                        padding: "8px 22px",
                        transition: "all 0.2s ease",
                        textTransform: "none"
                    },
                    contained: {
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                            filter: "brightness(0.99)"
                        },
                    },
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& input:-webkit-autofill': {
                            WebkitBoxShadow: esModoClaro ? '0 0 0 100px #fff inset' : '0 0 0 100px #191E27 inset',
                            borderRadius: 0
                        },
                    },
                },
            }
        }
    })
}