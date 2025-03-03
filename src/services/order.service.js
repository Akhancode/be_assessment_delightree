const Order = require("../models/Order");
const { convertToISO } = require("../utils/helper/helperFunctions");

const getSalesAnalytics = async (startDate, endDate) => {
  const salesAnalytics = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: convertToISO(startDate), //"2024-12-01T00:00:00Z"
          $lte: convertToISO(endDate), //"2025-01-31T23:59:59Z",
        },
        status: "completed",
      },
    },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$productDetails.category",
        revenue: {
          $sum: {
            $multiply: ["$products.quantity", "$products.priceAtPurchase"],
          },
        },
        totalRevenue: { $sum: "$totalAmount" },
        completedOrders: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$revenue" },
        completedOrders: {
          $sum: "$completedOrders",
        },
        categoryBreakdown: {
          $push: {
            category: "$_id",
            revenue: "$revenue",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
        completedOrders: 1,
        categoryBreakdown: 1,
      },
    },
  ]);
  return salesAnalytics.length > 0 ? salesAnalytics[0] : null;
};

module.exports = { getSalesAnalytics };
