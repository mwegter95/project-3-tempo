const { Schema, model } = require("mongoose");

const { MetaData, metaDataSchema } = require('./MetaData');

const musicSchema = new Schema (
    {
        media: {
            type: String,
            // required: true,
        },
        title: {
            type: String,
            // required: true,
        },
        description: {
            type: String,
        }, 
        meta: [metaDataSchema],
        userLink: {
            type: String,
            // required: true,
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

musicSchema.virtual('metaMatcher').get(function() {
    
    const returnArray = [];

    this.meta.forEach(element => {
        returnArray.push(`${element.value}-${element.type}`)
    })
    
    return returnArray;
  });

const Music = model("Music", musicSchema);
module.exports = Music;