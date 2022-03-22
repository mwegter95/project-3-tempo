import React from "react";
import { capitalizeFirstLetter } from "../../utils/helpers";

const MediaList = ({ media }) => {
    if (!media.length) {
        return <p className="serif sm gold">You haven't added any music traits to your profile yet!</p>
    }

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

    const newMedia = (curMedia) => {
        let newMediaArray = [];
        for (var i = 0; i < curMedia.length; i++) {
            const { genreArray, instrumentArray } = metaArrays(curMedia[i]);
            const mediaObj = {};
            mediaObj.title = curMedia[i].title;
            mediaObj.description = curMedia[i].description;
            mediaObj.media = curMedia[i].media;
            mediaObj.genres = genreArray;
            mediaObj.instruments = instrumentArray;
            newMediaArray.push(mediaObj);
        }

        return newMediaArray;
    };

    const mediaRecords = newMedia(media);


    return (
        <div>
            {media.length && 
            mediaRecords.map((trait) => (
                <article key={trait._id}>
                    <a href={trait.media} target="_blank" className="sans-serif subpara">Check out my stuff!</a>
                    <p className="serif sm gold">Title: {trait.title}</p>
                    <p>Description: {trait.description}</p>
                    <p>Genre: {trait.genres.join()}</p>
                    <p>Instrument(s): {trait.instruments.join(", ")}</p>
                </article>
            ))}
        </div>
    );
};


export default MediaList;