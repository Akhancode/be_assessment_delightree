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

  type CategoryBreakUp {
    category: String!
    revenue: Float!
  }

  type SalesAnalytics {
    totalRevenue: Float!
    completedOrders: Int!
    categoryBreakdown: [CategoryBreakUp]
  }

  extend type Query {
    getAllOrders: [Order]
    getOrderById(_id: ID!): Order
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
  }
`;

module.exports = orderTypeDefs;
