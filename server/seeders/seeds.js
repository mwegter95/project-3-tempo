const db = require("../config/connection");
const { User, Review, Music, Message } = require("../models");

db.once("open", async() => {
    await Message.deleteMany({});
    await Music.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    console.log("All data has been removed.");
    process.exit(0);
});