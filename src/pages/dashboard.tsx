import { useState } from "react";
import Navbar from "../components/navbar.tsx";
import SearchBox from "../components/SearchBox.tsx";
import Map from "../components/MapView.tsx";
import { type Spot } from "../data/queueSpots";

function Dashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  return (
    <div>
      <Navbar
        variant="default"
        onSearchClick={() => setIsSearchOpen(true)}
      />
      {isSearchOpen && (
        <SearchBox
          onClose={() => setIsSearchOpen(false)}
          onSelect={(spot) => setSelectedSpot({ ...spot })}
        />
      )}
      <Map selectedSpot={selectedSpot} onSelectSpot={setSelectedSpot} />
    </div>
  );
}

export default Dashboard;
