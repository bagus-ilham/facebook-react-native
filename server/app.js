require('dotenv').config()
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDefs : typeDefsUser, resolvers : resolversUser } = require("../server/schemas/User")
const { typeDefs : typeDefsPosts, resolvers : resolversPosts } = require("../server/schemas/Posts")
const { typeDefs : typeDefsFollow, resolvers : resolversFollow } = require("../server/schemas/Follow");
const { verifyToken } = require("./helpers/jasonwebtoken");

const server = new ApolloServer({
  typeDefs : [typeDefsUser, typeDefsPosts, typeDefsFollow],
  resolvers : [resolversUser, resolversPosts, resolversFollow],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: 3000 },
  context: async ({req, res}) => {
    return {
      authentication: () => {
        const token = req.headers.authentication.split(" ")[1]
        if (!token) { throw new Error ("Unautorized") }

        const verifToken = verifyToken(token)

        if (!verifToken) { throw new Error ("Unautorized") }

        return verifToken
      }
    };
  }
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => console.log(err));
