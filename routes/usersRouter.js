const express=require('express');
const router=express.Router();
const {registerUser}=require('../controllers/authcontroller');
const {loginUser}=require('../controllers/authcontroller');
const {logout}=require('../controllers/authcontroller');
router.get('/',function(req,res){
    res.send('users router working fine');
});

router.post('/register', registerUser );
router.post('/login',loginUser);
router.get("/logout",logout);
module.exports=router;