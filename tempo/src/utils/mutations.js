import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!, $type: String!, $biography: String, $status: String) {
        addUser(username: $username, password: $password, email: $email, type: $type, biography: $biography, status: $status) {
        token
        user {
            _id
            username
            email
            biography
            status
        }
        }
    }
`;