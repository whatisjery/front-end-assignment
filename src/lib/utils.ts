import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { STATUS } from "./constant"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(utcString: string) {
    return new Date(utcString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

export function getLaunchStatus(success: boolean | null, upcoming: boolean) {
    if (upcoming) return STATUS.upcoming
    if (success === true) return STATUS.success
    if (success === false) return STATUS.failed
    return STATUS.unknown
}

export function getLandingStatus(success: boolean | null) {
    if (success === true) return STATUS.success
    if (success === false) return STATUS.failed
    return STATUS.unknown
}
