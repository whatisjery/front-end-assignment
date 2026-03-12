import { STATUS } from "../../lib/constant"
import StatusChip from "./StatusChip"

type TabLabelProps = {
    label: string
    count?: number
    status?: keyof typeof STATUS
}

export default function TabLabel({ label, count, status }: TabLabelProps) {
    return (
        <span className="flex items-center gap-2">
            {label}
            {count !== undefined && status && (
                <StatusChip showDot={false} label={String(count)} color={STATUS[status].color} />
            )}
        </span>
    )
}
