//TODO: mutations.js: create LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK mutations

// import GraphQL
import { gql } from '@apollo/client';

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $authors: [String]!, $description: String, $image: String, $link: String, $title: String!) {
        saveBook(bookId: $bookId, authors: $authors, description: $description, image: $image, link: $link, title: $title) {
            username
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
`;

// REMOVE_BOOK will execute the removeBook mutation.
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            username
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
            
        }    
    }
`;
