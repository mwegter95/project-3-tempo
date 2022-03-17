const db = require("../config/connection");
const { User, Review, Music, Message } = require("../models");

db.once("open", async() => {
    await Message.deleteMany({});
    await Music.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    await User.create({
        "username": "Jane Doe",
        "email": "janedoe@email.com",
        "password": "rootroot",
        "type": "Musician",
        "biography": "I am Jane Doe.",
        "status": "Just browsing."
    });

    await User.create({
        "username": "John Doe",
        "email": "johndoe@email.com",
        "password": "rootroot",
        "type": "Musician",
        "biography": "I am John Doe.",
        "status": "Looking for a band."
    });

    console.log("All data has been removed.");
    console.log("Jane Doe and John Doe are now new users.");
    process.exit(0);
});