import { Chip } from "@mui/material"
import type { STATUS } from "../../lib/constant"

type StatusChipProps = {
    label: string
    color: (typeof STATUS)[keyof typeof STATUS]["color"]
    showDot?: boolean
}

export default function StatusChip({ label, color }: StatusChipProps) {
    return (
        <Chip
            size="small"
            className={`font-base rounded-md ${color.bg} border ${color.border}`}
            label={<span className={`flex items-center gap-1.5 ${color.text}`}>{label}</span>}
        />
    )
}
