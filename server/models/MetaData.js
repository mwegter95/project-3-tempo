const { Schema, model } = require("mongoose");

const metaDataSchema = new Schema (
    {
        value: {
            type: String,
            // required: true,
        },
        type: {
            type: String,
            // required: true,
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const MetaData = model("MetaData", metaDataSchema);
module.exports = { MetaData, metaDataSchema };
