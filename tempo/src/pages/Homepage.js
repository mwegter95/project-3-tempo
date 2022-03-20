import React from "react";
import Fade from "react-reveal/Fade";
import { useSpring, animated, config } from "react-spring";
import { Link } from "react-router-dom";

const Homepage = () => {
    const quickDisplay = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, config: config.molasses, delay: 300})
    const slowDisplay = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, config: config.molasses, delay: 1000 })

    return (
        <main>
            <section>
                <animated.h1 style={quickDisplay} className="sans-serif subtitle white">You are what you listen to.</animated.h1>
                <animated.h1 style={slowDisplay} className="sans-serif subtitle white">Find others through your music.</animated.h1>
            </section>

            <section className="welcome">
                <h1 className="sans-serif title">Welcome to Tempo.</h1>
                <Fade>
                    <p className="serif para white">The perfect place for musicians to find each other.</p>
                </Fade>
            </section>

            <div></div>

            <section>
                <Fade left>
                    <p className="serif para">Whether you're a band looking for a member...</p>
                </Fade>
                <Fade right delay={500}>
                    <p className="serif para">Or you're a musician looking for someone to jam with...</p>
                </Fade>
                <h1 className="sans-serif title">Tempo has you covered.</h1>
            </section>

            <div>
                <Link to="/signup">
                    <Fade delay={100}>
                        <button style={quickDisplay} className="sans-serif para">Sign Up Now</button>
                    </Fade>
                </Link>
            </div>

        </main>
    )
}

export default Homepage;