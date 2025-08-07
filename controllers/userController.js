// controllers/userController.js


const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 


const createUser = async (req, res) => {
    const { username, email, password, systemName, role } = req.body;
    try {
        const existingUser = await User.findOne({ email }); // ✅ findOne & User (capital U)
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            systemName,
            role: role || 'user'
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message }); // ✅ 500 for server error
    }
};

// ✅ Get User by ID
const getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId); // ✅ Fixed capital U
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ "User Details": user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// ✅ Update User
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, password, systemName, role } = req.body;

    if (!username || !email || !password || !systemName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.username = username;
        user.email = email;
        user.systemName = systemName;
        user.role = role || user.role;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Delete User
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Export all controllers
module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
};
