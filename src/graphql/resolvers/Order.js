const Order = require("../../models/Order"); // MongoDB Model
const {
  getSalesAnalytics,
  createNewOrder,
} = require("../../services/order.service");
const { v4: uuidv4 } = require("uuid");

const orderResolvers = {
  Query: {
    getAllOrders: async () => {
      return await Order.find();
    },
    getOrderById: async (_, { _id }) => {
      return await Order.findById(_id);
    },
    getCustomerOrders: async (_, { customerId, page = 1, limit = 3 }) => {
      const skip = (page - 1) * limit;
      let query = {};
      if (customerId) {
        query.customerId = customerId;
      }
      const orders = await Order.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ orderDate: -1 });
      const totalOrders = await Order.countDocuments(query);
      return {
        orders,
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
      };
    },
    getSalesAnalytics: async (_, { startDate, endDate }) => {
      return await getSalesAnalytics(startDate, endDate);
    },
  },
  Mutation: {
    async placeOrder(_, { input }) {
      return await createNewOrder(input);
    },
  },
};

module.exports = orderResolvers;
