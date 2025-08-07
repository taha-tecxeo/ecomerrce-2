

const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, quantity, url } = req.body;

    const image = req.file?.path;
    console.log("File received:", req.file);

    const product = new Product({
      title,
      description,
      price,
      category,
      quantity,
      image: url
    });

    await product.save();

    res.status(201).json({ message: 'Product created with cloud image', product });

  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

module.exports = { createProduct };


// module.exports = { createProductWithCloudImage };




const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("productId", id);
  console.log("status", status);

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!product) {

      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product status updated", product });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createProduct, updateProduct };