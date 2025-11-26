import React from 'react';
import { SortKey } from '../types';

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  types: string[];
  onTypeChange: (value: string) => void;
  sortBy: SortKey;
  onSortChange: (value: SortKey) => void;
};

const SearchFilters: React.FC<Props> = ({
  searchTerm,
  onSearchChange,
  selectedType,
  types,
  onTypeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <section className="controls">
      <div className="input-wrap">
        <label className="control-label" htmlFor="search">
          Search
        </label>
        <div className="input-field">
          <input
            id="search"
            type="search"
            placeholder="Search by name, e.g. pikachu"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              className="ghost"
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="input-wrap">
        <label className="control-label" htmlFor="type">
          Filter by type
        </label>
        <select
          id="type"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="input-wrap">
        <label className="control-label" htmlFor="sort">
          Sort
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
      </div>
    </section>
  );
};

export default SearchFilters;
