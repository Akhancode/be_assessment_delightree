const { gql } = require("graphql-tag");

const customerTypeDefs = gql`
  type Customer {
    _id: ID!
    name: String!
    email: String!
    age: Int!
    location: String!
    gender: String!
  }
  type CustomerSpending {
    customerId: ID!
    totalSpent: Float!
    averageOrderValue: Float!
    lastOrderDate: String
  }

  extend type Query {
    getAllCustomers: [Customer]
    getCustomerById(_id: ID!): Customer
    getCustomerSpending(customerId: ID!): CustomerSpending
  }
`;

module.exports = customerTypeDefs;
