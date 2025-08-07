const cartModel = require('../models/cartModel');
const productModel = require('../models/productModel');

const AddToCart = async (req, res) => {
  const userid = req.user.id;
  const { productid, quantity}=req.body;

  
  try {
    const product = await productModel.findById(productid);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await cartModel.findOne({ userid });

    if (!cart) {
      cart = new cartModel({
        userid,
        items: [{ productid, quantity }],
        tot_cost: product.price * quantity 
      });
    } else {
      const itemIndex = cart.items.findIndex(item =>
        item.productid.toString() === productid
      );

      if (itemIndex > -1) {
        return res.status(400).json({ error: "Product already in cart" });
      }

      cart.items.push({ productid, quantity });

      let total = 0;
      for (const item of cart.items) {
        const prod = await productModel.findById(item.productid);
        if (prod) {
          total += prod.price * item.quantity;
        }
      }

      cart.tot_cost = total;
    }

    await cart.save();
    res.status(201).json({ message: "Product added to cart", cart });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { AddToCart };
