import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  CircleMarker, useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import QueueCard from "./QueueCard";
import { queueSpots, type Spot } from "../data/queueSpots";

const ORANGE = "#F46021";
const GREEN = "#6DAC56";

const unselectedIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 16 22" width="22" height="30"><path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="none" stroke="${ORANGE}" stroke-width="1.5"/><circle cx="7" cy="7" r="2.5" fill="none" stroke="${ORANGE}" stroke-width="1.5"/></svg>`,
  className: "",
  iconSize: [22, 30],
  iconAnchor: [11, 30],
});

const selectedIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 16 22" width="26" height="36"><path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${GREEN}"/><circle cx="7" cy="7" r="2.5" fill="white"/></svg>`,
  className: "",
  iconSize: [26, 36],
  iconAnchor: [13, 36],
});

// type Spot = {
//   id: number;
//   name: string;
//   lat: number;
//   lng: number;
// };

type Props = {
  spots?: Spot[];
};

function CloseCardOnMapClick({ onClose }: { onClose: () => void }) {
  useMapEvents({
    click: () => {
      onClose();
    },
  });

  return null;
}

// const testSpots: Spot[] = [
//   { id: 1, name: "B Dorm Bus Stop", lat: 14.0773, lng: 100.5951 },
//   { id: 2, name: "Tops Crosswalk", lat: 14.0763, lng: 100.5966 },
//   { id: 3, name: "Beside Green Canteen", lat: 14.0729, lng: 100.6014 },
// ];

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// function FlyToMarker({
//   position,
//   onFlyStart,
//   onFlyEnd,
// }: {
//   position: [number, number] | null;
//   onFlyStart: () => void;
//   onFlyEnd: () => void;
// }) {
//   const map = useMap();

//   useEffect(() => {
//     if (position) {
//       onFlyStart();
//       map.flyTo(position, 17);
//       map.once("moveend", onFlyEnd);
//     }
//   }, [position]);

//   return null;
// }

const buttonStyle: React.CSSProperties = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  cursor: "pointer",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function MapButtons({
  userLocation,
  spots,
  onFlyStart,
  onFlyEnd,
  onSelectSpot,
  isCardOpen,
}: {
  userLocation: [number, number] | null;
  spots: Spot[];
  onFlyStart: () => void;
  onFlyEnd: () => void;

  onSelectSpot: (spot: Spot) => void;
  isCardOpen: boolean;
}) {
  const map = useMap();

  const flyToUser = () => {
    if (!userLocation) return;
    onFlyStart();
    map.flyTo(userLocation, 17);
    map.once("moveend", onFlyEnd);
  };

  const flyToNearest = () => {
    if (!userLocation) return;
    let nearest = spots[0];
    let minDist = Infinity;
    spots.forEach((spot) => {
      const d = getDistance(userLocation[0], userLocation[1], spot.lat, spot.lng);
      if (d < minDist) {
        minDist = d;
        nearest = spot;
      }
    });
    onFlyStart();
    map.flyTo([nearest.lat, nearest.lng], 17);
    map.once("moveend", () => {
      onFlyEnd();
      onSelectSpot(nearest);
    })
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: isCardOpen ? "160px" : "32px",
        right: "16px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        transition: "bottom 0.25s ease",
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); flyToNearest(); }}
        style={buttonStyle}
        title="Nearest motorcycle taxi spot"
      >
        🏍️
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); flyToUser(); }}
        style={buttonStyle}
        title="My location"
      >
        📍
      </button>
    </div>
  );
}

export default function MapView({ spots = queueSpots }: Props) {
  // const [selected, setSelected] = useState<[number, number] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  // const selectedPosition: [number, number] | null = selectedSpot
  //   ? [selectedSpot.lat, selectedSpot.lng]
  //   : null;

  // const [selected, setSelected] = useState<[number, number] | null>(null);
  // const [selected, setSelected] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [flying, setFlying] = useState(false);
  // const selectedPosition: [number, number] | null = selectedSpot
  //   ? [selectedSpot.lat, selectedSpot.lng]
  //   : null;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        console.log("GPS unavailable");
      },
    );
  }, []);

  const selectedDistance =
    selectedSpot && userLocation
      ? getDistance(
        userLocation[0],
        userLocation[1],
        selectedSpot.lat,
        selectedSpot.lng,
      )
      : undefined;

  return (
    <div className="map-page">
      <div style={{ position: "relative", height: "100vh", width: "100%" }}>
        <MapContainer
          center={[14.0707, 100.6058]}
          zoom={15}
          minZoom={3}
          maxBounds={[
            [-90, -180],
            [90, 180],
          ]}
          maxBoundsViscosity={1.0}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution="© OpenStreetMap contributors © CARTO"
          />
          {/* <FlyToMarker position={spot} /> */}
          {/* <FlyToMarker
            position={selectedPosition}
            onFlyStart={() => setFlying(true)}
            onFlyEnd={() => setFlying(false)}
          /> */}
          <CloseCardOnMapClick onClose={() => setSelectedSpot(null)} />
          <MapButtons
            userLocation={userLocation}
            spots={spots}
            onFlyStart={() => setFlying(true)}
            onFlyEnd={() => setFlying(false)}
            onSelectSpot={setSelectedSpot}
            isCardOpen={selectedSpot !== null}
          />
          {userLocation && !flying && (
            <CircleMarker
              center={userLocation}
              radius={8}
              pathOptions={{
                color: "#4A90E2",
                fillColor: "#4A90E2",
                fillOpacity: 1,
              }}
            />
          )}
          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={
                selectedSpot?.id === spot.id ? selectedIcon : unselectedIcon
              }
              eventHandlers={{
                click: (event) => {
                  event.originalEvent.stopPropagation();
                  setSelectedSpot(spot);
                },
              }}
            >
              {/* <Popup autoPan={false}>{spot.name}</Popup> */}
            </Marker>
          ))}
        </MapContainer>
      </div>
      {
        selectedSpot && (
          <QueueCard
            spot={selectedSpot}
            distance={selectedDistance}
            onClose={() => setSelectedSpot(null)}
          />
        )
      }
    </div >
  );
}
