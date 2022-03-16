import { gql } from "@apollo/client";


export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            biography
            status
            type
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!, $type: String!, $biography: String, $status: String) {
    addUser(username: $username, password: $password, email: $email, type: $type, biography: $biography, status: $status) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const DELETE_USER = gql`
{
    deleteUser {
        _id: ID
        username: String
        email: String
    }
}
`;

export const EDIT_USER = gql`
mutation editUser($username: String, $status: String, $biography: String) {
    editUser(username: $username, status: $status, biography: $biography) {
        _id: ID
        username: String
        email: String
        biography: String
        status: String
        type: String
    }
}
`;

export const ADD_MUSIC = gql`
mutation addMusic($genre: String!, $instruments: [String!], $media: String) {
    addMusic(genre: $genre, instruments: $instruments, media: $media) {
        _id
        genre
        media
        instruments
    }
}
`;

export const ADD_REVIEW = gql`
mutation addReview($myId: ID!, $userId: ID!, $review_text: String, $rating: Int) {
    addReview(myId: $myId, userId: $userId, review_text: $review_text, rating: $rating) {
        _id
        review_text
        rating
        myId
        userId
        created_at
    }
}
`;

export const ADD_MESSAGE = gql`
mutation addMessage($message_text: String!) {
    addMessage(message_text: $message_text) {
        _id
        message_text
        sender
        receiver
        created_at
    }
}
`;