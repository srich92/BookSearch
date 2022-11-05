const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models');
const resolvers = {
    Query:{
        me: async(parent,args, context)=>{
const user = await User.findOne({_id: context.user._id})
.select('-__v -password');
.populate('savedBooks')
return user;
        }
        throw new AuthenticationError('Not logged in');
    }
}