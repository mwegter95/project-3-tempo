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
        avatar
        meta {
            _id
            value
            type            
        }
        reviews {
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
        avatar
        meta {
            _id
            value
            type            
        }
        reviews {
            _id
            review_text
            rating
            reviewBy
            reviewOf {
                _id
                username
                email
            }
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

export const QUERY_MY_REVIEWS = gql`
query myReviews {
    myReviews {
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

export const QUERY_MUSIC = gql`
query music {
    music {
        _id
        media
        title
        description
        meta {
            _id
            type
            value
        }
        userLink
    }
}
`;

export const QUERY_USERMUSIC = gql`
query userMusic($_id: ID!) {
    userMusic(_id: $_id) {
        _id
        media
        meta {
            _id
            type
            value
        }
        userLink
        title
        description
    }
}
`;

export const FEED_MUSIC = gql`
query feedMusic($metaData: [InputMeta!]) {
    feedMusic(metaData: $metaData) {
        _id
        media              
        userLink
        title
        description
        meta {
            _id
            value
            type
          }
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
      biography
      status
      type
      avatar
      reviews {
        _id
        review_text
        rating
        reviewOf {
            _id
            username
            email
        }
        reviewBy
        created_at
        }    
    }
  }
`;
