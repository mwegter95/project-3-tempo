const { User, Music, Review, Message, MetaData } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");


const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            // check for existence of user - if none, throw AuthenticationError
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select("-_v -password")
                    .populate("reviews")
                    .populate("meta");
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
        users: async() => {
            const usersQueryData = await User.find()
                .select("-_v -password")
                .populate("meta")
                .populate("reviews");
            return usersQueryData;
        },
        user: async (parent, { _id }) => {
            const singleUserQueryData = await User.findOne({ _id })
                .select("-_v -password")
                .populate("meta")
                .populate("reviews");
            return singleUserQueryData;
        },

        metaUsers: async (parent, { metaData }) => {
            
            valueArray = [];
            typeArray = [];

            metaData.forEach(element => {
                valueArray.push(element.value);
                typeArray.push(element.type)
            });
            
            //finds users that match meta data on user record
            const matchingUsers = await User.find({
                meta: { $elemMatch: {value: {$in: valueArray}}}
            })
                .select("-_v -password")                
                .populate("reviews")
                .populate("meta")
            
            //find music that matches metadata on music record
            const musicMatch = await Music.find({
                meta: { $elemMatch: {value: {$in: valueArray}}}
            }).populate("meta") 

            musicMatchUsers = [];

            //Build array of usernames from the matching music
            musicMatch.forEach(element => {
                musicMatchUsers.push(element.userLink);
            });

            //find user records that have matching metadata on related music records
            const matchingMusicUsers = await User.find({
                meta: { $elemMatch: {_id: {$in: musicMatchUsers}}}
            })
                .select("-_v -password")                
                .populate("reviews")
                .populate("meta")
            
            //TODO: merge matchingUsers & matchingMusicUsers
            //TODO: Return unique values from above

        },
        reviews: async() => {
            return Review.find()
        },
        myReviews: async(parent, args, context) => {
            if(context.user) {
                const myReview = await Review.find({ reviewBy: context.user._id })
                    .populate("reviewOf");
                return myReview;
            }
        },
        feedMusic: async (parent, { metaData }) => {       

            valueArray = [];
            typeArray = [];

            metaData.forEach(element => {
                valueArray.push(element.value);
                typeArray.push(element.type)
            });

           return Music.find({
               meta: { $elemMatch: {value: {$in: valueArray}}}
           }).populate("meta") 

        },
        userMusic: async (parent, { _id }) => {
            return Music.find({
                userLink: _id
            }).populate("meta")
            
        },
        music: async (parent, args) => {
            return Music.find().populate("meta");
        },      
        messages: async() => {
            return Message.find();
        },

    }, 

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError("User not found.");
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError("Incorrect credentials.");
            }

            const token = signToken(user);
            return { token, user };
        },
        editUser: async (parent, args, context) => {
            if(context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, {new: true});
            }
            throw new AuthenticationError("Not logged in");
        },
        // you have to be signed in as this user in order to delete them
        deleteUser: async (parent, args, context) => {
            if(context.user) {
                const removeUser = await User.findByIdAndDelete(
                    { _id: context.user._id }
                )
                return removeUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addMusic: async (parent, args, context) => {
            if (context.user) {                
                return await Music.create({...args, userLink: context.user._id });                
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addReview: async (parent, args, context) => {
            if (context.user) {
                const review = await Review.create({...args, reviewBy: context.user._id});
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { reviews: review._id }},
                    { new: true }
                );
                return review;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addMessage: async (parent, args, context) => {
            if (context.user) {
                const message = await Message.create({...args, myId: context.user._id});
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { messages: message._id }},
                    { new: true }
                );
                return message;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.exports = resolvers;