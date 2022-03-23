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
        _id
        username
        email
    }
}
`;

export const EDIT_USER = gql`
mutation editUser($username: String, $status: String, $biography: String) {
    editUser(username: $username, status: $status, biography: $biography) {
        _id: ID
        username
        email
        biography
        status
        type
    }
}
`;
export const ADD_MUSIC = gql`
mutation addMusic($meta: [InputMeta], $userLink: ID, $media: String!, $title: String!, $description: String!) {
    addMusic(meta: $meta, userLink: $userLink, media: $media, title: $title, description: $description) {
        _id        
        media
        title
        description
        userLink
        meta {
            _id
            type
            value
        }
    }
}
`;

export const ADD_REVIEW = gql`
mutation addReview($reviewBy: ID!, $reviewOf: ID!, $review_text: String!, $rating: Int) {
    addReview(reviewBy: $reviewBy, reviewOf: $reviewOf, review_text: $review_text, rating: $rating) {
        _id
        review_text
        rating
        reviewBy
        reviewOf {
            _id
            username
            email
        }
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

export const DELETE_MUSIC = gql`
{
    deleteMusic {
        _id        
    }
}
`;

export const EDIT_MUSIC = gql`
mutation editMusic($updatedMusic: InputMusic) {
    editMusic(updatedMusic: $updatedMusic) {
        _id        
        media
        title
        description
        userLink
        meta {
            _id
            type
            value
        }
    }
}
`;
