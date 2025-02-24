 const authMw = require("../middleware/auth.mw")
const userController = require("../controllers/auth.controller")
// const authMw = require("../middlewares/auth.mw")
module.exports = (app)=>{
    //the middleware always for of array
    app.post("/ecomm/api/v1/auth/signup",[authMw.verifySignupBody],userController.signup)
    app.post ("/ecomm/api/v1/auth/signin",[authMw.verifySignInBody],userController.signin)

}