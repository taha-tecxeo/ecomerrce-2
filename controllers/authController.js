// const User = require('../models/usermodel');
const User=require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password, systemName, role } = req.body;
    if (!username || !email || !password || !systemName) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({ email });
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
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
    if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      'your_jwt_secret_key',
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser, registerUser };
