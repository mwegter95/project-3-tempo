import React from "react";
import Auth from "../../utils/auth";
import { Redirect } from "react-router-dom";
import { QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const DiscoveryFeed = ({activeMusic}) => {
    const { loading, data } = useQuery(QUERY_USER, {
        variables: {_id: activeMusic.userLink},
        skip: !activeMusic
    });

    if (!activeMusic._id) {
        return <h3>Enter Search Criteria</h3>;
    }


    return (
        <article>

            <div>
                {Auth.loggedIn() ? (
                    <>
                        <h2 className="serif sm gold">{activeMusic.title}</h2>
                        <a href={activeMusic.media} target="_blank" className="sans-serif subpara">Watch Video!</a>
                        <p>Description - {activeMusic.description}</p>
                        <div>Music Summary - {activeMusic.meta.map((meta) => (
                            <div key={meta._id}>
                            {meta.type === "genre" ? (
                                    <p>Genre: {meta.value}</p>
                            ) : (
                                    <p>Instrument(s): {meta.value}</p>
                            )}
                            </div>
                        ))}</div>
                        <div>
                            <p>Artist: <a href={`/profile/${data.user._id}`}>{data.user.username}</a></p>
                            <p>Bio: {data.user.biography}</p>
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