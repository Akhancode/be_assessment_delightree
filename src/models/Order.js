const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const OrderSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  customerId: {
    type: String,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
