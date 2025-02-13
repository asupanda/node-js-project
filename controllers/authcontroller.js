const userModel=require('../models/user-model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const{generateToken}=require("../utils/generatetoken");
module.exports.registerUser= async function(req,res){
    try{
     let {fullname,email,password}=req.body;
    let user=await  userModel.findOne({email:email});
if(user) return res.status(400).send('User already exists, So you can login now');    
     bcrypt.genSalt(10,function(err,salt){
         bcrypt.hash(password,salt,async function(err,hash){
             if(err) return res.status(500).send('Server Error');
             else{
                 let user= await userModel.create({
                             fullname,
                             email,
                             password: hash
                         });
                         let token= generateToken(user);
                         res.cookie('token',token);
                         req.flash('success', 'Registration successful!');
                         res.redirect('/');
             }
         });
      });
     }catch(err){
         console.log(err.message);
     }
 }
 module.exports.loginUser= async function(req,res){
    try{
        let {email,password}=req.body;
        let user= await userModel.findOne({email:email});
        if(!user) return res.status(400).send('User does not exist');
        bcrypt.compare(password,user.password,function(err,result){
            if(err) return res.status(500).send('Server Error');
            if(!result) return res.status(400).send('Invalid email or Password');
            let token=generateToken(user);
            res.cookie('token',token);
            res.redirect("/shop");
        });
    }catch(err){
        console.log(err.message);
    }
}
module.exports.logout = async function (req, res) {
    console.log("Logging out...");
    res.clearCookie("token", { path: "/", httpOnly: true });
    res.redirect("/"); // Forces EJS to re-render with loggedin = false
};
