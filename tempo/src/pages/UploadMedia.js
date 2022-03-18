import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MUSIC } from "../utils/mutations";
import InstrumentListArray from "../utils/InstrumentList";

const UploadMedia = () => {
    const [musicState, setMusicState] = useState(
        {
            genre: "",
            media: "",
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

        console.log(musicState);
    };

    const validateInstruments = (instruments) => {
        if (typeof instruments === "undefined") {
            return false;
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

        // setMusicState({
        //     ...musicState,
        //     instruments: newArr
        // });

        var instrumentCheck = false;
        for (var i = 0; i < newArr.length; i++) {
            instrumentCheck = InstrumentListArray.includes(newArr[i]);
            if (instrumentCheck === false) {
                return false;
            }
        }
        return true;
    };

    const handleAddMusic = async (event) => {
        event.preventDefault();

        if (validateInstruments(musicState.instruments)) {
            try {
                await addMusic({
                    variables: {...musicState}
                });
    
            } catch(e) {
                console.error(e);
                setErrorState("There was an issue creating this data");
            }
        } else {
            setErrorState("Your Instrument List is not valid");
        }

        setMusicState({
            genre: "",
            music: "",
            instruments: ""
        });

    };

    return (
        <section className="import-media">
            <form onSubmit={handleAddMusic}>
                <div>
                    <h1 className="sans-serif para">Add Music Data to your Profile</h1>
                    <h2 className="sans-serif para">Allow others to search for you by your music abilities!</h2>

                    <label htmlFor="genre" className="sans-serif subpara">Genre:</label>
                    <input name="genre" type="text" className="sans-serif sm" value={musicState.genre || ""} onChange={handleChange} />

                    <label htmlFor="instruments" className="sans-serif subpara">Instrument(s). Separate each with a comma.</label>
                    <input name="instruments" type="text" className="sans-serif sm" value={musicState.instruments || ""} onChange={handleChange} />

                    <h2 className="sans-serif para">Upload an Audio or Video File to Showcase your skills!</h2>

                    <label htmlFor="media" className="sans-serif subpara">Media File:</label>
                    <input name="media" type="file" accept=".mp3,.mp4" className="sans-serif sm" value={musicState.media || ""} onChange={handleChange} />

                    <button className="sans-serif sm">Submit</button>
                </div>
            </form>
            {errorState && <div>{errorState}</div>}
        </section>
    );
};

export default UploadMedia;