const { Schema, model } = require("mongoose");

const metaDataSchema = new Schema (
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

const MetaData = model("MetaData", metaDataSchema);
module.exports = MetaData;