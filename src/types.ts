export type PokemonStat = {
  name: string;
  value: number;
};

export type Pokemon = {
  id: number;
  name: string;
  image?: string | null;
  types: string[];
  stats: PokemonStat[];
  height?: number;
  weight?: number;
  abilities?: string[];
};

export type PokemonListEntry = {
  name: string;
  url: string;
};

export type SortKey = 'id' | 'name';
