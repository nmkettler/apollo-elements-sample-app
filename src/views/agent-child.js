import { render, html } from 'lit-html/lit-html';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloMutation, ApolloQuery } from '@apollo-elements/lit-apollo';
import { POSTS_QUERY } from '../graphql';

const uri = `http://localhost:4000`;
const link = new HttpLink({ uri });
const cache = new InMemoryCache();

const client = new ApolloClient({ cache, link });


class ChildAgentComponent extends ApolloQuery {
  constructor() {
    super();
    this.client = client;
    this.query = POSTS_QUERY
  }


  render() {
    const { data } = this;
    
    return html`
      <style>
        .agent-status-wrapper {
          float: right;
        }
      </style>
      <div class='agent-status-wrapper'>
        ${data.users.map(agent => (
        html`
            <ul>
              <li>Agent Status: ${agent.name} is ${agent.agent_status}</li>
            </ul>
          `
        ))}
      </div>
    `
  }
}

customElements.define('child-agent-element', ChildAgentComponent);
