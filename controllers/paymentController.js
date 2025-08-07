const orderModel = require('../models/ordersModel');
const paymentModel = require('../models/paymentModel');

const makePayment = async (req, res) => {
  try {
    const { orderId, pay_type } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Checkout Order not Found" });
    }

    const existingPayment = await paymentModel.findOne({ orderId });
    if (existingPayment) {
      return res.status(400).json({ error: 'Payment already made for this order' });
    }

    const payment = new paymentModel({
      orderId,
      pay_type,
      pay_status: "Paid",
      paid_at: new Date()
    });

    await payment.save();

    res.status(200).json({
      message: "Payment Successful",
      orderId: orderId,
      pay_type: payment.pay_type,
      pay_status: payment.pay_status,
      paid_at: payment.paid_at
    });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { makePayment };
