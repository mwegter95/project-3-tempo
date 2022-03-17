const { User, Music, Review, Message } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            // check for existence of user - if none, throw AuthenticationError
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select("-_v -password");

                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
        users: async() => {
            return User.find()
                .select("-_v -password")
                .populate("music")
                .populate("reviews")
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id })
                .select("-_v -password")
                .populate("music")
                .populate("reviews")
        },
        reviews: async() => {
            return Review.find()
        },
        myReviews: async(parent, args, context) => {
            if(context.user) {
                const myReview = await Review.find({ reviewBy: context.user._id });
                return myReview;
            }
        },
        music: async (parent, args) => {
            if (args.genre && args.instrument) {
                return Music.find({
                    genre: args.genre,
                    instrument: args.instrument
                });
            }
            else if (args.genre && !args.instrument) {
                return Music.find({
                    genre: args.genre
                });
            }
            else if (!args.genre && args.instrument) {
                return Music.find({
                    instrument: args.instrument
                });
            }
            else {
                return Music.find();
            }
        },
        messages: async() => {
            return Message.find();
        }
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
                const music =  await Music.create(args);
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { music: music._id }},
                    { new: true}
                );
                return music;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addReview: async (parent, args, context) => {
            console.log(args);
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