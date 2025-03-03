const { gql } = require("graphql-tag");
const customerTypeDefs = require("./Customer");
const orderTypeDefs = require("./Order");
const productTypeDefs = require("./Product");

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

module.exports = [
  baseTypeDefs,
  customerTypeDefs,
  orderTypeDefs,
  productTypeDefs,
];
