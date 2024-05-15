const { ObjectId } = require("mongodb");
const db = require("../config/mongodb");
const { hashing, compared } = require("../helpers/bycrpt");
const { signToken } = require("../helpers/jasonwebtoken");
const { GraphQLError } = require("graphql");

class User {
  static async register({ name, username, email, password }) {
    try {
      if (!username || !email || !password) {
        throw new GraphQLError(
          "All fields ( username, email, password) are required."
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new GraphQLError("Invalid email format");
      }

      const existingUser = await db.collection("Users").findOne({ email });
      if (existingUser) {
        throw new GraphQLError("Email already exists");
      }

      if (password.length < 5) {
        throw new GraphQLError("Password must be at least 5 characters");
      }

      const hasPassword = hashing(password);

      const data = await db
        .collection("Users")
        .insertOne({ name, username, email, password: hasPassword });
      // console.log(data, "ini data");

      return {
        _id: data.insertedId,
        name,
        username,
        email,
        password: hasPassword,
      };
    } catch (error) {
      throw error;
    }
  }

  static async login({ username, password }) {
    try {
      if (!username || !password) {
        throw new GraphQLError("Username and password are required.");
      }

      const user = await db.collection("Users").findOne({ username });
      console.log(user);

      if (!user) {
        throw new GraphQLError("Invalid username or password.");
      }

      const isPasswordValid = compared(password, user.password);

      if (!isPasswordValid) {
        throw new GraphQLError("Invalid username or password.");
      }

      const accessToken = signToken({
        userId: user._id,
        username: user.username,
        email: user.email,
      });

      return {
        accessToken: `Bearer ${accessToken}`,
      };
    } catch (error) {
      throw error;
    }
  }

  static async findUserById({_id}) {
    try {
      const user = await db
        .collection("Users")
        .aggregate([
          {
            $match: {
              _id: new ObjectId(_id),
            },
          },
          {
            $lookup: {
              from: "Follows",
              localField: "_id",
              foreignField: "followerId",
              as: "following",
            },
          },
          {
            $lookup: {
              from: "Users",
              localField: "following.followingId",
              foreignField: "_id",
              as: "userFollowing",
              pipeline: [
                {
                  $project: {
                    password: 0,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "Follows",
              localField: "_id",
              foreignField: "followingId",
              as: "follower",
            },
          },
          {
            $lookup: {
              from: "Users",
              localField: "follower.followerId",
              foreignField: "_id",
              as: "userFollower",
              pipeline: [
                {
                  $project: {
                    password: 0,
                  },
                },
              ],
            },
          },
          {
            $project: {
              password: 0,
            },
          },
        ])
        .toArray();

      if (!user) throw new GraphQLError("Couldn't find user");
      console.log(user[0]);
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  static async searchUser({ name }) {
    try {
      console.log(name)
      const user = await db.collection("Users").findOne({
        $or: [
          {
            username: { $regex: name },
            name: { $regex: name },
          },
        ],
      });

      if (!user) throw new GraphQLError("User not found");

      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
