import "./QueueCard.css";
import { useState, useRef } from "react";
import Navigate from "../assets/navigate.svg";
import Destination from "./destinationCard";
import FindMore from "./findmore";

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

function SpotCard({ spot, distance, onClose }: QueueCardProps) {
    // c
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

    function closeWithAnimation() {
        if (!cardRef.current) return;
        cardRef.current.style.transform = `translateY(100%)`;
        cardRef.current.style.transition = 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)';
        setTimeout(() => onClose(), 300);
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
        if (snapAtStart.current === 'snap-expanded' && cardRef.current!.scrollTop > 0) return;
        const dy = e.clientY - dragStart.current;
        const cardHeight = cardRef.current!.getBoundingClientRect().height;
        const base = snapAtStart.current === 'snap-expanded' ? 0 : cardHeight - 140;
        const newY = Math.max(0, Math.min(cardHeight - 140, base + dy));
        cardRef.current!.style.transform = `translateY(${newY}px)`;
    }

    function onPointerUp(e: React.PointerEvent) {
        if (dragStart.current === null) return;
        const dy = e.clientY - dragStart.current;
        dragStart.current = null;
        cardRef.current?.classList.remove('dragging');
        cardRef.current!.style.transform = '';

        if (snap === 'snap-peek' && dy < -60) setSnap('snap-expanded');
        else if (snap === 'snap-expanded' && dy > 60 && cardRef.current!.scrollTop === 0) setSnap('snap-peek');
        else if (snap === 'snap-peek' && dy > 60) closeWithAnimation();
    }

    function openNavigation() {
        if (!spot.nav) return;
        window.open(spot.nav, "_blank", "noopener,noreferrer");
    }

    return (
        <div ref={cardRef} className={`spot-card ${snap}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}>
            <div className="sheet-drag-area">
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
                    <div className="inBottom">
                        <div className="destinations">
                            {spot.landmark && <Destination landmark={spot.landmark} />}

                        </div>
                        <FindMore />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpotCard;