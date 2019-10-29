import { gql } from 'apollo-boost'

export const CREATE_AGENT_MUTATION = gql`
  mutation createAgent(
    $name: String!
    $email: String!
    $agent_status: String!
  ) {
    createAgent(
      data: {
        name: $name
        email: $email
        agent_status: $agent_status
      }
    ) {
      id
      name
    }
  }
`