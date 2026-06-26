import "./QueueCard.css";

type Spot = {
    spot: {
        id: number;
        name: string;
        area?: string;
        landmark?: string;
        hours?: string;
        lat: number;
        lng: number;
    };
    onClose: () => void;
};

// type QueueCardProps = {
//     spot: Spot;
//     onClose: () => void;
// };

function SpotCard({ spot, onClose }: Spot) {
    return (
        <div className="spot-card">
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