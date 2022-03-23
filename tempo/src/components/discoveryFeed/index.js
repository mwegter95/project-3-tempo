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
    console.log(activeMusic);

    return (
        <article>
            <div>
                {Auth.loggedIn() ? (
                    <section className="black-card profile-preview">
                        <div className="avatar">
                            {/* this will be the avatar div */}
                            <h2 className="sans-serif para white">(Avatar)</h2>
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
                                <a href={activeMusic.media}>
                                    <h1 className="sans-serif para white">{activeMusic.title}</h1>
                                </a>
                                <p className="serif sm white">{activeMusic.description}</p>
                            </article>

                            <article>
                                <p className="sans-serif sm white">Genre: {genreArray.join()}</p>
                                <p className="sans-serif sm white">Instrument: {instrumentArray.join(", ")}</p>
                            </article>
                        </div>
                    </section>
                ) : (
                    <>
                        <Redirect to="/login"></Redirect>
                    </>
                )}
            </div>
        </article>
    )
};

export default DiscoveryFeed;