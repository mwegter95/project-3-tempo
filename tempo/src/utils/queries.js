import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
{
    users {
        _id
        username
        email
        biography
        status
        type
        music {
            _id
            genre
            media
            instruments
        }
        reviews {
            _id
            review_text
            rating
            username
            aboutUser
            created_at
        }
        messages {
            _id
            message_text
            sender
            receiver
            created_at
        }
    }
}
`;

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
        _id
        username
        email
        biography
        status
        type
        music {
            _id
            genre
            media
            instruments
        }
        reviews {
            _id
            review_text
            rating
            username
            aboutUser
            created_at
        }
        messages {
            _id
            message_text
            sender
            receiver
            created_at
        }
    }
}
`;

export const QUERY_REVIEWS = gql`
{
    reviews {
        _id
        review_text
        rating
        username
        aboutUser
        created_at
    }
}
`;

export const QUERY_MUSIC = gql`
query music($genre: String, $instruments: [String]) {
    music(genre: $genre, instruments: $instruments) {
        _id
        genre
        media
        instruments
    }
}
`;

export const QUERY_MESSAGES = gql`
{
    messages {
        _id
        message_text
        sender
        receiver
        created_at
    }
}
`;