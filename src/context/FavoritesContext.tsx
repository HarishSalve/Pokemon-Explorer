import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Pokemon } from '../types';

type FavoritesContextValue = {
  favorites: Pokemon[];
  toggleFavorite: (pokemon: Pokemon) => void;
  clearFavorites: () => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

const STORAGE_KEY = 'pokedex:favorites';

const readFromStorage = (): Pokemon[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Pokemon[]>(readFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore storage write issues
    }
  }, [favorites]);

  const toggleFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === pokemon.id);
      return exists
        ? prev.filter((item) => item.id !== pokemon.id)
        : [...prev, { ...pokemon, stats: pokemon.stats || [] }];
    });
  };

  const clearFavorites = () => setFavorites([]);

  const value: FavoritesContextValue = {
    favorites,
    toggleFavorite,
    clearFavorites,
    isFavorite: (id: number) => favorites.some((item) => item.id === id),
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return ctx;
};

export { FavoritesProvider, useFavorites };
