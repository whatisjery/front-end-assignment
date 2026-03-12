import { Refresh } from "@mui/icons-material"
import { Button } from "@mui/material"

declare module "@mui/x-data-grid" {
    interface NoRowsOverlayPropsOverrides {
        error: string | null
        onRetry: () => void
    }
}

interface NoRowsOverlayProps {
    error: string | null
    onRetry: () => void
}

export default function LaunchTableError({ error, onRetry }: NoRowsOverlayProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full px-5">
            <div className="flex flex-col items-center justify-center gap-2 border border-divider rounded-xl p-7">
                <span className="text-xl font-medium">⚠︎ Something went wrong</span>

                <span className="text-secondary text-sm text-center mb-5">
                    Error message :{" "}
                    <span className="border border-divider rounded-md px-2 py-1 bg-background">
                        {error}
                    </span>{" "}
                </span>

                <Button
                    variant="contained"
                    className="bg-failed w-full mb-5 h-10"
                    color="error"
                    size="small"
                    onClick={onRetry}
                >
                    <Refresh className="mr-2 text-lg" />
                    Retry
                </Button>

                <small className="text-secondary/50 text-xs text-center">
                    If the problem persists, please wait for a few minutes and try again.
                </small>
            </div>
        </div>
    )
}
