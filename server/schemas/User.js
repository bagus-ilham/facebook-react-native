const User = require("../models/User");

const typeDefs = `#graphql
    type User {
        _id: ID!
        name: String
        username: String!
        email: String!
        password: String
        userFollowing: [User]
        userFollower: [User]
        following : [Follow]
        follower : [Follow]
        }

    type Query {
        GetUserById(_id : ID!): User
        SearchUser(name: String): User
        }

    type Mutation {
        Register(name: String, username: String!, email:String!, password: String!) : User
        Login(username: String, password: String!) : AccessToken 
        }

    type AccessToken {
        accessToken: String!
      }
`;

const resolvers = {
  Query: {
    GetUserById: async (parent, args, contextValue, info) => {
      try {
        const user = contextValue.authentication();
        console.log(args)
        const data = await User.findUserById(args);
        return data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
    SearchUser: async (parent, args, contextValue, info) => {
      try {
        const user = contextValue.authentication();
        const data = await User.searchUser(args);
        return data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    Register: async (parent, args, contextValue, info) => {
      try {
        const user = await User.register(args);
        return user;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
    Login: async (parent, args, contextValue, info) => {
      try {
        const user = await User.login(args);
        return user;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
