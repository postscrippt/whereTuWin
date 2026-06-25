import logo from "../assets/Logo.svg";
import "./Navbar.css"
import search from "../assets/search.svg";
import hamburg from "../assets/blog-button.svg";
import back from "../assets/back.svg";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";



type NavbarProps = {
    variant?: "default" | "back" | "minimal";
};

const navLinks = [
    // { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Report Bug", path: "/rp-bug" },
];

function Navbar({ variant = "default" }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }
    return (
        <nav className={`navbar navbar-${variant}`}>
            {variant === "default" && (<button className="nav-icon-button" aria-label="Open menu" onClick={toggleMenu}>
                <img src={hamburg} />
            </button>)
            }

            {variant === "default" && (
                <button className="nav-icon-button" aria-label="Search">
                    <span className="search-icon">
                        <img src={search} />
                    </span>
                </button>
            )}
            <img className="navbar-logo" src={logo} alt="WhereTuWin Logo" />

            {variant === "back" &&
                (<button className="nav-back" onClick={goBack}>
                    <img src={back} />
                </button>

                )}
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