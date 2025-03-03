const { gql } = require("graphql-tag");

const productTypeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    category: String!
    price: Float!
    stock: Int!
  }
  type TopSellingProducts {
    productId: ID!
    name: String!
    totalSold: Int!
  }

  extend type Query {
    getAllProducts: [Product]
    getTopSellingProducts(limit: Int!): [TopSellingProducts]
  }
`;

module.exports = productTypeDefs;
