import { createTheme } from "@mui/material/styles"
import type {} from "@mui/x-data-grid/themeAugmentation"
import "./index.css"

declare module "@mui/material/styles" {
    interface TypeBackground {
        muted: string
    }
}

export const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-mui-color-scheme",
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "outlined" },
                    style: ({ theme }) => ({
                        borderColor: theme.vars.palette.divider,
                        backgroundColor: theme.vars.palette.background.default,
                        color: theme.vars.palette.text.primary,
                        fontWeight: 400,
                        borderRadius: 8,
                        boxShadow: "none",
                        textTransform: "none",
                        "&:hover": {
                            opacity: 0.8,
                            boxShadow: "none",
                        },
                    }),
                },
                {
                    props: { variant: "contained" },
                    style: ({ theme }) => ({
                        backgroundColor: theme.vars.palette.secondary.main,
                        color: theme.vars.palette.background.default,
                        border: "none",
                        fontWeight: 400,
                        borderRadius: 8,
                        boxShadow: "none",
                        textTransform: "none",
                        "&:hover": {
                            opacity: 0.8,
                            boxShadow: "none",
                        },
                        ...theme.applyStyles("dark", {
                            color: theme.vars.palette.text.primary,
                        }),
                    }),
                },
            ],
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    height: 38,
                    borderRadius: 8,
                    "& fieldset": {
                        borderColor: theme.vars.palette.divider,
                    },
                    "&:hover fieldset": {
                        borderColor: theme.vars.palette.text.secondary,
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: theme.vars.palette.text.primary,
                        borderWidth: 1,
                    },
                }),
            },
        },

        MuiBackdrop: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: "rgba(255 255 255 / 0.62)",
                    backdropFilter: "blur(3px)",
                    ...theme.applyStyles("dark", {
                        backgroundColor: "rgba(0 0 0 / 0.4)",
                        backdropFilter: "blur(3px)",
                    }),
                }),
            },
        },

        MuiButtonBase: {
            styleOverrides: {
                root: ({ theme }) => ({
                    "& .MuiTouchRipple-root": {
                        color: "rgba(106 112 141 / 0.2)",
                        ...theme.applyStyles("dark", {
                            color: "rgba(231 231 231 / 0.2)",
                        }),
                    },
                }),
            },
        },
    },

    colorSchemes: {
        dark: {
            palette: {
                action: {
                    selected: "#171718",
                    hover: "#171718",
                },
                primary: {
                    main: "#E7E7E7",
                },
                secondary: {
                    main: "#516AD8",
                },
                background: {
                    default: "#0F0F10",
                    muted: "#09090A",
                    paper: "#EBEBEB",
                },
                text: {
                    primary: "#FFFFFF",
                    secondary: "#C2C2C2",
                },
                DataGrid: {
                    headerBg: "#171820",
                },
                divider: "#1F1D2B",
            },
        },
        light: {
            palette: {
                action: {
                    selected: "#F3F3F3",
                    hover: "#F3F3F3",
                },
                primary: {
                    main: "rgb(19 28 70)",
                },
                secondary: {
                    main: "#0F57FF",
                },
                background: {
                    default: "#FFFFFF",
                    muted: "#FCFDFF",
                    paper: "#FFFFFF",
                },
                text: {
                    primary: "#011F4F",
                    secondary: "#394F71",
                },
                DataGrid: {
                    headerBg: "#F7F7F7",
                    bg: "dimgray",
                },
                divider: "#E4E9F3",
            },
        },
    },
    typography: {
        fontFamily: "Geist, sans-serif",
    },
})
