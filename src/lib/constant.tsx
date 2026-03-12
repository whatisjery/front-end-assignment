export const STATUS = {
    upcoming: {
        label: "Upcoming",
        color: {
            text: "text-upcoming",
            bg: "bg-upcoming/10",
            border: "border-upcoming/10",
        },
    },
    success: {
        label: "Success",
        color: {
            text: "text-success",
            bg: "bg-success/10",
            border: "border-success/10",
        },
    },
    failed: {
        label: "Failed",
        color: {
            text: "text-failed",
            bg: "bg-failed/10",
            border: "border-failed/10",
        },
    },
    unknown: {
        label: "Unknown",
        color: {
            text: "text-unknown",
            bg: "bg-unknown/10",
            border: "border-unknown/10",
        },
    },
    all: {
        label: "All",
        color: {
            text: "text-secondary",
            bg: "bg-secondary/10",
            border: "border-secondary/10",
        },
    },
} as const
