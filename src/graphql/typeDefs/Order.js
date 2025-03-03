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
  type CustomerOrdersWithPagination {
    orders: [Order]
    totalOrders: Int
    totalPages:Int
    currentPage:Int
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

  input ProductOrderInput {
    productId: String!
    quantity: Int!
  }

  input PlaceOrderInput {
    customerId: String!
    products: [ProductOrderInput]!
  }

  extend type Mutation {
    placeOrder(input: PlaceOrderInput!): Order
  }

  extend type Query {
    getAllOrders: [Order]
    getOrderById(_id: ID!): Order
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
    getCustomerOrders(
      customerId: ID
      page: Int
      limit: Int
    ): CustomerOrdersWithPagination
  }
`;

module.exports = orderTypeDefs;
