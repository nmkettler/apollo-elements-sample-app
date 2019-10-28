const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

// Agent Type
let age = 2;
let username = '';
let firstName = '';
const AgentType = new GraphQLObjectType({
  name: 'Agents',
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLInt },
    age: {
      type: GraphQLInt,
      resolve: () => age
    },
    agent_online: { type: GraphQLBoolean },
    newAgentName: { type: GraphQLString },
    username: { type: GraphQLString },
    firstName: { type: GraphQLString },
  })
});

const AgentMutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newAgentName: {
      type: GraphQLString,
      resolve: () => 'Noah Mutated'
    },
    incrementAge: {
      type: GraphQLInt,
      resolve: () => ++age
    },
    createUsers: {
      type: GraphQLString,
      resolve: () => username
    }
  })
});


// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    agents: {
      type: new GraphQLList(AgentType),
      resolve(parent, args) {
        return axios
          .get('./dummy_api.json',
            { proxy: { host: '127.0.0.1', port: 5000 } })
          .then((res => res.data))
          .catch(e => e.data);
      }
    },
  }
});



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: AgentMutations
});


/* SpaceX Example */


// const axios = require('axios');

// const {
//   GraphQLObjectType,
//   GraphQLInt,
//   GraphQLString,
//   GraphQLBoolean,
//   GraphQLList,
//   GraphQLSchema
// } = require('graphql');

// // let name = 'Noah One'
// // Launch Type
// let age = 2;
// const LaunchType = new GraphQLObjectType({
//   name: 'Launch',
//   fields: () => ({
//     flight_number: { type: GraphQLInt },
//     mission_name: { type: GraphQLString },
//     launch_year: { type: GraphQLString },
//     launch_date_local: { type: GraphQLString },
//     launch_success: { type: GraphQLBoolean },
//     rocket: { type: RocketType },
//     // name: { type: GraphQLString, resolve: () => name },
//     name: { type: GraphQLString},
//     id: { type: GraphQLInt },
//     age: { type: GraphQLInt,
//     resolve: () => age },
//     agent_online: { type: GraphQLBoolean },
//     newAgentName: { type: GraphQLString }
//   })
// });

// const AgentMutations = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//     newAgentName: { type: GraphQLString,
//     resolve: () => 'Noah Mutated' },
//     incrementAge: { type: GraphQLInt,
//     resolve: () => ++age }
//   })
// });

// // Rocket Type
// const RocketType = new GraphQLObjectType({
//   name: 'Rocket',
//   fields: () => ({
//     rocket_id: { type: GraphQLString },
//     rocket_name: { type: GraphQLString },
//     rocket_type: { type: GraphQLString }
//   })
// });

// // Root Query
// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     agents: {
//       type: new GraphQLList(LaunchType),
//       resolve(parent, args) {
//         return axios
//           // .get('https://api.spacexdata.com/v3/launches')
//           .get('./dummy_api.json',
//             { proxy: { host: '127.0.0.1', port: 5000 }})
//           .then((res => res.data))
//           .catch(e => e.data);
//       }
//     },
//     launch: {
//       type: LaunchType,
//       args: {
//         flight_number: { type: GraphQLInt }
//       },
//       resolve(parent, args) {
//         return axios
//           .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
//           .then(res => res.data);
//       }
//     },
//     rockets: {
//       type: new GraphQLList(RocketType),
//       resolve(parent, args) {
//         return axios
//           .get('https://api.spacexdata.com/v3/rockets')
//           .then(res => res.data);
//       }
//     },
//     rocket: {
//       type: RocketType,
//       args: {
//         id: { type: GraphQLInt }
//       },
//       resolve(parent, args) {
//         return axios
//           .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
//           .then(res => res.data);
//       }
//     },
//   }
// });



// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: AgentMutations
// });
