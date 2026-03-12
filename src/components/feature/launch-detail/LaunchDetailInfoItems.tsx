type LaunchDetailInfoItemsProps = {
    label: string
    children: React.ReactNode
}

export default function LaunchDetailInfoItems({ label, children }: LaunchDetailInfoItemsProps) {
    return (
        <div>
            <div className="text-sm font-light text-secondary mb-2">{label} :</div>

            <div className="text-sm font-normal text-text-primary">{children}</div>
        </div>
    )
}
