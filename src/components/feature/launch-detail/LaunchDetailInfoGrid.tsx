import { cn } from "../../../lib/utils"

type LaunchDetailInfoGridProps = {
    children: React.ReactNode
    title: string
    className?: string
    iconSlot?: React.ReactNode
}

export default function LaunchDetailInfoGrid({
    children,
    title,
    className,
    iconSlot,
}: LaunchDetailInfoGridProps) {
    return (
        <div className={cn(className)}>
            <div className="flex items-center mb-4">
                {iconSlot}
                <h4 className="text-xs font-regular text-secondary uppercase tracking-wider ml-1">
                    {title}
                </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 pb-6">{children}</div>
        </div>
    )
}
