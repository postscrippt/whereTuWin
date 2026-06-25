import logo from "../assets/Logo.svg";
import "./Navbar.css"
import search from "../assets/search.svg";
import hamburg from "../assets/blog-button.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Map", path: "/map" },
    { name: "About", path: "/about" },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }
    return (
        <nav className="navbar">
            <button className="nav-icon-button" aria-label="Open menu" onClick={toggleMenu}>
                <img src={hamburg} />
            </button>

            <img className="navbar-logo" src={logo} alt="WhereTuWin Logo" />

            <button className="nav-icon-button" aria-label="Search">
                <span className="search-icon">
                    <img src={search} />
                </span>
            </button>

            {isMenuOpen && (
                <div className="dropdown-menu">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className="dropdown-link"
                            onClick={closeMenu}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;