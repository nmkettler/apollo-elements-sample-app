import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag'
import query from '../schemas/queries/todo-query.graphql';
import logger from '../../services/logger.js'

// const protocol = host.includes('localhost') ? 'http' : 'https';
// const uri = `${protocol}://${host}/graphql`;
const uri = `http://localhost:4000`;
const link = new HttpLink({ uri });
const cache = new InMemoryCache();

// Create the Apollo Client
const client = new ApolloClient({ cache, link });

class ConnectedElement extends ApolloQuery {
  render() {
    const { data, error, loading } = this;
    const { helloWorld = {} } = data || {}
    logger.info(data)
    return (
      html`
        ${data.users.map(agent => (
          html`
            <ul>
              <li>${agent.name} is ${agent.age}</li>
            </ul>`
        ))}
      `
    );
  }

  constructor() {
    super();
    this.client = client;
    this.query = query;
  }
};

customElements.define('connected-element', ConnectedElement)

// class ConnectedElement extends ApolloQuery {
//   render() {
//     const { data, error, loading } = this;
//     const { helloWorld = {} } = data || {}
//     return (
//       loading ? html`
//           <what-spin></what-spin>`
//         : error ? html`
//           <h1>😢 Such Sad, Very Error! 😰</h1>
//           <div>${error ? error.message : 'Unknown Error'}</div>`
//           : html`
//           <div>${helloWorld.greeting}, ${helloWorld.name}</div>
//           <connected-child id="child-component"
//               .client="${this.client}"
//               .query="${childQuery}"
//           ></connected-child>`
//     );
//   }