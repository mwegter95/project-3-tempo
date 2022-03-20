import React from "react";
import Auth from "../../utils/auth";

const discoveryFeed = () => {


    return (
        <header>

            <nav>
                {Auth.loggedIn() ? (
                    <>
                        <h2>The music goes here</h2>>
                    </h2>
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

export default discoveryFeed;