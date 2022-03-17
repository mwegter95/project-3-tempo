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
            myId
            userId
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
query user($_id: ID!) {
    user(_id: $_id) {
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
            myId
            userId
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

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_REVIEWS = gql`
{
    reviews {
        _id
        review_text
        rating
        userId
        myId
        created_at
    }
}
`;

export const QUERY_MY_REVIEWS = gql`
query myReviews($myId: ID!) {
    myReviews(myId: $myId) {
        _id
        review_text
        rating
        userId
        myId
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

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;