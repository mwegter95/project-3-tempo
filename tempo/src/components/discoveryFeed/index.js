import React from "react";
import Auth from "../../utils/auth";
import { Redirect } from "react-router-dom";
import { QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { capitalizeFirstLetter } from "../../utils/helpers";

const DiscoveryFeed = ({activeMusic}) => {
    const { loading, data } = useQuery(QUERY_USER, {
        variables: {_id: activeMusic.userLink},
        skip: !activeMusic
    });

    const metaArrays = (musicRecord) => {
        let genreArray = musicRecord.meta.filter((meta) => {
            if (meta.type === "genre") {
                return meta.value;
            }
        }).map((meta) => {
            return capitalizeFirstLetter(meta.value);
        });
        let instrumentArray = musicRecord.meta.filter((meta) => {
            if (meta.type === "instrument") {
                return meta.value;
            }
        }).map((meta) => {
            return capitalizeFirstLetter(meta.value);
        });

        return {genreArray, instrumentArray};
    };

    const { genreArray, instrumentArray } = metaArrays(activeMusic);


    if (loading) {
        return <h3>Enter Search Criteria</h3>;
    } else if (!data) {
        return <section className="main-background">
            <div className="main-gold">
                <h1 className="serif-bold sm white loading">Loading...</h1>
            </div>
        </section>
    }

    return (
        <>
                {Auth.loggedIn() ? (
                    <section className="black-card profile-preview">
                        <div className="avatar">
                            <img src={data.user.avatar} alt="user avatar"></img>
                        </div>
                        
                        <div>
                            <a href={`/profile/${data.user._id}`}>
                                <h1 className="sans-serif para white">{data.user.username}</h1>
                            </a>
                            <p className="serif sm grey">{data.user.status}</p>
                            <p className="serif sm white">{data.user.biography}</p>
                        </div>

                        <div>
                            <article>
                                <a href={activeMusic.media} target="_blank">
                                    <h1 className="sans-serif para white">{activeMusic.title}</h1>
                                </a>
                                <p className="serif sm grey">{activeMusic.description}</p>
                            </article>
                    
                            <article class="meta-paragraphs">
                                <p className="sans-serif regular white">Genre: <span className="sm">{genreArray.join()}</span></p>
                                <p className="sans-serif regular white">Instrument: <span className="sm">{instrumentArray.join(", ")}</span></p>
                            </article>
                        </div>
                    </section>
                ) : (
                    <>
                        <Redirect to="/login"></Redirect>
                    </>
                )}
        </>
    )
};

export default DiscoveryFeed;