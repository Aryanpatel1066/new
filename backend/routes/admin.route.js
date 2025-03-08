 const { getTotalUsers, getTotalOrders, getTotalProducts } = require("../controllers/admin.controller");

module.exports = (app)=>{
    app.get("/ecomm/api/v1/admin/users/count", getTotalUsers)
    app.get("/ecomm/api/v1/admin/orders/count", getTotalOrders)
    // app.get("/ecomm/api/v1/admin/products/count", getTotalProducts)
}