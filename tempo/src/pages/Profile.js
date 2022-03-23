import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { useSpring, animated, config } from "react-spring";
import { useParams } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_USERMUSIC } from "../utils/queries";
import { ADD_REVIEW } from "../utils/mutations";

import GenreList from "../components/GenreList"
import InstrumentList from "../components/InstrumentList"
import MediaList from "../components/MediaList";

const Profile = () => {
    const { id: userId } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { _id: userId }
    });

    const user = data?.user || {};

    const { loading: loadingMusic } = useQuery(QUERY_USERMUSIC, {
        variables: {_id: userId},
        onCompleted: (response) => {
            setMyMedia(getMyMedia(response))
        }
    });

    const [myMedia, setMyMedia] = useState(null);
    const getMyMedia = (musicRecord) => {
        return musicRecord?.userMusic;
    };

    let media = myMedia || [];

    const [addReview, { error }] = useMutation(ADD_REVIEW);
    const [ formState, setFormState ] = useState({
        reviewBy: "",
        reviewOf: userId,
        rating: "",
        review_text: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "rating") {
            let newValue = parseInt(value);

            setFormState({
                ...formState,
                [name]: newValue
            });
        } else {
            setFormState({
                ...formState,
                [name]: value
            });
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addReview({
                variables: { ...formState }
            });
            window.location.assign("/dashboard/myreviews");
        } catch(e) {
            console.log(e);
        }
    };

    const firstAnim = useSpring({
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
        config: config.gentle,
        delay: 300
    });
    const secAnim = useSpring({
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
        config: config.gentle,
        delay: 500
    });
    const bioAnim = useSpring({
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
        config: config.gentle,
        delay: 300
    });

    if(loading || loadingMusic) {
        return <div className="serif para main grey loading">loading...</div>
    };
    // checks if the id in parameters is valid
    if(!data) {
        return <div className="serif para">This user does not exist.</div>
    };

    return (
        <section className="main-background">
            <div className="main-gold">
                <article className="dashboard-card card-top profile-black">
                    <section>
                        <Fade>
                            <div className="avatar">
                                <img src={user.avatar} alt="user avatar"></img>
                            </div>
                        </Fade>
                        <animated.h1 style={firstAnim} className="sans-serif para white">{user.username}</animated.h1>
                        <animated.h3 style={secAnim} className="serif-bold sm gold">{user.status}</animated.h3>
                        <Fade delay={500}>
                            <button className="sans-serif regular"><a href={`mailto:${user.email}`}>Contact</a></button>
                        </Fade>
                    </section>

                    <section>
                        <animated.p style={bioAnim} className="sans-serif white subpara">{user.biography}</animated.p>
                    </section>
                </article>
                
                <article className="dashboard-card card-bottom">
                        <div className="sans-serif subpara media-spacing">
                            <p>Instruments:</p>
                            <InstrumentList media={media}/>
                        </div>

                        <div className="sans-serif subpara media-spacing">
                            <p>Genres:</p>
                            <GenreList media={media}/>
                        </div>

                        <h1 className="sans-serif subpara">Media:</h1>
                        <MediaList media={media} />
                </article>
            
                <Fade delay={300}>
                    <form onSubmit={handleFormSubmit} className="profile-form">
                        <h1 className="sans-serif white subpara">Write a review on {user.username}.</h1>
                            <p className="serif gold regular">The reviews you write will only be seen by you.</p>
                        <div>
                            <section>
                                <label htmlFor="rating" className="sans-serif white subpara">Rating:</label>
                                <input name="rating" type="number" className="sans-serif sm" onChange={handleChange} />
                                <p className="sans-serif white subpara">/10</p>
                            </section>
                            
                            <section>
                                <label htmlFor="review_text" className="sans-serif white subpara">Review:</label>
                                <textarea name="review_text" type="review" className="sans-serif sm" maxLength="500" onChange={handleChange} rows="1"></textarea>
                            </section>
                            
                            <section>
                                <button type="submit" className="sans-serif regular">Submit</button>
                            </section>
                        </div>
                    </form>
                </Fade>
            </div>
        </section>
    )
};

export default Profile;