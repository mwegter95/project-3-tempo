const faker = require("faker");

const db = require("../config/connection");
const { User, Review, Music, Message } = require("../models");

db.once("open", async() => {
    await Message.deleteMany({});
    await Music.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    // create Band users
    const userBandData = [];
    const bandStatus = ["Open for a new member", "Wanting to network with other bands", "Just browsing"];

    for (var i = 0; i < 20; i++) {
        const randomBandStatusIndex = Math.floor(Math.random() * bandStatus.length);
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const status = bandStatus[randomBandStatusIndex];
        const type = "Band";

        userBandData.push({ username, email, password, status, type });
    }

    const createdBandUsers = await User.collection.insertMany(userBandData);

    // create Musician users
    const userMusicianData = [];
    const musicianStatus = ["Looking for collaborations", "Wanting to join a band", "Just browsing"];

    for (var i = 0; i < 10; i++) {
        const randomMusicianStatusIndex = Math.floor(Math.random() * bandStatus.length);
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const status = musicianStatus[randomMusicianStatusIndex];
        const type = "Musician";

        userMusicianData.push( { username, email, password, status, type });
    }

    const createdMusicianUsers = await User.collection.insertMany(userMusicianData);
    
    // create Music
    for (var i = 0; i < 15; i++) {
        const randomMusicianMusicIndex = Math.floor(Math.random() * createdMusicianUsers.ops.length);
        
    }



    console.log("All data has been removed.");
    console.log("Jane Doe and John Doe are now new users.");
    process.exit(0);
});