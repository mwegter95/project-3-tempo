import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $type: String!, $biography: String, $status: String) {
        addUser(username: $username, email: $email, password: $password, type: $type, biography: $biography, status: $status) {
            token
            user {
                _id
                username
            }
        }
    }
`