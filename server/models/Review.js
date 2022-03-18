const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reviewSchema = new Schema(
    {
        review_text: {
            type: String,
            required: true,
            maxlength: 500
        },
        rating: {
            type: Number,
            min: 0,
            max: 10
        },
        reviewBy: {
            type: String,
            required: true
        },
        reviewOf: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        created_at: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
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