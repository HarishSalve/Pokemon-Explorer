import React from 'react';
import { Pokemon } from '../types';

type FavoritesDrawerProps = {
  favorites: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
  onClear: () => void;
};

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  favorites,
  onSelect,
  onClear,
}) => {
  if (!favorites.length) {
    return (
      <div className="banner muted favorites-banner">
        Empty favorites. Tap the heart on a card to save it.
      </div>
    );
  }

  return (
    <div className="favorites-wrap">
      <div className="favorites-head">
        <div>
          <p className="eyebrow">Favorites</p>
          <h3>Saved Pokemon</h3>
        </div>
        <button className="ghost" type="button" onClick={onClear}>
          Clear Fav ♥
        </button>
      </div>
      <div className="favorites-row">
        {favorites.map((pokemon) => (
          <button
            key={pokemon.id}
            type="button"
            className="favorite-chip"
            onClick={() => onSelect(pokemon)}
          >
            <span className="pill">#{pokemon.id}</span>
            <span className="name">{pokemon.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavoritesDrawer;
