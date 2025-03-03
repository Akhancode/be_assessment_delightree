const Customer = require("../../models/Customer"); // MongoDB Model
const { getCustomerSpending } = require("../../services/customer.service");

const customerResolvers = {
  Query: {
    getAllCustomers: async () => {
      return await Customer.find();
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
    getCustomerSpending: async (_, { customerId }) => {
      return await getCustomerSpending(customerId);
    },
  },
};

module.exports = customerResolvers;
