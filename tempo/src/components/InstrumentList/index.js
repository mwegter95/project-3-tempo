import React from 'react';
import { capitalizeFirstLetter } from "../../utils/helpers";

const InstrumentList = ({ media }) => {
    if (!media.length) {
        return <p>No instruments added.</p>;
    }

    const allMusicInstruments = [];

    const globalInstruments = (instrumentArray, allInstruments) => {
        for (var i = 0; i < instrumentArray.length; i++) {
            allInstruments.push(instrumentArray[i]);
        }
        return true;
    };

    const metaArrays = (musicRecord, allInstruments) => {
        let instrumentArray = musicRecord.meta.filter((meta) => {
            if (meta.type === "instrument") {
                return meta.value;
            }
        }).map((meta) => {
            return capitalizeFirstLetter(meta.value);
        });

        let pushGlobal = globalInstruments(instrumentArray, allInstruments);

        return instrumentArray;
    };

    const newMedia = (curMedia, allInstruments) => {
        let newMediaArray = [];
        for (var i = 0; i < curMedia.length; i++) {
            const instrumentArray = metaArrays(curMedia[i], allInstruments);
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

    const mediaRecords = newMedia(media, allMusicInstruments);

    return (
        <>
            {media.length &&
                <p>{allMusicInstruments.length ? <span className="serif subpara media-tag">{allMusicInstruments.join(", ")}</span>: ""}</p>    
            }
        </>
    )
}

export default InstrumentList;