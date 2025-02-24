const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true, minlength: 5, maxlength: 10 },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10,15}$/.test(v); // Ensures phone is 10-15 digits
        },
        message: "Phone number must be between 10 and 15 digits",
      },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
