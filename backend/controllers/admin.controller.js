const User = require("../models/user.model");
 const Order = require("../models/payment.model");

// Get total users count
exports.getTotalUsers = async (req, res) => {
    try {
        const users = await User.find({}, "name email createdAt").sort({ createdAt: -1 }); // Get name, email, and createdAt
        const count = users.length;

        res.json({ 
            success: true, 
            count, 
            users // Send user details
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch users", error: error.message });
    }
};


// Get total orders count
exports.getTotalOrders = async (req, res) => {
    try {
        const orders = await Order.find({}, "userId amount status createdAt").populate("userId", "name email"); 
        const count = orders.length;

        res.json({ 
            success: true, 
            count, 
            orders // Send order details
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
    }
};


// Get total products count
// exports.getTotalProducts = async (req, res) => {
//     try {
//         const count = await Product.countDocuments();
//         res.json({ success: true, count });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Failed to fetch products count" });
//     }
// };
