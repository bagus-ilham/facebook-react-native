const Post = require("../models/Post");
const redis = require("../config/rediscloude");

const typeDefs = `#graphql
    type Posts {
        _id: ID!
        content: String!
        tags: [String]
        imgUrl: String
        authorId: ID!
        comments: [Comments]
        likes: [Likes]
        createdAt: String
        updatedAt: String
        authorDetail:[User]
        }

    type Comments {
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }

    type Likes {
        username: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        GetPost: [Posts]
        GetPostId(_id : ID!): Posts
        }

    type Mutation {
        AddPost(content: String!, tags: [String], imgUrl: String) : Posts 
        CommentPost(content: String!, postId : ID!) : Comments
        LikePost(postId : ID!): Likes
        }
`;

const resolvers = {
  Query: {
    GetPost: async (parent, args, contextValue, info) => {
      try {
        const user = contextValue.authentication();
        const dataRedis = await redis.get("Posts");
        if (dataRedis) {
          return JSON.parse(dataRedis);
        }
        const data = await Post.getPosts();
        await redis.set("Posts", JSON.stringify(data));
        return data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
    GetPostId: async (parent, args, contextValue, info) => {
      try {
        const { _id } = args;
        const user = contextValue.authentication();
        const data = await Post.getPostById(_id);
        return data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    AddPost: async (parent, args, contextValue, info) => {
      try {
        const user = contextValue.authentication();
        await redis.del("Posts");
        const data = await Post.addPost(args, user);
        return data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
    CommentPost: async (parent, args, contextValue, info) => {
      try {
        const user = contextValue.authentication();
        await redis.del("Posts");
        const data = await Post.commentPost(args, user);
        return data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
    LikePost: async (parent, args, contextValue, info) => {
      try {
        const user = contextValue.authentication();
        await redis.del("Posts");
        const data = await Post.likePost(args, user);
        return data;
      } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
