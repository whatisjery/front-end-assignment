import { ChevronRight } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import type { GridColDef } from "@mui/x-data-grid"
import { getLaunchStatus } from "../../../lib/utils"
import StatusChip from "../../ui/StatusChip"

export const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "Mission",
        flex: 1,
        minWidth: 160,
    },
    {
        field: "date_local",
        headerName: "Date",
        width: 140,
        valueFormatter: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
        field: "rocket",
        headerName: "Rocket",
        width: 120,
        valueFormatter: (value: { name: string }) => value?.name ?? "—",
    },
    {
        field: "launchpad",
        headerName: "Launchpad",
        width: 160,
        valueFormatter: (value: { name: string }) => value?.name ?? "—",
    },
    {
        field: "success",
        headerName: "Status",
        width: 120,
        renderCell: ({ row }) => {
            const status = getLaunchStatus(row.success, row.upcoming)
            return <StatusChip label={status.label} color={status.color} />
        },
    },
    {
        field: "actions",
        headerName: "",
        width: 50,
        sortable: false,
        disableColumnMenu: true,
        renderCell: () => (
            <IconButton size="small">
                <ChevronRight className="text-secondary/50" fontSize="small" />
            </IconButton>
        ),
    },
]
