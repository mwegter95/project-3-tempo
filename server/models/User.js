const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const { MetaData, metaDataSchema }= require('./MetaData');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        status: {
            type: String
        },
        biography: {
            type: String,
            maxlength: 280
        },
        type: {
            type: String,
            enum: ['Band', 'Musician'],
            required: true
        },
        avatar: {
            type: String
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review"
            }
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message"
            }
        ], 
        meta: [metaDataSchema]
    }
);

// check to see if data is new or if password has been modified
// can be used for both instances
userSchema.pre("save", async function(next) {
    if(this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
module.exports = User;