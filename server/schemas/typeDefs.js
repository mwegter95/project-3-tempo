const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        biography: String!
        status: String!
    }

    type Query {
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, biography: String, status: String): Auth
        deleteUser: User
        editUser(username: String, status: String, biography: String): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;