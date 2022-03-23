import React from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';

const GenreList = ({ media }) => {
    if (!media.length) {
        return <p>No genres added.</p>;
    }

    const allMusicGenres = [];

    const globalGenres = (genreArray, allGenres) => {
        for (var i = 0; i < genreArray.length; i++) {
            allGenres.push(genreArray[i]);
        }
        return true;
    };

    const metaArrays = (musicRecord, allGenres) => {
        let genreArray = musicRecord.meta.filter((meta) => {
            if (meta.type === "genre") {
                return meta.value;
            }
        }).map((meta) => {
            return capitalizeFirstLetter(meta.value);
        });

        let pushGlobal = globalGenres(genreArray, allGenres);

        return genreArray;
    };

    const newMedia = (curMedia, allGenres) => {
        let newMediaArray = [];
        for (var i = 0; i < curMedia.length; i++) {
            const genreArray = metaArrays(curMedia[i], allGenres);
            const mediaObj = {};
            mediaObj.id = curMedia[i]._id;
            mediaObj.title = curMedia[i].title;
            mediaObj.description = curMedia[i].description;
            mediaObj.media = curMedia[i].media;
            mediaObj.genres = genreArray;
            newMediaArray.push(mediaObj);
        }

        return newMediaArray;
    };

    const mediaRecords = newMedia(media, allMusicGenres);

    return (
        <>
            {media.length &&
                <p>{allMusicGenres.length ? <span className="serif subpara media-tag">{allMusicGenres.join(", ")}</span>: ""}</p>
            }

        </>
    )
}

export default GenreList;