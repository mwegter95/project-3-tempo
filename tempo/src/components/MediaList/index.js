import React from "react";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { animated, config, useTrail } from "react-spring";
import { EDIT_MUSIC, DELETE_MUSIC } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const MediaList = ({ media }) => {
    
    const [deleteMusic, { data, loading, error }] = useMutation(DELETE_MUSIC);
    
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
            mediaObj._id = curMedia[i]._id;
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

    const trail = useTrail(mediaRecords.length, {
        from: {
            opacity: 0, 
            y: 50
        },
        to: {
            opacity: 1, 
            y: 0
        },
        config: config.slow,
        delay: 900
    });

    const handleRemoveMusic = async (value) => {

        deleteMusic({ variables: {_id: value }});
       
    }

    const handleUpdateMusic = async (value) => {
       
    }

    if (!media.length) {
        return <p className="serif-bold sm">You haven't added any music traits to your profile yet!</p>
    }

    return (
        <div className="media-list-div">
            {media.length && 
            trail.map((animation, index) => (
                <animated.article key={index} style={animation} className="media-card">
                    <p className="sans-serif subpara white media-title"><a href={mediaRecords[index].media} target="_blank">{mediaRecords[index].title}</a></p>
                    { mediaRecords[index].description && <p className="sans-serif regular white"><span className="serif regular">Description:</span> {mediaRecords[index].description}</p> }

                    {mediaRecords[index].genres.length ? <p className="sans-serif regular white"><span className="serif regular">Genre:</span> {mediaRecords[index].genres.join()}</p> : "" }
                    { mediaRecords[index].instruments.length > 1 && <p className="sans-serif regular white"><span className="serif regular">Instruments:</span> {mediaRecords[index].instruments.join(", ")}</p> }
                    { mediaRecords[index].instruments.length === 1 && <p className="sans-serif regular white"><span className="serif regular">Instrument:</span> {mediaRecords[index].instruments.join(", ")}</p> }
                    <div>
                        <button onClick={()=> handleRemoveMusic(mediaRecords[index]._id)} className="serif-bold regular tag"><span className="sans-serif regular">🗑️</span></button>                        
                    </div>
                </animated.article>
            ))}
        </div>
    );
};


export default MediaList;