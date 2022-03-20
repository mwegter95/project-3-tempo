const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        biography: String
        status: String
        type: String
        reviews: [Review]
        messages: [Message]
        meta: [MetaData]        
    }

    type Music {
        _id: ID
        media: String
        meta: [MetaData]
        userLink: ID
        title: String
        description: String
    }

    type MetaData {
        _id: ID
        value: String
        type: String            
    }

    type Review {
        _id: ID
        review_text: String
        rating: Int
        reviewBy: ID
        reviewOf: User
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
        me: User
        users: [User]
        user(_id: ID): User
        metaUsers(metaData: [InputMeta]): [User]
        reviews: [Review]
        feedMusic(metaData: [InputMeta]): [Music]
        userMusic(_id: ID): [Music]
        music: [Music]
        singleUserMusic(userLink: String): [Music]
        messages: [Message]
    }

    type Mutation {
        login(email: String, password: String): Auth
        addUser(username: String, email: String, password: String, type: String, biography: String, status: String): Auth
        deleteUser: User
        editUser(username: String, status: String, biography: String, type: String, meta: [InputMeta]): User
        addMusic(media: String, meta: [InputMeta], userLink: ID, title: String, description: String): Music
        addReview(review_text: String, rating: Int): Review
        addMessage(message_text: String): Message  
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;