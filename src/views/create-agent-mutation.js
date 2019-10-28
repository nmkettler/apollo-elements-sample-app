import gql from 'graphql-tag';
import { render, html } from 'lit-html/lit-html';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloMutation } from '@apollo-elements/lit-apollo';
import mutation from '../schemas/mutations/add-agent.graphql';
import { CREATE_POST_MUTATION } from '../schemas/mutations'

const uri = `http://localhost:4000`;
const link = new HttpLink({ uri });
const cache = new InMemoryCache();

const client = new ApolloClient({ cache, link });

/*
 * Example update function which reads a cached query result, merges
 * it with the mutation result, and then writes it back to the cache.
*/

class MutatingElement extends ApolloMutation {
  constructor() {
    super();
    this.client = client;
    this.mutation = CREATE_POST_MUTATION;
  }

    createPost() {
      let variables = {
        $title: 'taco',
        body: 'butt',
        published: true,
        authorId: 2
      }
      return variables
    }

  render() {
    return html`
      <loading-overlay ?active="${this.loading}"></loading-overlay>
      <button ?hidden="${this.data}" @click="${this.mutate}">Add Agent</button>
      <div ?hidden="${!this.data}">wat</div>
      `;
  }
}

customElements.define('add-agent-element', MutatingElement);