const Customer = require("../models/Customer");
const Product = require("../models/Product");
const getCustomerSpending = require("../services/getCustomerSpending");
const Order = require("../models/Order");

const resolvers = {
  Query: {
    getCustomerSpending: async (_, { customerId }) => {
      return await getCustomerSpending(customerId);
    },
    getAllProducts: async () => {
      return await Product.find();
    },
    getAllCustomers: async () => {
      return await Customer.find();
    },
    getAllOrders: async () => {
      try {
        return await Order.find();
      } catch (error) {
        throw new Error("Error fetching orders");
      }
    },
    getCustomerById: async (_, { _id }) => {
      try {
        const customer = await Customer.findById(_id);
        if (!customer) {
          throw new Error("Customer not found");
        }
        return customer;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getAllOrders: async () => {
      try {
        return await Order.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },

    getOrderById: async (_, { _id }) => {
      try {
        const order = await Order.findById(_id);
        if (!order) {
          throw new Error("Order not found");
        }
        return order;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
