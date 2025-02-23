const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    salutation: String!
    country: String!
    created_at: String! 
  }

  type Query {
    users: [User]
  }
  
`);

module.exports = schema;

// GraphiQL Session

// query {
//     users {
//      id
//      name
//      email
//      password
//      salutation
//      country
//      created_at 
//     }
// }