const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async() => {
    // create new Apollo server and pass in our schema data
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        //context
    });

    await server.start();
    server.applyMiddleware({ app });

    console.log(`Use GraphQl at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});