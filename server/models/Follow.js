const db = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const { GraphQLError } = require("graphql");

class Follow {
  static async followUser({ followingId }, id) {
    try {
      // console.log(followingId, id);
      const validateData = await followCollection.findOne({
        followerId: new ObjectId(id),
        followingId: new ObjectId(followingId),
      });

      if (validateData) throw new GraphQLError("Data already exist");

      const dataFollow = await db.collection("Follows").insertOne({
        followerId: id,
        followingId: followingId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return {
        followerId: id,
        followingId: followingId,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Follow;
