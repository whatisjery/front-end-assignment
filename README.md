# SpaceX Dashboard - Live Coding Challenge

## Setup

```bash
nvm use --lts
npm install
npm run dev
```

App runs at http://localhost:5173


## linting and formatting

> **Note:** I have chosen [Biome](https://biomejs.dev/) for linting and formatting.

```bash
npm run format:check  # check for linting and formatting issues
npm run format:write  # fix linting and formatting issues
```

---

## Phase 1 (Live — less than 30 mins)

Wire up state, fetch, and render the SpaceX API response in a DataGrid.

**Your tasks:**

1. Inspect the API response shape in the console
2. Map the response to `<DataGrid />`. You should show at least the name, date and success status of the launch in there.
3. On row click, show a lateral panel with more details about the launch (you decide which ones, and how to show them)

Remember styles are not important in this step

---

## Phase 2 (Take-Home)

Implement whats listed in the challenge: https://www.notion.so/Frontend-dev-Take-Home-Challenge-Dashboard-31a0fd672914803bb029c28942301828?source=copy_link


### Application Features

- [x] Launch table with MUI DataGrid
- [x] Rows are selectable, user can copy relevant information of selected rows
- [x] `LaunchDetailsCard` with extra information on row click
- [x] Pagination
- [x] Debounced search input that filters results
- [x] Loading, empty results, and error states and retry button
- [x] User preferences persist across page reloads (page size, sort, status tabs)

### Extra code requirements

- [x] Created a reusable hook
- [x] Page is responsive

### Bonus

- [x] Column sorting
- [x] Additional filters
- [x] Other UX/UI improvements

## Notes / Tradeoffs

### Server-side data operations

All filtering, sorting, and pagination are handled server-side. Less data per request, but more requests overall.
I followed the [SpaceX API query documentation](https://github.com/r-spacex/SpaceX-API/blob/master/docs/queries.md).

### Tailwind + MUI

I used MUI to handle complex components (`DataGrid`, `Drawer`). Tailwind + JSX handles everything else. The theme 'tokens' are defined in `theme.ts` and synced to Tailwind via CSS variables, following [MUI's Tailwind v4 integration guide](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/). Status colors are static and declared directly in `index.css`.

> This is the only external dependency I've used in this project. Alongside a small utility one to join classNames, and biome for linting and formatting.

### Tab counts

Each search triggers 4 additional `limit:0` queries to get per tab status counts. In production, I'd use React Query, or a similar library for caching. Same goes for the refetching while switching tabs.

### Custom toolbar

I built a custom toolbar instead of using MUI `<Toolbar />` and `<QuickFilter />` components. A simple controlled input with debounce was more straightforward to meet the requirements of this exercise


### Accessibility

Given more time: adding ARIA attributes, checking keyboard navigation patterns, focus styles (outlines are not all coherent right now), and screen reader testing.