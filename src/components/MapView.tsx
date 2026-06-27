import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  CircleMarker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import QueueCard from "./QueueCard";
import { queueSpots, type Spot } from "../data/queueSpots";

L.Icon.Default.mergeOptions({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

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
  isCardOpen,
}: {
  userLocation: [number, number] | null;
  spots: Spot[];
  onFlyStart: () => void;
  onFlyEnd: () => void;
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
      const d = getDistance(
        userLocation[0],
        userLocation[1],
        spot.lat,
        spot.lng,
      );
      if (d < minDist) {
        minDist = d;
        nearest = spot;
      }
    });
    onFlyStart();
    map.flyTo([nearest.lat, nearest.lng], 17);
    map.once("moveend", onFlyEnd);
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
        onClick={flyToNearest}
        style={buttonStyle}
        title="Nearest motorcycle taxi spot"
      >
        🏍️
      </button>
      <button onClick={flyToUser} style={buttonStyle} title="My location">
        📍
      </button>
    </div>
  );
}

export default function MapView({ spots = queueSpots }: Props) {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [flying, setFlying] = useState(false);

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
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="© OpenStreetMap contributors © CARTO"
          />
          <CloseCardOnMapClick onClose={() => setSelectedSpot(null)} />
          <MapButtons
            userLocation={userLocation}
            spots={spots}
            onFlyStart={() => setFlying(true)}
            onFlyEnd={() => setFlying(false)}
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
              eventHandlers={{
                click: (event) => {
                  event.originalEvent.stopPropagation();
                  setSelectedSpot(spot);
                },
              }}
            />
          ))}
        </MapContainer>
      </div>
      {selectedSpot && (
        <QueueCard
          spot={selectedSpot}
          distance={selectedDistance}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </div>
  );
}
