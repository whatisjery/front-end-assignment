import { useEffect, useState } from "react"
import { fetchLaunchCounts } from "../lib/api"

export function useLaunchCounts(search: string) {
    const [counts, setCounts] = useState({
        all: 0,
        success: 0,
        failed: 0,
        upcoming: 0,
    })

    useEffect(() => {
        fetchLaunchCounts(search)
            .then(setCounts)
            .catch(() => {})
    }, [search])

    return counts
}
