const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        review_text: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 0,
            max: 10
        },
        myId: {
            type: String,
            required: true
        },
        theirId: {
            type: String
            //should be required, need to think about how to do this
            // maybe grab from URL
        },
        created_at: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Review = model("Review", reviewSchema);
module.exports = Review;