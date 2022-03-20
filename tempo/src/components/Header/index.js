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
                        <Link to="/dashboard" className="sans-serif navText">My Dashboard</Link>
                        <Link to="/discover" className="sans-serif navText">Discover</Link>
                        <a href="/" className="sans-serif navText" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="sans-serif navText">Sign Up</Link>
                        <Link to="/login" className="sans-serif navText">Log In</Link>
                    </>
                )}
            </nav>
        </header>
    )
};

export default Header;