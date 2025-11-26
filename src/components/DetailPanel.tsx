import React from "react";
import { Pokemon } from "../types";

type Props = {
  pokemon: Pokemon | null;
  onClose: () => void;
  onToggleFavorite: (pokemon: Pokemon) => void;
  isFavorite: boolean;
};

const DetailPanel: React.FC<Props> = ({
  pokemon,
  onClose,
  onToggleFavorite,
  isFavorite,
}) => {
  if (!pokemon) {
    return null;
  }

  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Pokemon Detail</p>
          <h2>
            {pokemon.id} {pokemon.name}
          </h2>
          <div className="type-row">
            {pokemon.types.map((type) => (
              <span className="badge" key={type}>
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="detail-actions">
          <button
            type="button"
            className={`favorite big ${isFavorite ? "is-active" : ""}`}
            onClick={() => onToggleFavorite(pokemon)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
          <button type="button" className="ghost" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      <div className="detail-body">
        <div className="detail-visual">
          {pokemon.image ? (
            <img src={pokemon.image} alt={pokemon.name} />
          ) : (
            <div className="placeholder">No image available</div>
          )}
        </div>
        <div className="detail-meta">
          <p>
            <strong>Height: </strong> {pokemon.height}
          </p>
          <p>
            <strong>Weight: </strong> {pokemon.weight}
          </p>
          <p>
            <strong>Strength: </strong>
            {pokemon.abilities && pokemon.abilities.join(", ")}
          </p>
        </div>
        <div className="stats detail-stats">
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
    </aside>
  );
};

export default DetailPanel;
