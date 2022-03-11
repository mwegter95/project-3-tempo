const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        users: async() => {
            return User.find()
                .select("-_v -password")
        },
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select("-_v -password")
        }
    },

    Mutation: {
        addUser: async(parent, args) => {
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
        }
    }
};

module.exports = resolvers;