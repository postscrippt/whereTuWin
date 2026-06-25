import logo from "../assets/Logo.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Loading() {
    const navigate = useNavigate();
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        const startFadeOut = setTimeout(() => {
            setIsLeaving(true);
        }, 1500);

        const goToNextPage = setTimeout(() => {
            navigate("/dashboard");
        }, 2200);

        return () => {
            clearTimeout(startFadeOut);
            clearTimeout(goToNextPage);
        };
    }, [navigate]);
    return (
        <div className={`homepage ${isLeaving ? "fade-out" : ""}`}>
            <img className="logo" src={logo} alt="Logo" />
        </div>
    );
}

export default Loading;
