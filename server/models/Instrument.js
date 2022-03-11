const { Schema } = require("mongoose");

const instrumentSchema = new Schema (
    {
        name: {
            type: String
        }
    }
);

module.exports = instrumentSchema;