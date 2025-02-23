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

  type Order {
    id: ID!
    name: String!
    total: String!
    status: String!
    checkout_session_id: String!
    created_at: String! 
  }

  type Product {
    id: ID!
    type_id: String!
    productID: String!
    source_table: String!
    title: String!
  }

  type Query {
    users: [User]
    orders: [Order]
    products: [Product]
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

// query {
//     orders {
//      id
//      user_id
//      total
//      status
//      checkout_session_id
//      created_at 
//     }
// }

// query {
//     orders {
//      id
//      name
//      total
//      status
//      checkout_session_id
//      created_at 
//     }
// }

// query {
//     products {
//      id
//      productCodeID
//      productID
//      source_table
//     }
// }

// query {
//     products {
//      id
//      type_id
//      productID
//      source_table
//      title
//     }
// }