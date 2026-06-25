import Navbar from "../components/navbar.tsx";
import Us from "../assets/2wheretowin.png";
import "../App.css";

function about() {
    return (
        <div className="aboutpage">
            <Navbar variant="back" />
            <img src={Us} className="picUs"></img>
        </div>
    )
}

export default about;