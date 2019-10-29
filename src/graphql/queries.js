import { gql } from 'apollo-boost'

export const POSTS_QUERY = gql`
query {
  users {
    name,
    age,
    email,
    agent_status
  }
}
`