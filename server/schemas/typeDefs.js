const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Query {
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        deleteUser: User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;