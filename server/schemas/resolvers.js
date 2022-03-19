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
            return User.find()
                .select("-_v -password")                
                .populate("reviews")
                .populate("meta")
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select("-_v -password")                
                .populate("reviews")
                .populate("meta")
        },

        metaUsers: async (parent, { metaData }) => {
            
            valueArray = [];
            typeArray = [];

            metaData.forEach(element => {
                valueArray.push(element.value);
                typeArray.push(element.type)
            });
            
            return User.findOne({
                meta: { $elemMatch: {value: {$in: valueArray}}}
            })
                .select("-_v -password")                
                .populate("reviews")
                .populate("meta")
        },

        reviews: async() => {
            return Review.find()
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
        userMusic: async (parent, { username }) => {
            return Music.find({
                userLink: username
            }).populate("meta")
            
        },
        music: async (parent, args) => {
            return Music.find().populate("meta")
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
                return await Music.create(args)                
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