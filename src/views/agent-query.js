import { ApolloQuery, html } from '@apollo-elements/lit-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag'
import logger from '../../services/logger.js'
import { POSTS_QUERY } from '../graphql';
const uri = `http://localhost:4000`;
const link = new HttpLink({ uri });
const cache = new InMemoryCache();

// Create the Apollo Client
const client = new ApolloClient({ cache, link });

class ConnectedElement extends ApolloQuery {
  constructor() {
    super();
    this.client = client;
    this.query = POSTS_QUERY;
  }
  
  render() {
    const { data, error, loading } = this;
    logger.info(data)
    return (
      html`
      <style>
        .agent-list-wrapper {
          float: left;
        }
      </style>
        <div class='agent-list-wrapper'>
          ${data.users.map(agent => (
            html`
              <ul>
                <li>Agent Name: ${agent.name} <br> Agent Email: ${agent.email}</li>
              </ul>`
          ))}
          <mutation-element></mutation-element>
        </div>
        <child-agent-element></child-agent-element>
      `
    );
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