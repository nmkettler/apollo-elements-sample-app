import gql from 'graphql-tag';
import { render, html } from 'lit-html/lit-html';
// import { LitElement, html } from 'lit-element';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloMutation } from '@apollo-elements/lit-apollo';
// import mutation from '../schemas/mutations/todo-mutation.graphql';

const uri = `http://localhost:4000`;
const link = new HttpLink({ uri });
const cache = new InMemoryCache();

const client = new ApolloClient({ cache, link });

/*
 * Example update function which reads a cached query result, merges
 * it with the mutation result, and then writes it back to the cache.
*/

class ChildAgentComponent extends ApolloMutation {
  constructor() {
    super();
    this.client = client;
  }


  render() {
    return html`
      <div>This is the child component</div>
    `
  }
}

customElements.define('child-agent-element', ChildAgentComponent);
