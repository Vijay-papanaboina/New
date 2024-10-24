const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const cors = require('cors');
require('dotenv').config(); // Load environment variables

app.use(cors());
const port = 3000;

// Body parser middleware
app.use(express.json());

// Serves static files from the 'public' folder
app.use(express.static('public'));

// Creates Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.YOUR_KEY_ID,
    key_secret: process.env.YOUR_KEY_SECRET
});

// Route to create an order
app.post('/create-order', async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount, 
    };
    try {
        const order = await razorpay.orders.create(options);
        res.json(order); // Sends the order details to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating order");
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

