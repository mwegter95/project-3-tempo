const { faker } = require("@faker-js/faker");

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
        const biography = faker.lorem.words(40);
        const type = "Band";

        userBandData.push({ username, email, password, status, biography, type });
    }

    const createdBandUsers = await User.collection.insertMany(userBandData);

    // create Musician users
    const userMusicianData = [];
    const musicianStatus = ["Looking for collaborations", "Wanting to join a band", "Just browsing"];

    for (var i = 0; i < 10; i++) {
        const randomMusicianStatusIndex = Math.floor(Math.random() * musicianStatus.length);
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const status = musicianStatus[randomMusicianStatusIndex];
        const biography = faker.lorem.words(40);
        const type = "Musician";

        userMusicianData.push( { username, email, password, status, biography, type });
    }

    const createdMusicianUsers = await User.collection.insertMany(userMusicianData);
    
    // create Music
    const musicData = [];
    const metaData = [
        {type: "rock", value: "guitar"},
        {type: "classical", value: "cello"},
        {type: "jazz", value: "saxophone"},
        {type: "country", value: "banjo"},
        {type: "pop", value: "vocal percussion"}
    ];
    
    for (var i = 0; i < 15; i++) {
        const randomMusicianMusicIndex = Math.floor(Math.random() * createdMusicianUsers.insertedCount);
        const media = faker.internet.url;
        const title = faker.lorem.words(10);
        const description = faker.lorem.words(20);
        const metaIndex = Math.floor(Math.random() * metaData.length);
        const meta = [];
        meta.push(metaData[metaIndex]);
        const userLink = createdMusicianUsers.insertedIds[randomMusicianMusicIndex];

        musicData.push({ media, title, description, meta, userLink });
    }

    const createdMusic = await Music.collection.insertMany(musicData);


    // create Review data
    for (var i = 0; i < 20; i++) {
        const review_text = faker.lorem.words(40);
        const rating = faker.datatype.number({ min:0, max: 10 });
        const bandUserIndex = Math.floor(Math.random() * createdBandUsers.insertedCount);
        const musicianUserIndex = Math.floor(Math.random() * createdMusicianUsers.insertedCount);
        const reviewBy = createdBandUsers.insertedIds[bandUserIndex];
        const reviewOf = createdMusicianUsers.insertedIds[musicianUserIndex];
        const created_at = faker.date.recent(7);

        const createdReview = await Review.create({ review_text, rating, reviewBy, reviewOf, created_at });

    }

    console.log("All old data has been removed.");
    console.log("All new data has been added.");
    process.exit(0);
});