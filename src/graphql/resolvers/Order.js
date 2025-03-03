const Order = require("../../models/Order"); // MongoDB Model

const orderResolvers = {
  Query: {
    getAllOrders: async () => {
      return await Order.find();
    },
    getOrderById: async (_, { _id }) => {
      return await Order.findById(_id);
    },
  },
};

module.exports = orderResolvers;
