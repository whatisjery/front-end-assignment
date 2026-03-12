import { FileDownload, Search } from "@mui/icons-material"
import { Button, InputAdornment, TextField } from "@mui/material"
import { useGridApiContext } from "@mui/x-data-grid"
import LaunchTableCopyButton from "./LaunchTableCopyButton"

declare module "@mui/x-data-grid" {
    interface ToolbarPropsOverrides {
        search: string
        onSearchChange: (value: string) => void
    }
}

type LaunchTabletoolbarProps = {
    search: string
    onSearchChange: (value: string) => void
}

export default function LaunchTabletoolbar({ search, onSearchChange }: LaunchTabletoolbarProps) {
    const apiRef = useGridApiContext()

    return (
        <div
            role="toolbar"
            className="flex flex-col-reverse sm:flex-col md:flex-row gap-y-3 justify-between sm:p-5 p-3"
        >
            <TextField
                placeholder="Search missions..."
                size="small"
                value={search}
                className="w-full sm:max-w-80 max-w-full"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <div className="flex sm:justify-end justify-start gap-x-2">
                <LaunchTableCopyButton />

                <Button
                    variant="contained"
                    startIcon={<FileDownload />}
                    onClick={() => apiRef.current.exportDataAsCsv()}
                >
                    Export CSV
                </Button>
            </div>
        </div>
    )
}
