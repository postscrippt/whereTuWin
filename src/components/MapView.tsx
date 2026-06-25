import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

type Spot = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

type Props = {
  spots?: Spot[];
};

const testSpots: Spot[] = [
  { id: 1, name: "B Dorm Bus Stop", lat: 14.0773, lng: 100.5951 },
  { id: 2, name: "Tops Crosswalk", lat: 14.0763, lng: 100.5966 },
  { id: 3, name: "Beside Green Canteen", lat: 14.0729, lng: 100.6014 },
];

function FlyToMarker({ position }: { position: [number, number] | null }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 17);
  }
  return null;
}

export default function MapView({ spots = testSpots }: Props) {
  const [selected, setSelected] = useState<[number, number] | null>(null);

  return (
    <MapContainer
      center={[14.0707, 100.6058]}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="© OpenStreetMap contributors © CARTO"
      />
      <FlyToMarker position={selected} />
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          eventHandlers={{
            click: () => setSelected([spot.lat, spot.lng]),
          }}
        >
          <Popup>{spot.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
