import Navbar from "../components/navbar.tsx";
import Us from "../assets/2wheretowin.png";
import "../App.css";

function about() {
    return (
        <div className="aboutpage">
            <Navbar variant="back" />
            <div className="aboutformat">
                <div className="textContent">
                    <h1>About</h1>
                    <p>Motorcycle Spot Map helps you find the nearest motorcycle taxi or (Win) spots. Built by TU students
                        who likes to wander.</p>
                    <h1>Data & Accuracy</h1>
                    <p>Number of queue spot listed:
                    </p>
                    <p>Last updated:</p>
                    <h1>Mistakes?</h1>
                    <p>Spots missing or wrong?
                        Mail us at WhereTUWin@gmail.com
                        or use {" "}
                        <a className="report-bug-text" href="https://youtu.be/dQw4w9WgXcQ?si=NezRXzLx2lYlZ5Bb" target="_blank"
                            rel="noopener noreferrer">report bug</a>
                        {" "} to report it through Google forms.</p>
                    <h1>How to use</h1>
                    <ul><li>We display the nearest Win spot on a map.
                    </li>
                        <li>Hit Navigate to get directions to that spot.</li>
                        <li>Or search freely for other Win spots markers on the map!</li>
                    </ul>

                </div>
                <img src={Us} className="picUs"></img>
            </div>

        </div>
    )
}

export default about;