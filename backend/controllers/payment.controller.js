const stripe = require("stripe")('sk_test_51QtUH7ITbzACmJQ8oy7MLQLHZ5MO6PfEVgzt9EyMBzMU5Lv3fg5vrCE5LmrF6npuxbpAEUvy42L3LoVDNaZl0lD700Jx1AzxRE');
const Payment = require("../models/payment.model");

exports.processPayment = async (req, res) => {
    try {
        console.log("Received Payment Request:", req.body);

        const { amount, userId, paymentMethodId } = req.body;

        if (!amount || !userId || !paymentMethodId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create Stripe Payment Intent with automatic payment method handling
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true, // Automatically select available methods
                allow_redirects: "never", // Prevent Stripe from requiring a return_url
            },
        });

        console.log("Payment Intent Created:", paymentIntent);

        // Store Payment in Database
        const newPayment = new Payment({
            userId,
            amount,
            paymentId: paymentIntent.id,
            status: paymentIntent.status,
            createdAt: new Date(),
        });

        await newPayment.save();
        console.log("Payment Stored in DB:", newPayment);

        res.status(200).json({
            success: true,
            message: "Payment successful",
            paymentId: paymentIntent.id,
            status: paymentIntent.status,
        });

    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Payment failed", error: error.message });
    }
};
exports.getOrders = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a route parameter

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch previous orders for the user
        const orders = await Payment.find({ userId }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No previous orders found" });
        }

        // res.status(200).json({ success: true, orders });
        res.status(200).json({ 
            success: true, 
            orders: orders.length ? orders : [], 
            message: orders.length ? "Orders retrieved successfully" : "No orders found"
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
};