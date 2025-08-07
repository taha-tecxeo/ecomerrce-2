const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();
const authRoutes=require('./routers/authRoute')
const productRoutes = require('./routers/productRoute');
const uploadRoute=require('./routers/uploadRoute');

app.use('/api/upload',uploadRoute);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

mongoose.connect('mongodb://localhost:27017/userauth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

module.exports = app;
