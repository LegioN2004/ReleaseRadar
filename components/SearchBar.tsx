'use client';

import { useState } from 'react';

type SearchBarProps = {
  setResults: (results: unknown[]) => void;
};

export default function SearchBar({ setResults }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();

    setResults(Array.isArray(data) ? data : []);
  }

  return (
    <>
      <div>
        <input
          type='text'
          placeholder='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </>
  );

}