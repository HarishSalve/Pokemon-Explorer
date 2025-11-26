import { useEffect, useMemo, useState } from "react";
import {
  PAGE_SIZE,
  fetchPagedList,
  fetchPokemonDetail,
  fetchTypeList,
  fetchTypes,
} from "../service/store";
import { Pokemon, SortKey } from "../types";

const sorters: Record<SortKey, (a: Pokemon, b: Pokemon) => number> = {
  id: (a, b) => a.id - b.id,
  name: (a, b) => a.name.localeCompare(b.name),
};

type Params = {
  search: string;
  type: string;
  page: number;
  sortBy: SortKey;
};

const useFetchPokemonData = ({ search, type, page, sortBy }: Params) => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [types, setTypes] = useState<string[]>(["all"]);

  useEffect(() => {
    const controller = new AbortController();
    const loadTypes = async () => {
      try {
        const loaded = await fetchTypes(controller.signal);
        setTypes(["all", ...loaded]);
      } catch (err) {
        setTypes(["all"]);
      }
    };
    loadTypes();
    return () => controller.abort();
  }, []);

  const queryKey = useMemo(
    () => `${search || "all"}-${type}-${page}-${sortBy}`,
    [search, type, page, sortBy]
  );

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        let items: Pokemon[] = [];
        let count = 0;

        if (search) {
          const detail = await fetchPokemonDetail(search, controller.signal);
          items = [detail];
          count = 1;
        } else if (type !== "all") {
          const typeList = await fetchTypeList(type, controller.signal);
          count = typeList.length;
          const start = (page - 1) * PAGE_SIZE;
          const slice = typeList.slice(start, start + PAGE_SIZE);
          items = await Promise.all(
            slice.map((entry) =>
              fetchPokemonDetail(entry.url, controller.signal)
            )
          );
        } else {
          const pageData = await fetchPagedList(page, controller.signal);
          count = pageData.count;
          items = await Promise.all(
            pageData.list.map((entry) =>
              fetchPokemonDetail(entry.url, controller.signal)
            )
          );
        }

        const sorter = sorters[sortBy] || sorters.id;
        const sorted = [...items].sort(sorter);

        if (!cancelled) {
          setData(sorted);
          setTotal(count);
        }
      } catch (err: any) {
        if (controller.signal.aborted) return;
        if (!cancelled) {
          setError(err?.message || "Problem loading Pokemon");
          setData([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [queryKey, search, type, page, sortBy]);

  return { data, total, loading, error, types };
};

export default useFetchPokemonData;
