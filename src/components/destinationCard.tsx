import "./destinationCard.css";

type DestinationCardProps = {
    landmark?: string[];
};

function destinationCard({ landmark }: DestinationCardProps) {
    return (
        <div className="box">
            {landmark && landmark.length > 0 && (
                <div>
                    <ul>
                        {landmark.map((landmark) => (
                            <li key={landmark}>{landmark}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default destinationCard;