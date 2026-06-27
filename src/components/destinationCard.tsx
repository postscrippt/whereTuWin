import "./destinationCard.css";

type DestinationCardProps = {
    landmark?: string[];
};

function destinationCard({ landmark }: DestinationCardProps) {
    return (
        <div className="box">
            {landmark &&
                landmark.map((landmark, index) => (
                    <div className="box" key={`${landmark}-${index}`}>
                        <p className="landmark-text">{landmark}</p>
                    </div>
                ))}
        </div>
    )
}

export default destinationCard;