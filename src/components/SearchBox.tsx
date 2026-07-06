import { useState } from "react";
import { type Spot, Spots } from "../data/queueSpots";

type SearchBoxProps = {
  onClose?: () => void;
};

const filterItems = (query: string, items: Spot[]) => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((point) => point.name.toLowerCase().includes(lowerQuery));
};

export default function SearchBox({ onClose }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const items = Spots;
  const filteredItems = filterItems(query, items);

  return (
    <div className="search-overlay" onClick={() => onClose?.()}>
      <div className="search-modal" onClick={(event) => event.stopPropagation()}>
        <div className="search-modal-header">
          <label htmlFor="search-input">Search</label>
          <button
            className="search-close"
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close search"
          >
            ×
          </button>
        </div>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by spot name"
        />
        <ul>
          {filteredItems.map((value) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

 