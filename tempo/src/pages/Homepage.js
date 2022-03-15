import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {

    return (
        <main>
            <section>
                <h1 className="sans-serif subtitle white">You are what you listen to.</h1>
                <h1 className="sans-serif subtitle white">Find others through your music.</h1>
            </section>

            <section className="welcome">
                <h1 className="sans-serif title">Welcome to Tempo.</h1>
                <p className="serif para white">The perfect place for musicians to find each other.</p>
            </section>

            <div></div>

            <section>
                <p className="serif para">Whether you're a band looking for a member...</p>
                <p className="serif para">Or you're a member looking for someone to jam with...</p>
                <h1 className="sans-serif title">Tempo has you covered.</h1>
            </section>

            <div>
                <Link to="/signup">
                    <button className="sans-serif para">Sign Up Now</button>
                </Link>
            </div>

        </main>
    )
}

export default Homepage;