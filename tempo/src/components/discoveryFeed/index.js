import React from "react";
import Auth from "../../utils/auth";

const discoveryFeed = ({activeMusic}) => {
if (!activeMusic) {
    return <h3>Enter Search Criteria</h3>;
}

    return (
        <header>

            <nav>
                {Auth.loggedIn() ? (
                    <>
                        <h2>The music goes here: {activeMusic.title}</h2>
                    
                    </>
                ) : (
                    <>
                        <div>Sign Up</div>
                        <div>Log In</div>
                    </>
                )}
            </nav>
        </header>
    )
};

export default discoveryFeed;