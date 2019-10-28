import gql from 'graphql-tag';
import { render, html } from 'lit-html/lit-html';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloMutation } from '@apollo-elements/lit-apollo';
import mutation from '../schemas/mutations/todo-mutation.graphql';

const uri = `http://localhost:5000/graphql`;
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
    this.mutation = mutation;
  }

  
  render() {
    return html`
      <loading-overlay ?active="${this.loading}"></loading-overlay>
      <button ?hidden="${this.data}" @click="${this.mutate}">Mutate Me</button>
      <div ?hidden="${!this.data}">wat</div>
      `;
  }
}

customElements.define('mutation-element', MutatingElement);


// /**
//  * Example update function which reads a cached query result, merges
//  * it with the mutation result, and then writes it back to the cache.
//  */
// const updateFunc = (cache, response) => {
//   // ostensibly looks up the cached object for mutationResult
//   const query = MyQuery;
//   const variables = { id: 1 };
//   const cached = cache.readQuery({ query, variables });
//   const changed = computeChanges(cached);
//   // mergeMutationResult is a made-up function.
//   const mutationResult = mergeMutationResult(cached, changed);
//   return cache.writeData({ query, data: { mutationResult } });
// };

// const template = html`
//   <mutation-element
//     .client="${client}"
//     .mutation="${mutation}"
//     .variables="${{ id: 1 }}"
//     .onUpdate="${updateFunc}"
//   ></mutation-element>
// `;

// render(template);
// import { ApolloClient } from 'apollo-client';
// import { ApolloMutation, html } from '@apollo-elements/lit-apollo';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import gql from 'graphql-tag';
// // import mutation from './todo-mutation.graphql';

// const uri = `http://localhost:5000/graphql`;
// const link = new HttpLink({ uri });
// const cache = new InMemoryCache();

// // Create the Apollo Client
// const client = new ApolloClient({ cache, link });

// const mutation = gql`
//   mutation {
//     incrementAge {
//       incrementAge
//     }
//   }
// `

// class MutationElement extends ApolloMutation {
//   constructor() {
//     super();
//     this.client = client;
//     this.mutation = mutation;
//   }

//   handleClick() {
//     console.log('taco')
//     return this.mutate()
//   }

//   render () {
//     const { data } = this;
    
//     console.log(data)
//     return html `
//       <button @click="${this.mutate}">Increment Counter</button>
//     `
//   }
// };

// customElements.define('mutation-element', MutationElement)