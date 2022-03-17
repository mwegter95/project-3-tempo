const { Schema, model } = require("mongoose");

const metaDataSchema = require('./MetaData');

const musicSchema = new Schema (
    {
        media: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        }, 
        meta: [metaDataSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Music = model("Music", musicSchema);
module.exports = Music;