const router=require('express').Router();
const {signUp,verifyOtp, userExistance} = require('./controllers/userController');
const {UserAdder,userUpdater} = require('./controllers/userAdder');
const { login, tokenVerify } = require('./controllers/userLogin');
const {confession,confessionList,updateEmojis} = require("./controllers/confess");

router.route('/signup').post(signUp);
router.route('/signup/verify').post(verifyOtp);
router.route('/userExists').post(userExistance);
router.route('/userAdder').post(UserAdder);
router.route('/updateUser').post(userUpdater);
router.route('/login').post(login);
router.route("/confess").post(confession);
router.route("/UpdateEmojis").post(updateEmojis);
router.route("/confessionList").get(confessionList);

module.exports=router;