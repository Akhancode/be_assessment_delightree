const Order = require("../../models/Order"); // MongoDB Model
const { getSalesAnalytics } = require("../../services/order.service");

const orderResolvers = {
  Query: {
    getAllOrders: async () => {
      return await Order.find();
    },
    getOrderById: async (_, { _id }) => {
      return await Order.findById(_id);
    },
    getSalesAnalytics: async (_, { startDate, endDate }) => {
      return await getSalesAnalytics(startDate, endDate);
    },
  },
};

module.exports = orderResolvers;
