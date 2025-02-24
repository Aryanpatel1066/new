 const address = require('../controllers/address.controller')
 module.exports = (app)=>{
    //the middleware always for of array
   app.post("/ecomm/api/v1/address/:userId",address.createAddress)
   app.get("/ecomm/api/v1/address/:userId",address.getUserAddresses);
   app.put("/ecomm/api/v1/address/:id",address.updateAddress)

}