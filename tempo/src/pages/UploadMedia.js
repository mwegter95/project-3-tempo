import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MUSIC } from "../utils/mutations";
import InstrumentListArray from "../utils/InstrumentList";
import { Link } from "react-router-dom";

//todo: refactor instrument and genre for multiple entries and datatype match to query
//todo: add userLink
//todo: add title and description

const UploadMedia = () => {
    const [musicState, setMusicState] = useState(
        {
            title: "",
            media: "",
            description: "",
            userLink: "",
            meta: "",
            genre: "",
            instruments: ""

        }
    );

    const [errorState, setErrorState] = useState("");

    const [addMusic, { error }] = useMutation(ADD_MUSIC);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setMusicState({
            ...musicState,
            [name]: value
        });
    };

    const validateInstruments = (instruments) => {
        if (typeof instruments === "undefined") {
            return { result: false, arr: [] };
        }

        let instrumentArr = [];
        let newArr;
        instrumentArr.push(instruments);

        if (instrumentArr[0].indexOf(",") === -1) {
            newArr = instrumentArr;
        } else {
            newArr = instrumentArr[0].split(",");
        }

        newArr = newArr.map((instrument) => {
            return instrument.toLowerCase().trim();
        });

        var instrumentCheck = false;
        for (var i = 0; i < newArr.length; i++) {
            instrumentCheck = InstrumentListArray.includes(newArr[i]);
            if (instrumentCheck === false) {
                return { result: false, arr: [] };
            }
        }

        const metaArray = createMetaObject(newArr);
        //console.log("metaArray from validateInstruments line 66", metaArray)

        return { result: true, arr: metaArray };
    };

    const createMetaObject = (validatedInstrumentsArray) => {
        let metaArray = [];
        metaArray.push({ type: "genre", value: musicState.genre })
        for(var i = 0; i < validatedInstrumentsArray.length; i++) {
            metaArray.push(
                 { type: "instrument", value: validatedInstrumentsArray[i]}
                );
        }

        // return the metaArray, an array of objects (populated by the front end interaction) to make into metaData objects
        // this is made out of one metaData oject with the type: genre, value: musicState.genre, then one or more objects with the type: instrument, value: validatedInstrumentsArray[i]
        return metaArray;
    };

    const handleAddMusic = async (event) => {
        event.preventDefault();

        const validateObj = validateInstruments(musicState.instruments);

        if (validateObj.result) {
            try {
                const data = await addMusic({
                    variables: {
                        title: musicState.title,
                        media: musicState.media,
                        description: musicState.description,
                        userLink: "",
                        meta: validateObj.arr
                    }
                });
                window.location.assign("/dashboard");
            } catch(e) {
                console.error(e);
                setErrorState("There was an issue creating this data");
            }
        } else {
            setErrorState("Your Instrument List is not valid");
        }

        setMusicState({
            title: "",
            media: "",
            description: "",
            userLink: "",
            meta: "",
            genre: "",
            instruments: ""
        });


    };

    return (
        <section className="import-media main-background">
            <div className="main-gold">
                <div className="back-to-dash">
                    <h1 className="sans-serif para white">Add to your music.</h1>
                    <Link to="/dashboard"><button className="sans-serif regular">Back to dashboard</button></Link>
                </div>

                <form onSubmit={handleAddMusic} className="black-card media-layout" autocomplete="off">
                    <h1 className="serif subpara white">Let others find you through your skills.</h1>

                    <section className="row-div">
                        <div className="column-div">
                            <label htmlFor="title" className="sans-serif sm white">Title:</label>
                            <input type="text" name="title" className="sans-serif sm" value={musicState.title || ""} onChange={handleChange} />
                        
                            <label htmlFor="meta"  className="sans-serif sm white">Instrument(s) you play. Separate each with a comma.</label>
                            <input name="instruments" type="text" className="sans-serif sm" value={musicState.instruments || ""} onChange={handleChange} />

                            <label htmlFor="meta" className="sans-serif sm white">Genre:</label>
                            <input name="genre" type="text" className="sans-serif sm" value={musicState.genre || ""} onChange={handleChange} />
                        </div>

                        <div className="column-div">
                            <label htmlFor="media" className="sans-serif sm white">Media File Link:</label>
                            <input name="media" type="text" className="sans-serif sm" value={musicState.media || ""} onChange={handleChange} />

                            <label htmlFor="description" className="sans-serif sm white">Description (optional):</label>
                            <textarea name="description" rows="3" type="text" className="sans-serif sm" value={musicState.description || ""} onChange={handleChange}></textarea>
                        </div>
                    </section>

                    <button type="submit" className="sans-serif sm">Submit</button>
                </form>
                {errorState && <div>{errorState}</div>}
            </div>
        </section>
    );
};

export default UploadMedia;
