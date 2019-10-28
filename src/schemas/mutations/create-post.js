import { gql } from 'apollo-boost'

export const CREATE_POST_MUTATION = gql`
  mutation createUser(
    $name: String!
    $email: String!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
      }
    ) {
      id
      name
    }
  }
`