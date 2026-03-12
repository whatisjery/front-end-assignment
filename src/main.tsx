import GlobalStyles from "@mui/material/GlobalStyles"
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles"
import type {} from "@mui/x-data-grid/themeAugmentation"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/index.css"
import App from "./App"
import { theme } from "./styles/theme"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <StyledEngineProvider enableCssLayer>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            <ThemeProvider defaultMode="light" theme={theme}>
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </StrictMode>,
)
