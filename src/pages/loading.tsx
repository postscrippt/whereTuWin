import logo from "../assets/Logo.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className="homepage">
            <img className="logo" src={logo} alt="Logo" />
        </div>
    );
}

export default Loading;
