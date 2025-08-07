const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    delivery_date:{
        type:Date,
        default:Date.now

    },delivery_address:{
        type:String,
        default:"Not given",
        required:true

    }
}, { timestamps: true });

module.exports = mongoose.model("checkout", checkoutSchema);
