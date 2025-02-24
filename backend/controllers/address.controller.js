const Address = require("../models/address.model");
const mongoose = require('mongoose')
// ✅ Create Address
exports.createAddress = async (req, res) => {
  try {
    const { street, city, state, country, pincode, phone } = req.body;
    const {userId} = req.params;
    if (!street || !city || !state || !country || !pincode || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = new Address({ street, city, state, country, pincode, phone, userId });
    await newAddress.save();

    res.status(201).json({ message: "Address created successfully!", address: newAddress });
  } catch (error) {
    console.error("❌ Error creating address:", error);
    res.status(500).json({ message: "Failed to create address" });
  }
};

// ✅ Get All Addresses for a User
exports.getUserAddresses = async (req, res) => {
    try {
      const userId = req.params.userId.toString().trim(); // Convert to string
      console.log("Received userId:", userId); // Debugging log
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log("❌ Invalid User ID format:", userId);
        return res.status(400).json({ message: "Invalid User ID" });
      }
  
      const addresses = await Address.find({ userId });
  
      res.status(200).json({
        message: "Addresses fetched successfully",
        addresses: addresses.length > 0 ? addresses : [],
      });
    } catch (error) {
      console.error("❌ Error fetching addresses:", error);
      res.status(500).json({ message: "Failed to fetch addresses" });
    }
  };
  

// ✅ Update Address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
 
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id},
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address updated successfully!", address: updatedAddress });
  } catch (error) {
    console.error("❌ Error updating address:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
};

// ✅ Delete Address
// exports.deleteAddress = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.userId;

//     const deletedAddress = await Address.findOneAndDelete({ _id: id, userId });

//     if (!deletedAddress) {
//       return res.status(404).json({ message: "Address not found" });
//     }

//     res.status(200).json({ message: "Address deleted successfully!" });
//   } catch (error) {
//     console.error("❌ Error deleting address:", error);
//     res.status(500).json({ message: "Failed to delete address" });
//   }
// };
