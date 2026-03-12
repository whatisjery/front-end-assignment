import {
    InfoOutline,
    KeyboardArrowDown,
    OpenInNewOutlined,
    PlayCircleOutlined,
    RocketLaunchOutlined,
} from "@mui/icons-material"
import CloseIcon from "@mui/icons-material/Close"

import { Avatar, Button, IconButton } from "@mui/material"
import type { ComponentRef } from "react"
import { useScrollIndicator } from "../../../hooks/useScrollIndicator"
import { formatDate, getLandingStatus, getLaunchStatus } from "../../../lib/utils"
import type { Launch } from "../../../types/launch"
import { ExpandableText } from "../../ui/ExpandableText"
import StatusChip from "../../ui/StatusChip"
import LaunchDetailInfoGrid from "./LaunchDetailInfoGrid"
import LaunchDetailInfoItems from "./LaunchDetailInfoItems"

type LaunchDetailsCardProps = {
    launch: Launch
    onClose: () => void
}

function getLinks(launch: Launch) {
    const all = [
        { label: "Watch Webcast", url: launch.links.webcast },
        { label: "Wikipedia", url: launch.links.wikipedia },
        { label: "Article", url: launch.links.article },
        { label: "Reddit Launch Thread", url: launch.links.reddit?.launch },
        { label: "Reddit Campaign", url: launch.links.reddit?.campaign },
        { label: "Reddit Recovery", url: launch.links.reddit?.recovery },
    ]
    return all.filter((link) => link.url !== null)
}

export default function LaunchDetailsCard({ launch, onClose }: LaunchDetailsCardProps) {
    const links = getLinks(launch)
    const core = launch.cores?.[0]
    const youtubeId = launch.links.youtube_id
    const launchStatus = getLaunchStatus(launch.success, launch.upcoming)
    const landingStatus = getLandingStatus(core.landing_success ?? null)

    const { ref, showIndicator } = useScrollIndicator<ComponentRef<"div">>()

    return (
        <div className="relative bg-background dark:bg-background-muted flex flex-col w-screen sm:w-[30rem] h-full border-l border-divider">
            <header className="bg-background dark:bg-background-muted sticky top-0 flex items-center justify-between px-5 py-5 border-b border-divider">
                <div className="text-primary font-medium text-xl">Mission details</div>

                <IconButton onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </header>

            <div ref={ref} className="h-[calc(100%-72px)] overflow-y-auto px-7 pt-5 pb-40">
                <div className="border-divider overflow-y-auto mb-3">
                    <div className="flex items-center mb-2">
                        <div className="w-full flex flex-col justify-center">
                            <div className="text-sm text-secondary mb-1">
                                Flight no: {launch.flight_number}
                            </div>

                            <div className="text-2xl font-[500] leading-[1.1em]">{launch.name}</div>
                        </div>

                        <Avatar
                            className="w-17 h-17 bg-background-muted rounded-xl border border-divider p-2"
                            variant="square"
                        >
                            {launch.links.patch.small ? (
                                <img
                                    src={launch.links.patch.small}
                                    alt={launch.name}
                                    className="w-full h-full object-contain flex-shrink-0"
                                />
                            ) : (
                                <RocketLaunchOutlined className="text-secondary/20 text-3xl" />
                            )}
                        </Avatar>
                    </div>
                </div>

                <div className="border-b pb-7 border-divider">
                    {youtubeId && (
                        <a
                            href={`https://youtu.be/${youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block rounded-xl overflow-hidden relative group"
                        >
                            <img
                                src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
                                alt="Watch launch"
                                className="w-full"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/40 transition-colors">
                                <PlayCircleOutlined className="text-background/50 text-[3rem]" />
                            </div>
                        </a>
                    )}

                    {!youtubeId && (
                        <div className="bg-background-muted dark:bg-background/50 rounded-lg border border-divider flex flex-col items-center justify-center h-56">
                            <PlayCircleOutlined className="text-secondary/15 text-[3rem] mb-2" />

                            <span className="text-sm text-secondary/30 uppercase">
                                NO WEBCAST AVAILABLE
                            </span>
                        </div>
                    )}

                    {launch.details && (
                        <ExpandableText
                            className="font-light text-secondary mt-5"
                            text={launch.details}
                            buttonSlot={({ onClick, expanded }) => (
                                <Button
                                    type="button"
                                    className="text-sm underline hover:no-underline lowercase p-0"
                                    onClick={onClick}
                                >
                                    {expanded ? "Show less" : "Read more"}
                                </Button>
                            )}
                        />
                    )}
                </div>

                <LaunchDetailInfoGrid
                    iconSlot={<InfoOutline className="text-[1rem] text-secondary" />}
                    className="border-b pt-7 border-divider"
                    title="Launch Information"
                >
                    <LaunchDetailInfoItems label="Launch status">
                        <StatusChip label={launchStatus.label} color={launchStatus.color} />
                    </LaunchDetailInfoItems>

                    <LaunchDetailInfoItems label="Date (UTC)">
                        {formatDate(launch.date_local)}
                    </LaunchDetailInfoItems>

                    <LaunchDetailInfoItems label="Rocket">
                        {launch.rocket.name}
                    </LaunchDetailInfoItems>

                    <LaunchDetailInfoItems label="Launchpad">
                        {launch.launchpad.name}
                    </LaunchDetailInfoItems>
                </LaunchDetailInfoGrid>

                <LaunchDetailInfoGrid
                    iconSlot={<RocketLaunchOutlined className="text-[1rem] text-secondary" />}
                    className="border-b pt-7 border-divider"
                    title="Booster"
                >
                    <LaunchDetailInfoItems label="Core Flights">
                        {core?.flight ?? "Unknown"}
                    </LaunchDetailInfoItems>

                    <LaunchDetailInfoItems label="Reused">
                        {core ? (core.reused ? "Yes" : "No") : "Unknown"}
                    </LaunchDetailInfoItems>

                    <LaunchDetailInfoItems label="Landing status">
                        <StatusChip label={landingStatus.label} color={landingStatus.color} />
                    </LaunchDetailInfoItems>

                    <LaunchDetailInfoItems label="Landing Type">
                        {core?.landing_type ?? "Unknown"}
                    </LaunchDetailInfoItems>
                </LaunchDetailInfoGrid>

                <div className="pt-7">
                    <h4 className="text-xs font-medium uppercase tracking-wider mb-4">
                        Media & Links
                    </h4>

                    {links.length > 0 && (
                        <div className="flex flex-col gap-y-2">
                            {links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.url ?? ""}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border text-secondary/80 bg-background-muted text-sm border-divider p-2 py-3 rounded-md flex items-center justify-between hover:opacity-60"
                                >
                                    {link.label}

                                    <OpenInNewOutlined
                                        className="text-secondary/30"
                                        fontSize="small"
                                    />
                                </a>
                            ))}
                        </div>
                    )}

                    {links.length === 0 && (
                        <div className=" bg-background-muted dark:bg-background/50 rounded-lg border border-divider flex items-center justify-center h-16">
                            <span className="text-sm text-secondary/30">No links available</span>
                        </div>
                    )}
                </div>
            </div>

            {showIndicator && (
                <div className="pointer-events-none absolute bottom-0 pb-5 left-0 right-0 h-50 flex flex-col items-center justify-end bg-gradient-to-t from-background-muted to-transparent">
                    <span className="text-xs uppercase mb-1 text-secondary/80">
                        Scroll to see more
                    </span>

                    <KeyboardArrowDown className="text-secondary/80" fontSize="small" />
                </div>
            )}
        </div>
    )
}
