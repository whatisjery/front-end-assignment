import type { LaunchQuery, LaunchResponse } from "../types/launch"

const BASE_URL = "https://api.spacexdata.com/v4"

async function post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
}

// Doc: https://github.com/r-spacex/SpaceX-API/blob/master/docs/queries.md
export async function fetchLaunches({
    page,
    pageSize,
    search,
    sortField,
    sortOrder,
    status,
}: LaunchQuery): Promise<LaunchResponse> {
    const query: Record<string, unknown> = {}

    if (search) {
        query.name = {
            $regex: search,
            $options: "i",
        }
    }

    if (status === "success") query.success = true
    if (status === "failed") query.success = false
    if (status === "upcoming") query.upcoming = true

    const sort: Record<string, string> = {}

    sort[sortField || "date_local"] = sortOrder || "desc"

    return post("/launches/query", {
        query,
        options: {
            page: page + 1,
            limit: pageSize,
            sort,
            populate: ["rocket", "launchpad"],
        },
    })
}

export async function fetchLaunchCounts(search: string) {
    const base: Record<string, unknown> = search
        ? {
              name: {
                  $regex: search,
                  $options: "i",
              },
          }
        : {}

    const options = {
        limit: 0,
    }

    const [all, success, failed, upcoming] = await Promise.all([
        post<{ totalDocs: number }>("/launches/query", {
            query: base,
            options,
        }),
        post<{ totalDocs: number }>("/launches/query", {
            query: { ...base, success: true },
            options,
        }),
        post<{ totalDocs: number }>("/launches/query", {
            query: { ...base, success: false },
            options,
        }),
        post<{ totalDocs: number }>("/launches/query", {
            query: { ...base, upcoming: true },
            options,
        }),
    ])

    return {
        all: all.totalDocs,
        success: success.totalDocs,
        failed: failed.totalDocs,
        upcoming: upcoming.totalDocs,
    }
}
