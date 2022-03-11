const { Schema, model } = require("mongoose");
const instrumentSchema = require("./Instrument");

const musicSchema = new Schema (
    {
        genre: {
            type: String,
            required: true,
            unique: true
        },
        media: {
            type: String
        },
        instruments: [instrumentSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Music = model("Music", musicSchema);
module.exports = Music;