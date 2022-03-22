const { Schema, model } = require("mongoose");

const { MetaData, metaDataSchema } = require('./MetaData');

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
        meta: [metaDataSchema],        
        userLink: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Music = model("Music", musicSchema);
module.exports = Music;
