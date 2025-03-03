const Order = require("../models/Order");
const Product = require("../models/Product");
const { convertToISO } = require("../utils/helper/helperFunctions");
const { v4: uuidv4 } = require("uuid");

const getSalesAnalytics = async (startDate, endDate) => {
  const cacheKey = `salesAnalytics:${startDate}:${endDate}`;

  let getCachedValue = null;


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
const createNewOrder = async (input) => {
  try {
    const { customerId, products } = input;
    const productIds = products.map((p) => p.productId);

    const productDetails = await Product.aggregate([
      {
        $match: {
          _id: {
            $in: productIds,
          },
        },
      },
      {
        $project: {
          _id: 1,
          price: 1,
        },
      },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              k: {
                $toString: "$_id",
              },
              v: "$price",
            },
          },
        },
      },
      {
        $addFields: {
          customerId: customerId,
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerData",
        },
      },

      {
        $project: {
          _id: 0,
          productId_priceObj: {
            $arrayToObject: "$data",
          },
          isCustomerValid: {
            $gt: [
              {
                $size: "$customerData",
              },
              0,
            ],
          },
        },
      },
    ]);
    const { isCustomerValid, productId_priceObj } = productDetails[0] || {};
    if (!isCustomerValid) {
      throw "Invalid customer Id ";
    }

    const totalAmount = products.reduce(
      (sum, product) =>
        sum + productId_priceObj[product.productId] * product.quantity,
      0
    );
    let productsWithPrice = products.map((productObj) => {
      productObj.priceAtPurchase =
        productId_priceObj[productObj.productId] * productObj.quantity;
      return productObj;
    });

    const newOrder = new Order({
      _id: uuidv4(),
      customerId,
      products: productsWithPrice,
      totalAmount,
      orderDate: new Date(),
      status: "pending",
    });

    await newOrder.save();

    console.log("Order created successfully:", newOrder);
    return newOrder;
  } catch (error) {
    throw new Error(`Error placing order : ${error}`);
  }
};

module.exports = { getSalesAnalytics, createNewOrder };
