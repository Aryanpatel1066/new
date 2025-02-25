 const { processPayment, getOrders } = require("../controllers/payment.controller");

module.exports=(app)=>{
 app.post("/ecomm/api/v1/pay",processPayment)
 app.get("/ecomm/api/v1/orders/:userId",getOrders); // New route for fetching user orders

}
 