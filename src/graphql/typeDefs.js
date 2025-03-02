const { gql } = require("graphql-tag");

const typeDefs = gql`
  type ProductOrder {
    productId: String!
    quantity: Int!
    priceAtPurchase: Float!
  }
  type Order {
    _id: ID!
    customerId: ID!
    products: [ProductOrder]!
    totalAmount: Float!
    orderDate: String!
    status: String!
  }

  type Customer {
    _id: ID!
    name: String!
    email: String!
    age: Int!
    location: String!
    gender: String!
  }

  type Product {
    _id: ID!
    name: String!
    category: String!
    price: Float!
    stock: Int!
  }

  type CustomerSpending {
    customerId: ID!
    totalSpent: Float!
    averageOrderValue: Float!
    lastOrderDate: String
  }

  type Query {
    getAllCustomers: [Customer]
    getAllProducts: [Product]
    getCustomerSpending(customerId: ID!): CustomerSpending
    getCustomerById(_id: ID!): Customer
    getAllOrders: [Order]
    getOrderById(_id: ID!): Order
  }
`;

module.exports = typeDefs;
