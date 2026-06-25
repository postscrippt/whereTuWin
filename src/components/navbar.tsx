import logo from "../assets/Logo.svg";
import "./Navbar.css"
import search from "../assets/search.svg";
import hamburg from "../assets/blog-button.svg";

function Navbar() {
    return (
        <nav className="navbar">
            <button className="nav-icon-button" aria-label="Open menu">
                <img src={hamburg} />
            </button>

            <img className="navbar-logo" src={logo} alt="WhereTuWin Logo" />

            <button className="nav-icon-button" aria-label="Search">
                <span className="search-icon">
                    <img src={search} />
                </span>
            </button>
        </nav>
    );
}

export default Navbar;