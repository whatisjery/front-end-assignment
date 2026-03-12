import { IconButton } from "@mui/material"
import { useColorScheme } from "@mui/material/styles"
import { cn } from "../../lib/utils"

export default function ButtonTheme() {
    const { mode, setMode } = useColorScheme()

    if (!mode) return null

    const handleThemeToggle = () => {
        setMode(mode === "dark" ? "light" : "dark")
    }

    return (
        <IconButton
            size="small"
            onClick={handleThemeToggle}
            aria-label={mode === "dark" ? "Light mode" : "Dark mode"}
            aria-pressed={mode === "dark"}
        >
            <div className="w-4.5 h-4.5 border-[1.5px] border-text rounded-full bg-text relative overflow-hidden">
                <div
                    className={cn(
                        "absolute top-0 left-0 h-full w-full bg-background transition-transform duration-500 translate-x-1/2",
                        { "-translate-x-1/2": mode === "light" },
                    )}
                />
            </div>
        </IconButton>
    )
}
