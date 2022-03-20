import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MUSIC } from "../../utils/queries";

const MediaList = ({ media }) => {
    if (!media.length) {
        return <p className="serif sm gold">You haven't added any music traits to your profile yet!</p>
    }



    return (
        <div>
            {media.length && 
            media.map((trait) => (
                <article key={trait._id}>
                    <a href={trait.media} target="_blank" className="sans-serif subpara">Check out my stuff!</a>
                    <p className="serif sm gold">{trait.title}</p>
                    <p>{trait.description}</p>
                    {trait.meta.map((meta) => (
                        <>
                        <p key={meta._id}>Genre: {meta.type}</p>
                        <p key={meta._id}>Instruments: {meta.value}</p>
                        </>
                    ))}
                </article>
            ))}
        </div>
    );
};


export default MediaList;