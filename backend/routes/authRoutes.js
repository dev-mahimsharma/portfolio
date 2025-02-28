const {registerController,loginController,logoutController}=require('../controller/auth.controller.js')
const isLoggedIn =require('../utilities/isLoggedIn.js')
const router =require('express').Router();

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/logout').get(isLoggedIn,logoutController);


module.exports=router;
