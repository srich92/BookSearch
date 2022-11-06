// import mongoose models
const { User } = require('../models');
// user auth
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }

            throw new AuthenticationError('NOT Logged In!');
        },

        users: async() => {
            return User.find({});
        },
        user: async(parent, args) => {
            return User.findOne({
                args
            });
        },
    },

    //Mutations: loginUser, createUser, saveBook, deleteBook (functions API.js & userController.js)
    Mutation: {
        //login resolver for user entering wrong username/password
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });
            //if no user...
            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }
            // password
            const validPassword = await user.isCorrectPassword(password);
            // wrong password
            if (!validPassword) {
                // return same error message to limit hacking
                throw new AuthenticationError(
                    'Incorrect credentials'
                );
            }
            // token assigned
            const token = signToken(user);

            return { token, user };
        },

        addUser: async(parent, { username, email, password }) => {

            const user = await User.create({ username, email, password });
            // token
            const token = signToken(user);

            return { token, user };
        },
        //function to save book (bookData from API.js)
        saveBook: async(parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: args } }, { new: true, runValidators: true });
                return updatedUser;
            }
            throw new AuthenticationError("You need to login in first!");
        },

        removeBook: async(parent, { bookId }, context) => {
            if (context.user) {
                const updatedBooks = await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } } }, { new: true });

                return updatedBooks;
            }
        }
    }
};

module.exports = resolvers;