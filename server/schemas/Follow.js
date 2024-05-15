const Follow = require("../models/Follow");

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
        }

    type Mutation {
        Follow(followingId: ID): Follow
        }
`;

const resolvers = {
    Mutation: {
        Follow: async (parent, args, contextValue, info) => {
        try {
          const user = contextValue.authentication();
          const data = await Follow.followUser(args, user.userId);
          return data;
        } catch (error) {
          console.error(error.message);
          throw new Error(error.message);
        }
      },
  },
};

module.exports = { typeDefs, resolvers };