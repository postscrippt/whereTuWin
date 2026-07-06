import { useState } from "react";
import Navbar from "../components/navbar.tsx";
import SearchBox from "../components/SearchBox.tsx";
import Map from "../components/MapView.tsx";

function Dashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div>
      <Navbar
        variant="default"
        onSearchClick={() => setIsSearchOpen(true)}
      />
      {isSearchOpen && <SearchBox onClose={() => setIsSearchOpen(false)} />}
      <Map />
    </div>
  );
}

export default Dashboard;
