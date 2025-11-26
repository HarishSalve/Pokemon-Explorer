import { useEffect, useState } from "react";
import "../App.css";
import { PAGE_SIZE } from "../service/store";
import DetailPanel from "./DetailPanel";
import FavoritesDrawer from "./FavoritesDrawer";
import Pagination from "./Pagination";
import PokemonGrid from "./PokemonGrid";
import SearchFilters from "./SearchFilters";
import { useFavorites } from "../context/FavoritesContext";
import useDebounce from "../hooks/useDebounce";
import useFetchPokemonData from "../hooks/useFetchPokemonData";
import { Pokemon } from "../types";

const Body = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState<"id" | "name">("id");
  const [page, setPage] = useState(1);
  const [activePokemon, setActivePokemon] = useState<Pokemon | null>(null);

  const debouncedSearch = useDebounce(searchTerm.trim().toLowerCase(), 400);

  const { data, total, loading, error, types } = useFetchPokemonData({
    search: debouncedSearch,
    type: selectedType,
    page,
    sortBy,
  });

  const { favorites, toggleFavorite, clearFavorites, isFavorite } =
    useFavorites();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedType]);

  useEffect(() => {
    if (!activePokemon) {
      return;
    }
    const updated = data.find((item) => item.id === activePokemon.id);
    if (updated) {
      setActivePokemon(updated);
    }
  }, [data, activePokemon]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <h1>Pokemon Library</h1>
          <p className="lede">All the Pokémon data</p>
        </div>
        <div className="hero-summary">
          <div className="hero-stat">
            <span className="label">Total available</span>
            <span className="value">{total || "–"}</span>
          </div>
        </div>
      </header>

      <SearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        types={types}
        onTypeChange={setSelectedType}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <FavoritesDrawer
        favorites={favorites}
        onSelect={setActivePokemon}
        onClear={clearFavorites}
      />

      <section className="grid-section">
        <PokemonGrid
          items={data}
          loading={loading}
          error={error}
          onSelect={setActivePokemon}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </section>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(next) =>
          setPage(Math.min(Math.max(next, 1), totalPages))
        }
        disabled={loading}
      />

      <DetailPanel
        pokemon={activePokemon}
        onClose={() => setActivePokemon(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={activePokemon ? isFavorite(activePokemon.id) : false}
      />
    </div>
  );
};

export default Body;
