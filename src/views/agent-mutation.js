import { render, html } from 'lit-html/lit-html';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloMutation } from '@apollo-elements/lit-apollo';
import { CREATE_AGENT_MUTATION } from '../graphql'

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
    this.mutation = CREATE_AGENT_MUTATION;
  }

  handlePost (agentName, agentEmail, agentStatus) {
    this.mutate({
      variables: {
        name: agentName,
        email: agentEmail,
        agent_status: agentStatus
      }
    })
  }
  
  render() {
    return html`
      <button ?hidden="${this.data}" @click="${() => this.handlePost("Noah", "noah@ke.com", "online")}">Add Agent</button>
    `
    // return html`
    //   <loading-overlay ?active="${this.loading}"></loading-overlay>
    //   <button ?hidden="${this.data}" @click="${this.mutate}">Mutate Me</button>
    //   <div ?hidden="${!this.data}">wat</div>
    //   `;
  }
}

customElements.define('mutation-element', MutatingElement);
