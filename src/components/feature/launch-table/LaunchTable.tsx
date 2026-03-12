import { Tab, Tabs, useMediaQuery, useTheme } from "@mui/material"
import type { GridSortModel } from "@mui/x-data-grid"
import { DataGrid, type GridPaginationModel, type GridRowSelectionModel } from "@mui/x-data-grid"
import { useState } from "react"
import { useDebouncedValue } from "../../../hooks/useDebouncedValue"
import { useGetLaunches } from "../../../hooks/useGetLaunches"
import { useLaunchCounts } from "../../../hooks/useLaunchCount"
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import type { STATUS } from "../../../lib/constant"
import type { Launch } from "../../../types/launch"
import TabLabel from "../../ui/TabLabel"
import { columns } from "./_columns"
import LaunchTableEmpty from "./LaunchTableEmpty"
import LaunchTableError from "./LaunchTableError"
import LaunchTabletoolbar from "./LaunchTabletoolbar"

interface LaunchTableProps {
    onSelectLaunch: (launch: Launch) => void
}

export default function LaunchTable({ onSelectLaunch }: LaunchTableProps) {
    const [pageSize, setPageSize] = useLocalStorage("pageSize", 10)
    const [sortModel, setSortModel] = useLocalStorage<GridSortModel>("sort", [])
    const [statusFilter, setStatusFilter] = useLocalStorage("status", "all")
    const [search, setSearch] = useState("")

    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({
        type: "include",
        ids: new Set(),
    })
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize,
    })

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const debouncedSearch = useDebouncedValue(search, 400)
    const counts = useLaunchCounts(debouncedSearch)

    const { rows, totalRowCount, loading, error, refetch } = useGetLaunches({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        search: debouncedSearch,
        sortField: sortModel[0]?.field,
        sortOrder: sortModel[0]?.sort ?? undefined,
        status: statusFilter,
    })

    const handlePaginationChange = (model: GridPaginationModel) => {
        setPaginationModel(model)
        if (model.pageSize !== pageSize) {
            setPageSize(model.pageSize)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between rounded-md border-divider border-b mb-5">
                <Tabs
                    value={statusFilter}
                    className="relative top-px"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    onChange={(_, v) => {
                        setStatusFilter(v)
                        setPaginationModel((prev) => ({ ...prev, page: 0 }))
                    }}
                    sx={{
                        "& .MuiTabs-indicator": {
                            height: "1px",
                        },
                    }}
                >
                    {(Object.entries(counts) as [keyof typeof STATUS, number][]).map(
                        ([key, value]) => (
                            <Tab
                                key={key}
                                sx={{ minWidth: "auto", px: 1.2 }}
                                className="capitalize font-normal"
                                label={<TabLabel label={key} count={value} status={key} />}
                                value={key}
                            />
                        ),
                    )}
                </Tabs>
            </div>

            <DataGrid
                showToolbar
                slots={{
                    toolbar: LaunchTabletoolbar,
                    noRowsOverlay: error ? LaunchTableError : LaunchTableEmpty,
                }}
                slotProps={{
                    noRowsOverlay: { error, onRetry: refetch },
                    toolbar: { search, onSearchChange: setSearch },
                    columnMenu: {
                        slots: {
                            columnMenuColumnsItem: null,
                            columnMenuManageColumnsItem: null,
                        },
                    },
                }}
                sortingMode="server"
                getRowId={(row) => row.id}
                rows={rows}
                columns={columns}
                loading={loading}
                rowCount={totalRowCount}
                sortModel={sortModel}
                onSortModelChange={setSortModel}
                paginationMode="server"
                paginationModel={paginationModel}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={selectionModel}
                columnVisibilityModel={{
                    rocket: !isMobile,
                    launchpad: !isMobile,
                    date_local: !isMobile,
                }}
                onPaginationModelChange={handlePaginationChange}
                onRowSelectionModelChange={setSelectionModel}
                onRowClick={(params) => onSelectLaunch(params.row as Launch)}
                className="rounded-xl shadow-xl/3 overflow-y-auto min-h-[50vh] bg-background border border-divider"
                sx={{
                    height: {
                        xs: "calc(100vh - 12.9rem)",
                        sm: "calc(100vh - 18rem)",
                    },
                    // Seems necessary to avoid focus outline on the grid when clicking on a cells/checkbox.
                    // Outline will be preserved for keyboard navigation (arrow keys/tabs).
                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-cellCheckbox:focus, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cellCheckbox:focus-within":
                        {
                            outline: "none",
                        },
                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-visible, &.MuiDataGrid-root .MuiDataGrid-cell:focus-visible":
                        {
                            outline: "1px solid",
                            outlineColor: "primary.main",
                        },
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
                    },
                    "& .MuiDataGrid-cell": {
                        borderColor: "divider",
                    },
                    "& .MuiDataGrid-row.Mui-selected": {
                        backgroundColor: "action.selected",
                    },
                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: "action.hover",
                    },
                    "& .MuiCheckbox-root": {
                        color: "text.divider",
                        "&.Mui-checked": {
                            color: "primary.main",
                        },
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        color: "divider",
                    },
                    "& .MuiDataGrid-row.Mui-selected:hover": {
                        backgroundColor: "action.selected",
                    },
                    "& .MuiLinearProgress-root": {
                        backgroundColor: "transparent",
                        height: 2,
                    },
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "secondary.main",
                        opacity: 0.4,
                    },
                    "& .MuiDataGrid-scrollbar": {
                        display: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        scrollbarWidth: "thin",
                        scrollbarColor: "var(--color-divider) transparent",
                    },
                }}
            />
        </>
    )
}
