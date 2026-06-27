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
    const dragStartY = useRef<number | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
        if (event.deltaY < 0) {
            setIsExpanded(false);
            return;
        }

        if (event.deltaY > 0 && event.currentTarget.scrollTop === 0) {
            setIsExpanded(true);
        }
    }

    function handleDragStart(event: React.PointerEvent<HTMLDivElement>) {
        dragStartY.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handleDragEnd(event: React.PointerEvent<HTMLDivElement>) {
        if (dragStartY.current === null) return;

        const dragDistance = event.clientY - dragStartY.current;

        if (dragDistance < -40) {
            setIsExpanded(true);
        }

        if (dragDistance > 40) {
            setIsExpanded(false);
        }

        dragStartY.current = null;
    }

    return (
        <div
            className={`spot-card ${isExpanded ? "expanded" : "collapsed"}`}
            onWheel={handleWheel}
        >
            <div
                className="sheet-drag-area"
                onPointerDown={handleDragStart}
                onPointerUp={handleDragEnd}
            >
                <div className="sheet-handle" />
            </div>

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
                    <button className="navigate-button"><img src={Navigate} /></button>
                </div>
                <div>
                    <img src={spot.image} className="location-img" />
                </div>
                <div className="bottom">
                    {spot.area && <p>{spot.area}</p>}
                    {spot.landmark && <p>Nearby: {spot.landmark}</p>}
                </div>
            </div>

        </div>
    );
}

export default SpotCard;

