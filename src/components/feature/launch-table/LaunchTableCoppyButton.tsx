import CheckIcon from "@mui/icons-material/Check"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { Button } from "@mui/material"
import { gridRowSelectionIdsSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid"
import { useCopy } from "../../../hooks/useCopy"
import { formatDate, getLaunchStatus } from "../../../lib/utils"
import type { Launch } from "../../../types/launch"

function formatLaunchForCopy(launch: Launch): string {
    const status = getLaunchStatus(launch.success, launch.upcoming)
    return `#${launch.flight_number} — ${launch.name} — ${formatDate(launch.date_local)} — ${status.label}`
}

export default function LaunchTableCoppyButton() {
    const apiRef = useGridApiContext()
    const selectedIds = useGridSelector(apiRef, gridRowSelectionIdsSelector)
    const count = selectedIds.size

    const { copied, copy } = useCopy({ resetAfterMs: 2000 })

    if (count === 0) return null

    const handleCopy = () => {
        const text = Array.from(selectedIds.keys())
            .map((id) => apiRef.current.getRow(id))
            .map(formatLaunchForCopy)
            .join("\n")
        copy(text)
    }

    return (
        <Button
            variant="outlined"
            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
            onClick={handleCopy}
        >
            {copied ? "Copied!" : `Copy ${count} launch${count > 1 ? "es" : ""}`}
        </Button>
    )
}
