const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        biography: String
        status: String
        type: String
        music: [Music]
        reviews: [Review]
        messages: [Message]
        meta: [MetaData]
    }

    type Music {
        _id: ID
        media: String
        meta: [MetaData]
    }

    type MetaData {
        _id: ID
        value: String
        type: String
        musicLink: String
        userLink: String    
    }

    type Review {
        _id: ID
        review_text: String
        rating: Int
        username: String
        aboutUser: String
        created_at: String
    }

    type Message {
        _id: ID
        message_text: String
        sender: String
        receiver: String
        created_at: String
    }

    input InputMeta {
        value: String    
        type: String       
      }

    type Query {
        users: [User]
        user(username: String): User
        reviews: [Review]
        music(metaData: [InputMeta]): [Music]
        messages: [Message]
        metaData(type: [String!]): [MetaData]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, type: String!, biography: String, status: String): Auth
        deleteUser: User
        editUser(username: String, status: String, biography: String, type: String): User
        addMusic(genre: String!, instruments: [String!], media: String): Music
        addReview(review_text: String!, rating: Int): Review
        addMessage(message_text: String!): Message
        
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;