# PokeAPI Explorer

Pokemon Explorer React app for browsing the PokeAPI with search, filters, sorting, pagination, favorites, and a detail view.

## To Run it 

- Install dependency: `npm install`
- Start dev server: `npm start` (http://localhost:3000)
- To Run tests: `npm test`
- Production build: `npm run build`

## Features:

- Debounced global search + filter and sorting.
- Paginated grid of Pokemon with caching and abort-safe requests.
- Popup with pokemon detail panel with stats, abilities, height/weight.
- Favorites stored in localStorage, quick access drawer and bulk clear.
- Client-side pagination for list and type filters; search uses direct lookup.
- Loading and error states across list/detail requests.

## Architecture

- `src/store/store.ts` — Added api calls with caching helpers.
- `src/hooks/useFetchPokemonData.ts` — Created custom hook for list fetching, building data and sorting.
- `src/context/FavoritesContext.tsx` — global favorites state with persistence.
- `src/components/*` — focused UI components (filters, grid, cards, detail, pagination, favorites).
- `src/hooks/useDebounce.ts` — custom debounce hook for search, can reuse it.

Notes:
- Context is used instead of Redux for the small, app-wide favorites state.
- Requests are abortable to avoid race conditions when search/filter changes.
- List and type responses are cached in-memory; favorites are persisted.

## Testing

- `useDebounce` hook has delay coverage (`src/hooks/useDebounce.test.js`).
- `PokemonCard` component renders and calls handlers (`src/components/PokemonCard.test.js`).
