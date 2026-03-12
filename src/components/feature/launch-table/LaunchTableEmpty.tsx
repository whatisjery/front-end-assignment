// components/ui/EmptyState.tsx
export default function LaunchTableEmpty() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-2">
            <span className="text-4xl">🚀</span>

            <p className="text-text-primary text-xl font-medium -mb-1">No launches found.</p>

            <p className="text-secondary text-xs">Try adjusting your search.</p>
        </div>
    )
}
