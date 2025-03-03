const customerResolvers = require("./Customer");
const orderResolvers = require("./Order");
const productResolvers = require("./Product");

module.exports = {
  Query: {
    ...customerResolvers.Query,
    ...orderResolvers.Query,
    ...productResolvers.Query,
  },
  Mutation: {
    ...orderResolvers.Mutation,
    ...customerResolvers?.Mutation,
    ...productResolvers?.Mutation,
  },
};
