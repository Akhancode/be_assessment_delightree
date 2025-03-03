const customerResolvers = require("./Customer");
const orderResolvers = require("./Order");
const productResolvers = require("./Product");

module.exports = {
  Query: {
    ...customerResolvers.Query,
    ...orderResolvers.Query,
    ...productResolvers.Query,
  },
};
