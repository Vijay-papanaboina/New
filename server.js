const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const cors = require('cors');
require('dotenv').config(); // Load environment variables

app.use(cors());
const port = 3000;

// Body parser middleware
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.YOUR_KEY_ID, // Replace with your Razorpay Key ID
    key_secret: process.env.YOUR_KEY_SECRET // Replace with your Razorpay Key Secret
});

// Route to create an order
app.post('/create-order', async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount, // amount in smallest currency unit (paise in INR)
    };
    try {
        const order = await razorpay.orders.create(options);
        res.json(order); // Send the order details to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating order");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

