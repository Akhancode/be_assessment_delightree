const { gql } = require("graphql-tag");

const orderTypeDefs = gql`
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


  extend type Query {
    getAllOrders: [Order]
    getOrderById(_id: ID!): Order

  }
`;

module.exports = orderTypeDefs;
