import "./QueueCard.css";
import { useState, useRef } from "react";
import Navigate from "../assets/navigate.svg";

export type Spot = {
    id: number;
    name: string;
    area?: string;
    landmark?: string;
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


// function SpotCard({ spot, onClose }: Spot) {
//     return (
//         <div className="spot-card">
//             <button className="spot-card-close" onClick={onClose}>
//                 ×
//             </button>

//             <h2>{spot.name}</h2>

//             {spot.area && <p>{spot.area}</p>}
//             {spot.landmark && <p>Nearby: {spot.landmark}</p>}
//             {spot.hours && <p>Hours: {spot.hours}</p>}

//             <button className="navigate-button">Navigate</button>
//         </div>
//     );
// }

function SpotCard({ spot, distance }: QueueCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    // const [dragY, setDragY] = useState<number | null>(null);

    const cardRef = useRef<HTMLDivElement | null>(null);
    const startY = useRef(0);
    const startTranslate = useRef(0);
    const isDragging = useRef(false);
    const currentY = useRef<number | null>(null);

    const peekHeight = 110;

    function shouldIgnoreDrag(target: EventTarget | null) {
        return (
            target instanceof HTMLElement &&
            Boolean(target.closest("button, a, input, textarea, select, [data-no-drag]"))
        );
    }

    function getCollapsedY() {
        if (!cardRef.current) return 0;
        return cardRef.current.getBoundingClientRect().height - peekHeight;
    }

    function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
        if (event.deltaY < 0) {
            setIsExpanded(false);
            return;
        }

        if (event.deltaY > 0 && event.currentTarget.scrollTop === 0) {
            setIsExpanded(true);
        }
    }

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (shouldIgnoreDrag(event.target)) return;

        const collapsedY = getCollapsedY();

        isDragging.current = true;
        startY.current = event.clientY;
        startTranslate.current = isExpanded ? 0 : collapsedY;
        currentY.current = startTranslate.current;

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging.current) return;
        if (!cardRef.current) return;

        const collapsedY = getCollapsedY();
        const deltaY = event.clientY - startY.current;

        const nextY = Math.min(
            Math.max(startTranslate.current + deltaY, 0),
            collapsedY,
        );

        currentY.current = nextY;
        cardRef.current.style.transform = `translateY(${nextY}px)`;

    }

    function handlePointerUp() {
        if (!isDragging.current) return;
        if (!cardRef.current) return;

        isDragging.current = false;

        const collapsedY = getCollapsedY();
        const finalY = currentY.current;

        if (finalY === null) return;

        const shouldExpand = finalY < collapsedY / 2;

        cardRef.current.style.transform = "";
        setIsExpanded(shouldExpand);
    }

    function openNavigation() {
        if (!spot.nav) return;
        window.open(spot.nav, "_blank", "noopener,noreferrer");
    }

    return (
        <div
            ref={cardRef}
            className={`spot-card ${isExpanded ? "expanded" : "collapsed"}`}
            onWheel={handleWheel}
            // style={
            //     dragY !== null
            //         ? { transform: `translateY(${dragY}px)` }
            //         : undefined
            // }
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            <div className="sheet-drag-area">
                <div className="sheet-handle" />
            </div >

            {/* <button className="spot-card-close" onClick={onClose}>
                ×
            </button> */}
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
                    <button className="navigate-button" onClick={openNavigation}
                        disabled={!spot.nav}
                        aria-label={`Navigate to ${spot.name}`}><img src={Navigate} /></button>
                </div>
                <div>
                    {spot.image && <img src={spot.image} className="location-img" />}
                </div>
                <div className="bottom">
                    {/* {spot.area && <p>{spot.area}</p>} */}
                    <h2>Nearby Destinations</h2>
                    {spot.landmark && <p>Nearby: {spot.landmark}</p>}
                </div>
            </div >

        </div >
    );
}

export default SpotCard;

