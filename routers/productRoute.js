const express = require('express');
const router = express.Router();
const productcontroller = require('../controllers/productController');
const usermiddleware = require('../middlewares/userMiddleware');
const cartcontroller=require('../controllers/cartController');
const checkoutcontroller=require('../controllers/ordersController');
const admincontroller=require('../controllers/adminController');
const paymentcontroller=require('../controllers/paymentController');




// const { createProduct } = require('../controllers/productController');



router.post('/create', usermiddleware.verifyToken, usermiddleware.isvendor, productcontroller.createProduct);
router.put("/status/:id",usermiddleware.verifyToken,usermiddleware.isadmin,productcontroller.updateProduct);
router.post('/createadmin', usermiddleware.verifyToken, usermiddleware.isadmin,admincontroller.createProductbyadmin);
router.get('/getall',usermiddleware.verifyToken,admincontroller.getAllProducts)
router.put('/update/:id',usermiddleware.verifyToken,usermiddleware.isadmin,admincontroller.updateproductByadmin);
router.delete('/delete/:id',usermiddleware.verifyToken,usermiddleware.isadmin,admincontroller.deleteproductByadmin);
router.post('/cart/add',usermiddleware.verifyToken,usermiddleware.isuser,cartcontroller.AddToCart);
router.post('/checkout',usermiddleware.verifyToken,usermiddleware.isuser,checkoutcontroller.checkout);
router.post('/payment',usermiddleware.verifyToken,usermiddleware.isuser,paymentcontroller.makePayment);




module.exports = router;

