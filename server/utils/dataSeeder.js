const { User, Music, Review, Message, MetaData } = require("../models");

const newUsers = [
    {
        username: 'ringo',
        email: 'r@s.com',
        password: 'Asdf123$',
        type: 'musician',
        biography: 'More then a drummer, a rocker in his own right',
        status: 'active'
    },
    {
        username: 'Paul',
        email: 'p@m.com',
        password: 'Asdf123$',
        type: 'musician',
        biography: 'The only one that still matters',
        status: 'active'
    },
    {
        username: 'The Beetuls',
        email: 'b@b.com',
        password: 'Asdf123$',
        type: 'musician',
        biography: 'More then a drummer, a rocker in his own right',
        status: 'active'
    }
];

// username: String!, 
// email: String!, 
// password: String!, 
// type: String!, 
// biography: String,
//  status: String

const newMusic = [
    {},
    {},
    {}
];

const newMeta = [
    {},
    {},
    {},
    {},
    {},
    {}
];

const seedData = function() {

    newUsers.forEach(newUser => { 
        User.create(newUser)
    });


    console.log('Data Seeded');

};

module.exports = seedData();