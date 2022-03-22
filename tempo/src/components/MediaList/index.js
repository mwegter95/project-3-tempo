import React from "react";
import { capitalizeFirstLetter } from "../../utils/helpers";

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
                    <p className="serif sm gold">Title: {trait.title}</p>
                    <p>Description: {trait.description}</p>
                    {trait.meta.map((meta) => (
                        <div key={meta._id}>
                            <p>{capitalizeFirstLetter(meta.type)}: {capitalizeFirstLetter(meta.value)}</p>
                        </div>
                    ))}
                </article>
            ))}
        </div>
    );
};


export default MediaList;