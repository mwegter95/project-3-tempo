import React from 'react';
import { capitalizeFirstLetter } from "../../utils/helpers";

const InstrumentList = ({ media }) => {
    if (!media.length) {
        return <p>No instruments added.</p>;
    }

    const metaArrays = (musicRecord) => {
        let instrumentArray = musicRecord.meta.filter((meta) => {
            if (meta.type === "instrument") {
                return meta.value;
            }
        }).map((meta) => {
            return capitalizeFirstLetter(meta.value);
        });

        return instrumentArray;
    };

    const newMedia = (curMedia) => {
        let newMediaArray = [];
        for (var i = 0; i < curMedia.length; i++) {
            const instrumentArray = metaArrays(curMedia[i]);
            const mediaObj = {};
            mediaObj.id = curMedia[i]._id;
            mediaObj.title = curMedia[i].title;
            mediaObj.description = curMedia[i].description;
            mediaObj.media = curMedia[i].media;
            mediaObj.instruments = instrumentArray;
            newMediaArray.push(mediaObj);
        }

        return newMediaArray;
    };

    const mediaRecords = newMedia(media);

    return (
        <>
            {media.length &&
                mediaRecords.map(music => (
                    <div key={music.id}>
                        <p>{music.instruments.join(" ")}</p>
                    </div>
                ))}
        </>
    )
}

export default InstrumentList;