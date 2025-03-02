const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
