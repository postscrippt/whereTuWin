import { useState } from "react";
import { type Spot, Spots } from "../data/queueSpots";

type SearchBoxProps = {
  onClose: () => void;
  onSelect: (spot: Spot) => void;
};

const filterItems = (query: string, items: Spot[]) => {
  const lowerQuery = query.trim().toLowerCase();
  return items.filter((point) => point.name.toLowerCase().includes(lowerQuery));
};

export default function SearchBox({ onClose, onSelect }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const filteredItems = filterItems(query, Spots);

  function selectSpot(spot: Spot) {
    onSelect(spot);
    onClose();
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div
        className="search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Search queue locations"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
      >
        <div className="search-modal-header">
          <label htmlFor="search-input">Search</label>
          <button className="search-close" type="button" onClick={onClose} aria-label="Close search">
            ×
          </button>
        </div>
        <input
          id="search-input"
          type="search"
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
            event.preventDefault();
            if (!query.trim()) return;
            const match = filteredItems.find((spot) => spot.name.toLowerCase() === query.trim().toLowerCase()) ?? filteredItems[0];
            if (match) selectSpot(match);
          }}
          placeholder="Search by spot name"
          aria-describedby="search-hint"
        />
        <p id="search-hint" className="search-hint">Press Enter to open the first match, or choose a result.</p>
        <div className="search-results">
          {filteredItems.length === 0 ? (
            <p role="status">No matching queues found.</p>
          ) : (
            <ul>
              {filteredItems.map((spot) => (
                <li key={spot.id}>
                  <button className="search-result" type="button" onClick={() => selectSpot(spot)}>
                    {spot.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
