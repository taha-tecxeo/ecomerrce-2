const productModel = require('../models/productModel');
const checkoutModel = require('../models/ordersModel');

const checkout = async (req, res) => {
    const { productid,count=1,delivery_date,delivery_address} = req.body;
    const userid = req.user.id;

    try {
        const product = await productModel.findById(productid);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (product.quantity < parseInt(count)) {
            return res.status(400).json({
                error: "Insufficient stock",
                available: product.quantity,
                requested: parseInt(count)
            });
        }

        product.quantity -= parseInt(count);
        
        await product.save();

        const checkout = new checkoutModel({
            userid,
            items: [
                {
                    productid: product._id,
                    quantity: parseInt(count),
                
                }
            ],
            delivery_date: delivery_date || Date.now(),
           delivery_address: delivery_address || "not given"

        });

        await checkout.save();
        res.status(200).json({
            message: "Checkout successful",
            product: product.title,
            remainingStock: product.quantity,
            delivery_date: checkout.delivery_date,
           delivery_address: checkout.delivery_address
            
        });

    } catch (err) {
        console.error("Checkout error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
module.exports = { checkout };
