const express = require('express');
// const router = express.Router();
const emailController = require('../controllers/email.controller');
module.exports=(app)=>{
app.post('/ecomm/api/v1/send-otp', emailController.sendOTP);
app.post('/ecomm/api/v1/verify-otp', emailController.verifyOTP);
app.post('/ecomm/api/v1/reset-password', emailController.resetPassword);
}
 