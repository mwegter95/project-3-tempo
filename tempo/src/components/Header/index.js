import React from "react";
import { Link } from "react-router-dom";
// import Auth from "../../utils/auth";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1 className="sans-serif subtitle">Tempo</h1>
            </Link>

            <nav>
                <Link to="/signup" className="sans-serif subpara">Sign Up</Link>
                <Link to="/login" className="sans-serif subpara">Log In</Link>
            </nav>
        </header>
    )
};

export default Header;