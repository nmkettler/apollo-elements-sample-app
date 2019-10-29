import { gql } from 'apollo-boost'

export const CREATE_AGENT_MUTATION = gql`
  mutation createAgent(
    $name: String!
    $email: String!
  ) {
    createAgent(
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