import React from "react";
import { Pokemon } from "../types";
import PokemonCard from "./PokemonCard";
import Shimmer from "./Shimmer";

type Props = {
  items: Pokemon[];
  loading: boolean;
  error: string;
  onSelect: (pokemon: Pokemon) => void;
  onToggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: (id: number) => boolean;
};

const PokemonGrid: React.FC<Props> = ({
  items,
  loading,
  error,
  onSelect,
  onToggleFavorite,
  isFavorite,
}) => {
  if (error) {
    return <div className="banner error">{error}</div>;
  }

  if (loading && items.length === 0) {
    return <Shimmer />;
  }

  if (!loading && items.length === 0) {
    return <div className="banner muted">No Cards available.</div>;
  }

  return (
    <div className="card-grid">
      {items.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
