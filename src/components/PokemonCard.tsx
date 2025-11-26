import React from "react";
import { Pokemon } from "../types";

type Props = {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
  onToggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: (id: number) => boolean;
};

const PokemonCard: React.FC<Props> = ({
  pokemon,
  onSelect,
  onToggleFavorite,
  isFavorite,
}) => {
  const favorite = isFavorite(pokemon.id);

  return (
    <article className="card" onClick={() => onSelect(pokemon)}>
      <div className="card-head">
        <span className="pill">#{pokemon.id}</span>
        <div className="type-row">
          {pokemon.types.map((type) => (
            <span className="badge" key={type}>
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className="card-media">
        {pokemon.image ? (
          <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
        ) : (
          <div className="placeholder">No image available</div>
        )}
      </div>
      <div className="card-body">
        <div className="card-title-row">
          <h3>{pokemon.name}</h3>
          <button
            type="button"
            className={`favorite ${favorite ? "is-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(pokemon);
            }}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? "♥" : "♡"}
          </button>
        </div>
        <div className="stats">
          {pokemon.stats.map((stat) => (
            <div className="stat-row" key={stat.name}>
              <span className="stat-name">{stat.name}</span>
              <div className="stat-bar">
                <span
                  className="stat-fill"
                  style={{ width: `${Math.min(stat.value, 100)}%` }}
                />
              </div>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PokemonCard;
