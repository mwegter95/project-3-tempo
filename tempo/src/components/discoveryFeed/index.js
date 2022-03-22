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
        return <h3>Loading</h3>;
    }

    return (
        <article>

            <div>
                {Auth.loggedIn() ? (
                    <>
                        <h2 className="serif sm gold">{activeMusic.title}</h2>
                        <a href={activeMusic.media} target="_blank" className="sans-serif subpara">Watch Video!</a>
                        <p>Description - {activeMusic.description}</p>
                        <div>Music Summary -
                            <div>
                                <p>Genre: {genreArray.join()}</p>
                                <p>Instrument(s): {instrumentArray.join(", ")}</p>
                            </div>
                        </div>
                        <div>
                            <p>Artist: <a href={`/profile/${data.user._id}`}>{data.user.username}</a></p>
                            <p>Bio: {data.user.biography}</p>
                            <p>Type: {data.user.type}</p>
                            <p>Status: {data.user.status}</p>
                        </div>

                    </>
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