const Order = require("../../models/Order"); // MongoDB Model
const { getSalesAnalytics, createNewOrder } = require("../../services/order.service");
const { v4: uuidv4 } = require("uuid");

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
  Mutation: {
    async placeOrder(_, { input }) {
        return await createNewOrder(input)
    },
  },
};

module.exports = orderResolvers;
