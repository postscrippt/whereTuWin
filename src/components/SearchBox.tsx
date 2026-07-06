import { useState } from "react";
import { type Spot, Spots } from "../data/queueSpots";

const filterItems = (query: string, items: Spot[]) => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((point) => point.name.toLowerCase().includes(lowerQuery));
};

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const items = Spots;
  const filteredItems = filterItems(query, items);

  return (
    <div className="App">
      <label htmlFor="search-input">Search</label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredItems.map((value) => (
          <li key={value.id}>{value.name}</li>
        ))}
      </ul>
    </div>
  );
}

 