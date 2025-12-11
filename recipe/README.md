### Recipe App (Vite + React)

A lightweight recipe search app built with React and Vite. It queries TheMealDB public API and displays results as clickable cards. Clicking a card opens a full‑page detail view. All styling is consolidated in `src/App.css`.

#### Key Features
- Live search powered by TheMealDB (`/search.php?s=`)
- Responsive grid of recipe cards
- Entire card is clickable and opens a full‑page overlay with details
- Accessibility: keyboard (Tab, Enter/Space, Esc), focus management, ARIA roles
- All text inside cards and overlay is black; links inherit the color
- Single consolidated stylesheet: `src/App.css`

---

### Quick Start

Prerequisites
- Node.js 18+ recommended (works on 16+, but Vite recommends 18+)
- npm (bundled with Node) or pnpm/yarn

Install & run
```
npm install
npm run dev
```
Open the printed URL (typically `http://localhost:5173`).

Production build
```
npm run build
npm run preview
```

Package scripts
- `dev` — start Vite dev server
- `build` — production build
- `preview` — serve the production build locally

---

### How to Use
1. Type in the search box to filter recipes by name.
2. Browse the grid of recipe cards.
3. Click a card (or focus it and press Enter/Space) to open the full‑page detail view.
4. Close the view by clicking the × button, clicking the backdrop, or pressing Esc. Focus returns to the originating card.

Notes
- Background scrolling is locked while the overlay is open.
- All text in cards and overlay is forced to black; links inherit this color.

---

### Project Structure
```
recipe/
├─ public/
├─ src/
│  ├─ App.jsx        # Main app component (search, grid, overlay)
│  ├─ App.css        # All styles consolidated here
│  ├─ main.jsx       # React entry; imports App and App.css
│  └─ index.css      # Empty (note only) — styles live in App.css
├─ index.html        # Root HTML
├─ vite.config.js    # Vite config
├─ package.json
└─ README.md
```

---

### Architecture & Code Walkthrough

Main component: `src/App.jsx`
- State
  - `search` — search input text
  - `recipes` — results from TheMealDB
  - `loading` — loading indicator for fetches
  - `selectedRecipe` — when set, shows full‑page overlay
  - `lastFocusedCardRef` — restores focus to the opener on close

- Data fetching
  - `fetchRecipes(query)` calls `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  - Normalizes empty results to an empty array
  - Initial load triggers with an empty query on mount

- Cards & grid
  - Rendered in a responsive grid (`.recipes-grid`)
  - Each card uses `role="button"`, `tabIndex=0`, click and keyboard handlers
  - Ingredients derived from `strIngredient1..20` + `strMeasure1..20`

- Full‑page overlay
  - Appears when `selectedRecipe` is set
  - Backdrop click, close button, or Esc closes it
  - Locks background scroll while open; restores on close
  - Focus returns to the card that opened it

Styling: `src/App.css`
- Base global styles plus app‑specific styles
- `.card { color: #000 }` and `.card * { color: inherit }` enforce black text
- Overlay fills the viewport using `.overlay` and `.overlay-content`

Accessibility
- Keyboard: Tab through cards, Enter/Space to open, Esc to close
- `role="button"` on cards; overlay uses `role="dialog"` and `aria-modal="true"`
- Focus restored to the originating card after close

---

### Customization
- Change theme/colors in `src/App.css`
- Adjust grid columns in `.recipes-grid`
- Modify card content within the map in `App.jsx`
- Swap the data source by editing `fetchRecipes`

---

### Troubleshooting
- No results
  - The public API may be rate‑limited or temporarily down; try again or broaden the query (or use empty string).
- Port in use
  - Run dev server on another port: `npm run dev -- --port 5174`
- Styles not applied
  - Ensure `src/main.jsx` imports `./App.css` (default setup already does).

---

### TheMealDB API
- Endpoint: `GET https://www.themealdb.com/api/json/v1/1/search.php?s=<query>`
- Response: `{ meals: [...] }` or `{ meals: null }` if no matches

---

### License
Provided as‑is for educational/demo purposes. Add your preferred license text.

### Acknowledgements
- Data provided by TheMealDB (https://www.themealdb.com)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
