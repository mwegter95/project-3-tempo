import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MUSIC } from "../../utils/queries";

const MediaList = ({ media }) => {
    if (!media.length) {
        return <p className="serif sm gold">{media.genre} You haven't added any music traits to your profile yet!</p>
    }



    return (
        <div>
            {media.length && 
            media.map((trait) => (
                <article key={trait._id}>
                    <a href={trait.media} target="_blank" className="sans-serif subpara">Check out my stuff!</a>
                    <p>Genre: {trait.genre}</p>
                    <p>Instruments: {trait.instruments.map((instrument) => (instrument))}</p>
                </article>
            ))}
        </div>
    );
};


export default MediaList;