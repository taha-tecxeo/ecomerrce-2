const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['Electronics', 'Stationary', 'Furniture']
    },
    status: {
        type: String,
        enum: ["Pending", "Rejected", "Approved"],
        default: "Pending"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    image:String
}, { timestamps: true });
module.exports = mongoose.model("product", productSchema);