const { ObjectId } = require("mongodb");
const db = require("../config/mongodb");
const { GraphQLError } = require("graphql");

class Post {
  static async getPosts() {
    try {
      const data = await db
        .collection("Posts")
        .aggregate([
          {
            $lookup: {
              from: "Users",
              localField: "authorId",
              foreignField: "_id",
              as: "authorDetail",
              pipeline: [
                {
                  $project: {
                    password: 0,
                  },
                },
              ],
            },
          },
        ])
        .sort({ updatedAt: -1 })
        .toArray();

      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getPostById(_id) {
    try {
      console.log(_id);
      const data = await db
        .collection("Posts")
        .aggregate([
          {
            $match: {
              _id: new ObjectId(_id),
            },
          },
          {
            $lookup: {
              from: "Users",
              localField: "authorId",
              foreignField: "_id",
              as: "authorDetail",
              pipeline: [
                {
                  $project: {
                    password: 0,
                  },
                },
              ],
            },
          },
        ])
        .toArray();

      console.log(data, "ini");
      if (!data) throw new GraphQLError("Couldn't find data");

      return data[0];
    } catch (error) {
      throw error;
    }
  }

  static async addPost({ content, tags, imgUrl }, user) {
    try {
      const pasingData = {
        content,
        tags,
        imgUrl,
        authorId: new ObjectId(user.userId),
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const data = await db.collection("Posts").insertOne(pasingData);

      return { _id: data.insertedId, ...pasingData };
    } catch (error) {
      throw error;
    }
  }

  static async commentPost({ content, postId }, { username }) {
    try {
      const dataComment = {
        content,
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db
        .collection("Posts")
        .updateOne(
          { _id: new ObjectId(postId) },
          { $push: { comments: dataComment } }
        );

      const data = await Post.getPostById(postId);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async likePost({ postId }, { username }) {
    try {
      const dataLikes = {
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const data = await Post.getPostById(postId);

      if (data._id === postId) {
        console.log("masuk sini");
        throw new GraphQLError("You have like this Post");
      } else {
        console.log("masuk situ");
        await db
          .collection("Posts")
          .updateOne(
            { _id: new ObjectId(postId) },
            { $push: { likes: dataLikes } }
          );

        return data;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Post;
