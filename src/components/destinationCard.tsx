import "./destinationCard.css";
import Arrow from "../assets/line-md_arrow-up.svg";

type DestinationCardProps = {
    landmark?: string[];
};

function destinationCard({ landmark }: DestinationCardProps) {
    return (
        <div className="destination-list">
            {landmark &&
                landmark.map((landmark, index) => (
                    <div className="box" key={`${landmark}-${index}`}>
                        <div className="innerBox">
                            <p className="landmark-text">{landmark}</p>
                            <img className="arrow" src={Arrow} />
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default destinationCard;