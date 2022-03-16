const { Schema, model } = require("mongoose");

const metaDataSchema = require('./MetaData');

const musicSchema = new Schema (
    {
        media: {
            type: String
            required: true,
        },
        meta: [metaDataSchema],
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Music = model("Music", musicSchema);
module.exports = Music;