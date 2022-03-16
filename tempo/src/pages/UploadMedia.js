import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MUSIC } from "../utils/mutations";
import InstrumentListArray from "../utils/InstrumentList";

const UploadMedia = () => {
    const [musicState, setMusicState] = useState(
        {
            genre: "",
            media: "",
            instruments: []
        }
    );

    const [addMusic, { error }] = useMutation(ADD_MUSIC);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setMusicState({
            ...musicState,
            [name]: value
        });
    };

    const validateInstruments = (instruments) => {
        if (instruments.length === 0) {
            return false;
        }

        const instrumentString = instruments[0];
        const instrumentArr = instrumentString.split(",");

        setMusicState({
            ...musicState,
            instruments: instrumentArr
        });

        var instrumentCheck = false;
        for (var i = 0; i < instrumentArr.length; i++) {
            instrumentCheck = InstrumentListArray.includes(instruments[i]);
            if (instrumentCheck === false) {
                return false;
            }
        }
        return true;
    };

    const handleAddMusic = async (event) => {
        event.preventDefault();

        try {
            await addMusic({
                variables: {...musicState}
            });

            console.log("Created!: " + musicState);
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <section className="import-media">
            <form onSubmit={handleAddMusic}>
                <div>
                    <h1 className="sans-serif white para">Add Music Data to your Profile</h1>
                    <h2 className="sans-serif white para">Allow others to search for you by your music abilities!</h2>

                    <label htmlFor="genre" className="sans-serif white subpara">Genre:</label>
                    <input name="genre" type="text" className="sans-serif sm" onChange={handleChange} />

                    <label htmlFor="intruments" className="sans-serif white subpara">Instrument(s). Separate each with a comma.</label>
                    <input name="instruments" type="text" className="sans-serif sm" onChange={handleChange} />

                    <h2 className="sans-serif white para">Upload an Audio or Video File to Showcase your skills!</h2>

                    <label htmlFor="media" className="sans-serif white subpara">Media File:</label>
                    <input name="media" type="file" accept=".mp3,.mp4" className="sans-serif sm" onChange={handleChange} />

                    <button disabled={!(musicState.genre && validateInstruments(musicState.instruments))} className="sans-serif sm">Submit</button>

                </div>
            </form>
        </section>
    );
};

export default UploadMedia;