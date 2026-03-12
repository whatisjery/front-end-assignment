import { GitHub, RestartAlt } from "@mui/icons-material"
import { Drawer, IconButton, Tooltip, useColorScheme } from "@mui/material"
import { useState } from "react"
import ButtonTheme from "./components/common/ButtonTheme"
import LaunchDetailsCard from "./components/feature/launch-detail/LaunchDetailCard"
import LaunchTable from "./components/feature/launch-table/LaunchTable"
import type { Launch } from "./types/launch"

export default function App() {
    const { mode } = useColorScheme()
    const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null)

    return (
        <div className="mx-auto px-5">
            <nav className="flex fixed z-1 px-5 left-0 top-0 w-screen items-center bg-background rounded-md justify-between border-b border-divider mb-15 sm:py-5 py-2">
                <img
                    src={mode === "dark" ? "/spacex_dark.png" : "/spacex_light.png"}
                    alt="SpaceX"
                    className="h-5"
                />

                <div className="flex items-center gap-x-2">
                    <ButtonTheme />

                    <IconButton
                        component="a"
                        size="small"
                        color="inherit"
                        href="https://github.com/whatisjery/front-end-assignment"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                    >
                        <GitHub fontSize="small" />
                    </IconButton>

                    <Tooltip title="Reset preferences">
                        <IconButton
                            size="small"
                            className="text-primary"
                            onClick={() => {
                                localStorage.clear()
                                window.location.reload()
                            }}
                        >
                            <RestartAlt fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </nav>

            <main className="max-w-260 mx-auto sm:pt-30 pt-18">
                <h1 className="sm:text-3xl text-lg font-semibold tracking-[-0.025em] mb-5 flex">
                    SpaceX launch archives (2006 - 2022)
                </h1>

                <LaunchTable onSelectLaunch={setSelectedLaunch} />

                <Drawer
                    anchor="right"
                    open={!!selectedLaunch}
                    onClose={() => setSelectedLaunch(null)}
                    transitionDuration={150}
                    slotProps={{
                        transition: {
                            easing: {
                                enter: "cubic-bezier(.65,.25,.14,.84)",
                                exit: "cubic-bezier(0.4, 0, 0.2, 1)",
                            },
                        },
                        paper: {
                            sx: {
                                backgroundColor: "background.default",
                                backgroundImage: "none",
                                boxShadow: "none",
                            },
                        },
                    }}
                >
                    {selectedLaunch && (
                        <LaunchDetailsCard
                            launch={selectedLaunch}
                            onClose={() => setSelectedLaunch(null)}
                        />
                    )}
                </Drawer>
            </main>
        </div>
    )
}
