import { useCallback, useEffect, useState } from "react"
import { fetchLaunches } from "../lib/api"
import type { Launch } from "../types/launch"

type UseLaunchesParams = {
    page: number
    pageSize: number
    search: string
    sortField?: string
    sortOrder?: "asc" | "desc"
    status?: string
}

export function useGetLaunches({
    page,
    pageSize,
    search,
    sortField,
    sortOrder,
    status,
}: UseLaunchesParams) {
    const [rows, setRows] = useState<Launch[]>([])
    const [totalRowCount, setTotalRowCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const data = await fetchLaunches({
                page,
                pageSize,
                search,
                sortField,
                sortOrder,
                status,
            })
            setRows(data.docs)
            setTotalRowCount(data.totalDocs)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("something went wrrong")
            }

            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [page, pageSize, search, sortField, sortOrder, status])

    useEffect(() => {
        load()
    }, [load])

    return {
        rows,
        totalRowCount,
        loading,
        error,
        refetch: load,
    }
}
