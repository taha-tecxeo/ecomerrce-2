const express = require('express');
const { loginUser } = require('../controllers/authController');
const { registerUser } = require('../controllers/authController');
const { updateUser, deleteUser, getUser, createUser } = require('../controllers/userController');
const {verifyToken,isadmin} = require('../middlewares/userMiddleware');
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', registerUser);
router.put('/update/:userId',verifyToken,isadmin, updateUser);
router.delete('/delete/:userId',verifyToken,isadmin, deleteUser);
router.get('/get/:userId',verifyToken,isadmin, getUser);
router.post('/create',verifyToken,isadmin, createUser);

module.exports = router;