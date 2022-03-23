import React from "react";
import Fade from "react-reveal/Fade";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { animated, config, useTrail } from "react-spring";
import { EDIT_MUSIC, DELETE_MUSIC } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const MediaList = ({ media, setMyMedia, delButton}) => {
    
    const [deleteMusic, { data, loading, error }] = useMutation(DELETE_MUSIC);
    
    const metaArrays = (musicRecord) => {
        let genreArray = musicRecord.meta.filter((meta) => {
            if (meta.type === "genre") {
                return meta.value;
            } else return null;
        }).map((meta) => {
            return capitalizeFirstLetter(meta.value);
        });
        let instrumentArray = musicRecord.meta.filter((meta) => {
            if (meta.type === "instrument") {
                return meta.value;
            } else return null;
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
        delay: 1000
    });

    const handleRemoveMusic = async (value) => {

        const response = await deleteMusic({ variables: {_id: value }});
        const arrayForFilter = response.data.deleteMusic.map(responseItem =>  { return responseItem._id });
        let arrayForStateAfterDelete = media.filter(mediaRecordsItem => arrayForFilter.includes(mediaRecordsItem._id))
        console.log(arrayForStateAfterDelete)

        setMyMedia(arrayForStateAfterDelete)

       
    }

    const handleUpdateMusic = async (value) => {
       
    }

    if (!media.length) {
        return <Fade delay={900}>
            <p className="serif-bold sm">No media added.</p>
        </Fade>
    }

    return (
        <div className="media-list-div">
            {media.length && 
            trail.map((animation, index) => (
                <animated.article key={index} style={animation} className="media-card">

                    <p className="sans-serif subpara white media-title"><a href={mediaRecords[index].media} target="_blank" rel="noreferrer">{mediaRecords[index].title}</a></p>
                    { mediaRecords[index].description && <p className="serif sm white"> {mediaRecords[index].description}</p> }

                    {mediaRecords[index].genres.length ? <p className="sans-serif regular white"><span className="serif regular">Genre:</span> {mediaRecords[index].genres.join()}</p> : "" }
                    
                    { mediaRecords[index].instruments.length > 1 && <p className="sans-serif regular white"><span className="serif regular">Instruments:</span> {mediaRecords[index].instruments.join(", ")}</p> }
                    { mediaRecords[index].instruments.length === 1 && <p className="sans-serif regular white"><span className="serif regular">Instrument:</span> {mediaRecords[index].instruments.join(", ")}</p> }
                    {delButton !== "none" &&
                        <div>
                            <button onClick={()=> handleRemoveMusic(mediaRecords[index]._id)} className="serif-bold regular tag"><span className="sans-serif regular">🗑️</span></button>                        
                        </div>}
                </animated.article>
            ))}
        </div>
    );
};


export default MediaList;