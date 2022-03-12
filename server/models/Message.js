const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        message_text: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
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