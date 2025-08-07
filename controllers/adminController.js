const ProductModel = require('../models/productModel');

const createProductbyadmin = async (req, res) => {
    // try{
    const { title, description, price, category,quantity } = req.body;
    const product = new ProductModel({
        title,
        description,
        price,
        category,quantity
    })
    await product.save();
    res.status(201).json({ product });
    // }
    // catch(err){
    res.status(500).json({ error: "server error" });

    // }



};
const getAllProducts = async (req, res) => {
  try{
    let products;

    if (req.user && req.user.role === "user") {
      products = await Product.find({ status: "Approved" });
    } else if (req.user && req.user.role === "admin") {
      products = await Product.find(); 
    } else {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json({ products });

  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const updateproductByadmin=async(req,res)=>{
    const {id}=req.params;
    const updateData=req.body;
    try{
        const product=await Product.findByIdAndUpdate(
            id,
            updateData,
            {new:true}
        );
        if(!product){
            return res.status(404).json({error:"Product not found"});
        }
     res.status(200).json({message:"Product Updated Succesfully",product});
    }
    catch(err){
        res.status(500).json({error:"Server error"});
    }

};
const deleteproductByadmin=async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteproduct=await Product.findByIdAndDelete(id);
        if(!deleteproduct){
            return res.status(404).json({error:"Product not found"});
        }
        return res.status(200).json({message:"Product Deleted Succesfully"});
    }
    catch(err){
        res.status(500).json({error:"Server error"});
    }

};

const checkoutModel= require('../models/ordersModel');
// const isDelivered=async(req,res) => {
//     const {checkoutId}=req.params;
//     try{
//         const updated=checkoutModel.findByIdAndUpdate(
//             checkoutId,
//             {status:"Delivered"},
//             {new:true}
//         );
//         if(!updated){
//             return res.status(404).json({error:"checkout not Found"});
//         }
//         res.status(200).json({message:"Order Marked as Delivered",order:updated});
//     }
//     catch(err){
//         return res.status(500).json({error:"Server error"});
//     }
// };





module.exports={getAllProducts ,updateproductByadmin,deleteproductByadmin,createProductbyadmin};