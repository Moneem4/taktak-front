import { gql } from "@apollo/client";



export const GET_USER = gql`
    query User($input: ID!) {
        user(_id: $input) {
            firstName
            lastName
        }
    }
`

export const ME = gql`
    {
        me {
            _id
            firstName
            lastName
           
        }
    }
`