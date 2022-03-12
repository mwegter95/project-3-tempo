const { Schema, model } = require("mongoose");

const musicSchema = new Schema (
    {
        genre: {
            type: String,
            required: true,
        },
        media: {
            type: String
        },
        instruments: [String]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Music = model("Music", musicSchema);
module.exports = Music;