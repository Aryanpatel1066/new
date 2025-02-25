 const { processPayment } = require("../controllers/payment.controller");

module.exports=(app)=>{
 app.post("/ecomm/api/v1/pay",processPayment)
}
 