const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

async function getCustomerSpending(customerId) {
  try {
    console.log("first");
    const result = await Order.aggregate([
      { $match: { customerId } }, // Filter orders by customerId
      {
        $group: {
          _id: "$customerId",
          totalSpent: { $sum: "$totalAmount" },
          averageOrderValue: { $avg: "$totalAmount" },
          lastOrderDate: { $max: "$orderDate" },
        },
      },
      {
        $project: {
          _id: 0,
          customerId: "$_id",
          totalSpent: 1,
          averageOrderValue: 1,
          lastOrderDate: 1,
        },
      },
    ]);

    return result.length
      ? result[0]
      : {
          customerId,
          totalSpent: 0,
          averageOrderValue: 0,
          lastOrderDate: null,
        };
  } catch (error) {
    console.error("Error in getCustomerSpending:", error);
    throw new Error("Failed to fetch customer spending data.");
  }
}

const addProduct = async (name, category, price, stock) => {
  try {
    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      name,
      category,
      price,
      stock,
    });

    const savedProduct = await newProduct.save();
    console.log("✅ Product Added:", savedProduct);
    return savedProduct;
  } catch (error) {
    console.error("❌ Error adding product:", error);
    throw error;
  }
};

module.exports = { getCustomerSpending, addProduct };
