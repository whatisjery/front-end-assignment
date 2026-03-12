type LaunchLinks = {
    patch: {
        small: string | null
        large: string | null
    }
    webcast: string | null
    wikipedia: string | null
    article: string | null
    youtube_id: string | null
    reddit: {
        campaign: string | null
        launch: string | null
        media: string | null
        recovery: string | null
    } | null
}

type LaunchCore = {
    core: string | null
    flight: number | null
    reused: boolean
    landing_success: boolean | null
    landing_type: string | null
}

type Launchpad = {
    id: string
    name: string
    full_name: string
    locality: string
    region: string
}

type Rocket = {
    id: string
    name: string
}

export type Launch = {
    id: string
    name: string
    date_local: string
    success: boolean | null
    upcoming: boolean
    flight_number: number
    details: string | null
    links: LaunchLinks
    rocket: Rocket
    launchpad: Launchpad
    cores: LaunchCore[]
}

export type LaunchQuery = {
    page: number
    pageSize: number
    search: string
    sortField?: string
    sortOrder?: "asc" | "desc"
    status?: string
}

export type LaunchResponse = {
    docs: Launch[]
    totalDocs: number
    totalPages: number
    page: number
    hasNextPage: boolean
    hasPrevPage: boolean
}
