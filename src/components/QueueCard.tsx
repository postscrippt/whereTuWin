import "./QueueCard.css";
import { useState, useRef } from "react";

const dragStartY = useRef<number | null>(null);



export type Spot = {
    id: number;
    name: string;
    area?: string;
    landmark?: string;
    hours?: string;
    lat: number;
    lng: number;
};

export type QueueCardProps = {
    spot: Spot;
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

function SpotCard({ spot, onClose }: QueueCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

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
        <div className={`spot-card ${isExpanded ? "expanded" : "collapsed"}`}>
            <div
                className="sheet-drag-area"
                onPointerDown={handleDragStart}
                onPointerUp={handleDragEnd}
            >
                <div className="sheet-handle" />
            </div>

            <button className="spot-card-close" onClick={onClose}>
                ×
            </button>

            <h2>{spot.name}</h2>
            {spot.area && <p>{spot.area}</p>}
            {spot.landmark && <p>Nearby: {spot.landmark}</p>}
            {spot.hours && <p>Hours: {spot.hours}</p>}

            <button className="navigate-button">Navigate</button>
        </div>
    );
}

export default SpotCard;

