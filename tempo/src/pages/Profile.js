import React, { useState } from "react";
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
    console.log(media);

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
                    <div>
                        <section>
                            <h1 className="sans-serif para white">{user.username}</h1>
                            <h3 className="serif-bold sm gold">{user.status}</h3>
                        </section>
                        <button className="sans-serif regular"><a href={`mailto:${user.email}`}>Contact</a></button>
                    </div>
                    <p className="sans-serif white subpara">{user.biography}</p>
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
            </div>
        </section>
    )
    
};

export default Profile;