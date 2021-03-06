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
        const avatar = faker.image.avatar();

        userBandData.push({ username, email, password, status, biography, type, avatar });
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
        const avatar = faker.image.avatar();

        userMusicianData.push( { username, email, password, status, biography, type, avatar });
    }

    const createdMusicianUsers = await User.collection.insertMany(userMusicianData);
    
    // create Music
    const musicData = [];
    const instrumentMeta = [
        {type: "instrument", value: "guitar"},
        {type: "instrument", value: "cello"},
        {type: "instrument", value: "saxophone"},
        {type: "instrument", value: "banjo"},
        {type: "instrument", value: "vocal percussion"}
    ];

    const genreMeta = [
        {type: "genre", value: "rock"},
        {type: "genre", value: "classical"},
        {type: "genre", value: "jazz"},
        {type: "genre", value: "country"},
        {type: "genre", value: "pop"}
    ];
    
    for (var i = 0; i < 15; i++) {
        const randomMusicianMusicIndex = Math.floor(Math.random() * createdMusicianUsers.insertedCount);
        const media = faker.internet.url();
        const title = faker.lorem.words(10);
        const description = faker.lorem.words(20);
        const instrumentIndex = Math.floor(Math.random() * instrumentMeta.length);
        const genreIndex = Math.floor(Math.random() * genreMeta.length);
        const meta = [];
        meta.push(instrumentMeta[instrumentIndex]);
        meta.push(genreMeta[genreIndex]);
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