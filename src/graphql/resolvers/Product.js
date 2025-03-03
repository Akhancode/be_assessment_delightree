const Product = require("../../models/Product"); // MongoDB Model
const { getTopSellingProducts } = require("../../services/products.service");

const productResolvers = {
  Query: {
    getAllProducts: async () => {
      return await Product.find();
    },
    getTopSellingProducts: async (_, { limit }) => {
      return await getTopSellingProducts(limit);
    },
  },
};

module.exports = productResolvers;
