import "./QueueCard.css";
import { useState, useRef } from "react";
import Navigate from "../assets/navigate.svg";
import Destination from "./destinationCard";

export type Spot = {
    id: number;
    name: string;
    area?: string;
    landmark?: string[];
    hours?: string;
    lat: number;
    lng: number;
    image?: string;
    nav?: string;
};

export type QueueCardProps = {
    spot: Spot;
    distance?: number;
    onClose: () => void;
};

function SpotCard({ spot, distance }: QueueCardProps) {
    const SNAPS = ['snap-peek', 'snap-mid', 'snap-expanded'];

    const cardRef = useRef<HTMLDivElement>(null);
    const [snap, setSnap] = useState('snap-peek');
    const dragStart = useRef<number | null>(null);
    const snapAtStart = useRef<string | null>(null);

    function shouldIgnoreDrag(target: EventTarget | null) {
        return (
            target instanceof HTMLElement &&
            Boolean(target.closest("button, a, input, textarea, select, [data-no-drag]"))
        );
    }

    function onPointerDown(e: React.PointerEvent) {
        if (shouldIgnoreDrag(e.target)) return;
        dragStart.current = e.clientY;
        snapAtStart.current = snap;
        e.currentTarget.setPointerCapture(e.pointerId);
        cardRef.current?.classList.add('dragging');
    }

    function onPointerMove(e: React.PointerEvent) {
        if (dragStart.current === null) return;
        const dy = e.clientY - dragStart.current;
        const base = snapAtStart.current === 'snap-expanded' ? '0px'
            : snapAtStart.current === 'snap-mid' ? '40%'
                : 'calc(100% - 140px)';
        cardRef.current!.style.transform = `translateY(calc(${base} + ${dy}px))`;
    }

    function onPointerUp(e: React.PointerEvent) {
        const dy = e.clientY - (dragStart.current ?? e.clientY);
        dragStart.current = null;
        cardRef.current?.classList.remove('dragging');
        cardRef.current!.style.transform = '';

        const idx = SNAPS.indexOf(snapAtStart.current ?? '');
        if (dy < -60 && idx < 2) setSnap(SNAPS[idx + 1]);
        else if (dy > 60 && idx > 0) setSnap(SNAPS[idx - 1]);
        else setSnap(snapAtStart.current!);
    }

    function openNavigation() {
        if (!spot.nav) return;
        window.open(spot.nav, "_blank", "noopener,noreferrer");
    }

    return (
        <div ref={cardRef} className={`spot-card ${snap}`}>
            <div
                className="sheet-drag-area"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
            >
                <div className="sheet-handle" />
            </div>

            <div className="card">
                <div className="title">
                    <div className="left-side">
                        <h2>{spot.name}</h2>
                        {distance !== undefined && (
                            <p className="distance">
                                Distance:{" "}
                                {distance < 1000
                                    ? `${Math.round(distance)} m`
                                    : `${(distance / 1000).toFixed(1)} km`}
                            </p>
                        )}
                        {spot.hours && <p>Hours: {spot.hours}</p>}
                    </div>
                    <button
                        className="navigate-button"
                        onClick={openNavigation}
                        disabled={!spot.nav}
                        aria-label={`Navigate to ${spot.name}`}
                    >
                        <img src={Navigate} />
                    </button>
                </div>
                <div>
                    {spot.image && <img src={spot.image} className="location-img" />}
                </div>
                <div className="bottom">
                    <h2>Nearby Destinations</h2>
                    <div className="destinations">
                        {spot.landmark && <Destination landmark={spot.landmark} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpotCard;