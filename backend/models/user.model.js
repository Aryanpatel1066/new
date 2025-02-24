const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        lowercase: true,
        unique: true
    },
    userType: {
        type: String,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"],
      },
    password: {
        type: String,
        required: true,
    },
    otp: { type: String },
    otpExpires: { type: Date }

},{timestamps:true,versionKey:false});
module.exports = mongoose.model("user",userSchema);