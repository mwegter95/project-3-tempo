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

        return { result: true, arr: metaArray };
    };

    const createMetaObject = (validArray) => {
        let metaArray = [];
        for(var i = 0; i < validArray.length; i++) {
            metaArray.push({ type: musicState.genre, value: validArray[i] });
        }

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
                //console.log(data);
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
        <section className="import-media main">
            <Link className="serif sm" to="/dashboard">Back to Dashboard</Link>
            <form onSubmit={handleAddMusic}>
                <div>
                    <h1 className="sans-serif para">Add Music Data to your Profile</h1>
                    <h2 className="sans-serif para">Allow others to search for you by your music abilities!</h2>

                    <label htmlFor="meta" className="sans-serif subpara">Genre:</label>
                    <input name="genre" type="text" className="sans-serif sm" value={musicState.genre || ""} onChange={handleChange} />

                    <label htmlFor="meta" className="sans-serif subpara">Instrument(s). Separate each with a comma.</label>
                    <input name="instruments" type="text" className="sans-serif sm" value={musicState.instruments || ""} onChange={handleChange} />

                    <h2 className="sans-serif para">Upload a link of you in action to Showcase your skills!</h2>

                    <label htmlFor="title" className="sans-serif subpara">Title</label>
                    <input name="title" type="text" className="sans-serif sm" value={musicState.title || ""} onChange={handleChange} />

                    <label htmlFor="description" className="sans-serif subpara">Description</label>
                    <input name="description" type="text" className="sans-serif sm" value={musicState.description || ""} onChange={handleChange} />

                    <label htmlFor="media" className="sans-serif subpara">Media File Link:</label>
                    <input name="media" type="text" className="sans-serif sm" value={musicState.media || ""} onChange={handleChange} />

                    <button className="sans-serif sm">Submit</button>
                </div>
            </form>
            {errorState && <div>{errorState}</div>}
        </section>
    );
};

export default UploadMedia;