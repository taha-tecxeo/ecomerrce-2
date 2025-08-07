const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
        required: true,
        default: 1
      }
    }
  ],
  tot_cost:{
    type:Number,
    default:0
  }
}, { timestamps: true });

module.exports = mongoose.model("cart", cartSchema);
