import { Pokemon, PokemonListEntry } from '../types';

const API_BASE = 'https://pokeapi.co/api/v2';
const PAGE_SIZE = 12;

const detailCache = new Map<string, Pokemon>();
const typeCache = new Map<string, PokemonListEntry[]>();
const listCache = new Map<string, { count: number; list: PokemonListEntry[] }>();

const normalizeDetail = (data: any): Pokemon => ({
  id: data.id,
  name: data.name,
  image:
    data.sprites.other['official-artwork'].front_default ||
    data.sprites.front_default,
  types: data.types.map((item: any) => item.type.name),
  stats: data.stats.slice(0, 3).map((stat: any) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  })),
  height: data.height,
  weight: data.weight,
  abilities: data.abilities.map((entry: any) => entry.ability.name),
});

const fetchPokemonDetail = async (
  identifier: string | number,
  signal?: AbortSignal
): Promise<Pokemon> => {
  const key =
    typeof identifier === 'string' && identifier.startsWith('http')
      ? identifier
      : `${API_BASE}/pokemon/${identifier}`;

  if (detailCache.has(key)) {
    return detailCache.get(key)!;
  }

  const response = await fetch(key, { signal });
  if (!response.ok) {
    throw new Error('Failed to load Pokemon detail');
  }
  const data = await response.json();
  const normalized = normalizeDetail(data);
  detailCache.set(key, normalized);
  return normalized;
};

const fetchPagedList = async (
  page: number,
  signal?: AbortSignal
): Promise<{ count: number; list: PokemonListEntry[] }> => {
  const cacheKey = `page:${page}`;
  if (listCache.has(cacheKey)) {
    return listCache.get(cacheKey)!;
  }
  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(
    `${API_BASE}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`,
    { signal }
  );
  if (!res.ok) {
    throw new Error('Unable to load Pokemon');
  }
  const data = await res.json();
  const payload = { count: data.count, list: data.results };
  listCache.set(cacheKey, payload);
  return payload;
};

const fetchTypeList = async (
  typeName: string,
  signal?: AbortSignal
): Promise<PokemonListEntry[]> => {
  if (typeCache.has(typeName)) {
    return typeCache.get(typeName)!;
  }
  const res = await fetch(`${API_BASE}/type/${typeName}`, { signal });
  if (!res.ok) {
    throw new Error('Unable to load type data');
  }
  const data = await res.json();
  const list = data.pokemon.map((item: any) => ({
    name: item.pokemon.name,
    url: item.pokemon.url,
  }));
  typeCache.set(typeName, list);
  return list;
};

const fetchTypes = async (signal?: AbortSignal): Promise<string[]> => {
  const cacheKey = '__types';
  if (typeCache.has(cacheKey)) {
    return (typeCache.get(cacheKey) as unknown as string[]) || [];
  }
  const res = await fetch(`${API_BASE}/type`, { signal });
  if (!res.ok) {
    throw new Error('Unable to load types');
  }
  const data = await res.json();
  const list = data.results.map((item: any) => item.name);
  typeCache.set(cacheKey, list as unknown as PokemonListEntry[]);
  return list;
};

export {
  API_BASE,
  PAGE_SIZE,
  fetchPokemonDetail,
  fetchPagedList,
  fetchTypeList,
  fetchTypes,
};
