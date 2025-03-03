const Order = require("../models/Order");

const getTopSellingProducts = async (limit) => {
  return await Order.aggregate([
    { $unwind: "$products" },
    {
      $group: {
        _id: "$products.productId",
        totalSold: { $sum: "$products.quantity" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        name: "$productDetails.name",
        totalSold: 1,
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: limit },
  ]);
};

module.exports = { getTopSellingProducts };
