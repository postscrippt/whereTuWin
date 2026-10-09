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
import { Spots, type Spot } from "../data/queueSpots";

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

type Props = {
  spots?: Spot[];
  selectedSpot: Spot | null;
  onSelectSpot: (spot: Spot | null) => void;
};

function FocusSelectedSpot({ spot }: { spot: Spot | null }) {
  const map = useMap();

  useEffect(() => {
    if (!spot) return;
    map.flyTo([spot.lat, spot.lng], 17, {
      animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, [map, spot]);

  return null;
}

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

type Coordinates = [number, number];
type LocationStatus = "loading" | "ready" | "error";

function requestCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location is not supported in this browser. Try another browser or browse the map manually."));
      return;
    }

    // Also bound the wait if the browser leaves a permission prompt unanswered.
    const timer = window.setTimeout(() => {
      reject(new Error("Finding your location took too long. Please try again."));
    }, 12000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        window.clearTimeout(timer);
        resolve([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        window.clearTimeout(timer);
        const message = error.code === 1
          ? "Location access was denied. Allow location in your browser's site settings, then retry."
          : error.code === 3
            ? "Finding your location took too long. Please try again."
            : "Your location is unavailable. Check your device's location services and try again.";
        reject(new Error(message));
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
    );
  });
}

function getNearestSpot(location: Coordinates, spots: Spot[]): Spot | null {
  let nearest: Spot | null = null;
  let minDistance = Infinity;
  for (const spot of spots) {
    const distance = getDistance(location[0], location[1], spot.lat, spot.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = spot;
    }
  }
  return nearest;
}

function FocusUserLocation({ location }: { location: Coordinates | null }) {
  const map = useMap();
  useEffect(() => {
    if (!location) return;
    map.flyTo(location, 17, {
      animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, [map, location]);
  return null;
}

function MapButtons({
  userLocation,
  spots,
  status,
  error,
  onRequestLocation,
  onSelectSpot,
  isCardOpen,
}: {
  userLocation: Coordinates | null;
  spots: Spot[];
  status: LocationStatus;
  error: string | null;
  onRequestLocation: () => void;
  onSelectSpot: (spot: Spot | null) => void;
  isCardOpen: boolean;
}) {
  const locationReady = status === "ready" && userLocation !== null;

  function selectNearest() {
    if (!locationReady || !userLocation) return;
    const nearest = getNearestSpot(userLocation, spots);
    // A new selection also recenters a queue that is already open.
    if (nearest) onSelectSpot({ ...nearest });
  }

  return (
    <div className={`map-buttons location-controls${isCardOpen ? " map-buttons--card-open" : ""}`}>
      <div className="location-feedback" role="status" aria-live="polite" aria-atomic="true">
        {status === "error" && (
          <>
            <p>{error}</p>
            <p>You can still search or browse the map.</p>
          </>
        )}
        {spots.length === 0 && <p>No queue locations are available yet.</p>}
      </div>
      {status === "error" && (
        <button className="location-retry" type="button" onClick={onRequestLocation}>Retry location</button>
      )}
      <button
        type="button"
        onClick={selectNearest}
        style={buttonStyle}
        disabled={!locationReady || spots.length === 0}
        title="Nearest motorcycle taxi spot"
        aria-label="Find and open the nearest motorcycle taxi spot"
      >
        🏍️
      </button>
      <button
        type="button"
        onClick={onRequestLocation}
        style={buttonStyle}
        disabled={!locationReady}
        title="Refresh my location"
        aria-label="Refresh and show my location"
      >
        📍
      </button>
    </div>
  );
}

export default function MapView({ spots = Spots, selectedSpot, onSelectSpot }: Props) {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationTarget, setLocationTarget] = useState<Coordinates | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("loading");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationRequest, setLocationRequest] = useState(0);

  function refreshLocation() {
    setLocationStatus("loading");
    setLocationError(null);
    setUserLocation(null);
    setLocationRequest((request) => request + 1);
  }

  useEffect(() => {
    let cancelled = false;
    requestCurrentLocation().then(
      (coordinates) => {
        if (cancelled) return;
        setUserLocation(coordinates);
        setLocationStatus("ready");
        if (locationRequest > 0) {
          onSelectSpot(null);
          setLocationTarget(coordinates);
        }
      },
      (error: unknown) => {
        if (cancelled) return;
        setLocationStatus("error");
        setLocationError(error instanceof Error ? error.message : "Unable to find your location. Please retry.");
      },
    );
    // Ignore late GPS callbacks after a retry or after leaving the dashboard.
    return () => { cancelled = true; };
  }, [locationRequest, onSelectSpot]);

  useEffect(() => {
    document.body.classList.toggle("card-open", selectedSpot !== null);
    return () => document.body.classList.remove("card-open");
  }, [selectedSpot]);

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
      <div
        style={{
          position: "relative",
          height: "100dvh",
          width: "100%",
          transform: "translateZ(0)",
        }}
      >
        <MapContainer
          preferCanvas={true}
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
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
          />
          <FocusSelectedSpot spot={selectedSpot} />
          <FocusUserLocation location={locationTarget} />
          <CloseCardOnMapClick onClose={() => onSelectSpot(null)} />
          {userLocation && (
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
                  onSelectSpot(spot);
                },
              }}
            />
          ))}
        </MapContainer>
        <MapButtons
          userLocation={userLocation}
          spots={spots}
          status={locationStatus}
          error={locationError}
          onRequestLocation={refreshLocation}
          onSelectSpot={onSelectSpot}
          isCardOpen={selectedSpot !== null}
        />
      </div>
      {selectedSpot && (
        <QueueCard
          spot={selectedSpot}
          distance={selectedDistance}
          onClose={() => onSelectSpot(null)}
        />
      )}
    </div>
  );
}
