const { default: mongoose } = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

async function getCustomerSpending(customerId) {
  try {
    const result = await Order.aggregate([
      { $match: { customerId } },
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



module.exports = { getCustomerSpending };
