const express=require('express');
const router=express.Router();
const upload=require('../config/multer-config');
const productModel=require('../models/product-model');
router.post('/create',upload.single('image'),async function(req,res){
    try{
    const {image,name,bgcolor,panelcolor,textcolor,discount,price}=req.body;
    let product=await productModel.create({
        image:req.file.buffer,
        name,
        bgcolor,
        panelcolor,
        textcolor,
        discount,
        price,
    })
    req.flash('success','Product created successfully');
    res.redirect("/owners/admin");
    }catch(err){
        res.send(err.message);
    }
});
module.exports=router;