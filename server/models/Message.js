const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const messageSchema = new Schema(
    {
        message_text: {
            type: String,
            required: true
        },
        sender: {
            type: String,
            required: true
        },
        receiver: {
            type: String,
            required: true
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

const Message = model("Message", messageSchema);
module.exports = Message;