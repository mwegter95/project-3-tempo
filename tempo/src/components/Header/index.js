import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            <Link to="/">
                <h1 className="sans-serif subtitle">Tempo</h1>
            </Link>

            <nav>
                {Auth.loggedIn() ? (
                    <>
                        <Link to="/dashboard" className="sans-serif subpara">My Dashboard</Link>
                        <a href="/" className="sans-serif subpara" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="sans-serif subpara">Sign Up</Link>
                        <Link to="/login" className="sans-serif subpara">Log In</Link>
                    </>
                )}
            </nav>
        </header>
    )
};

export default Header;