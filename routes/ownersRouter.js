const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
require('dotenv').config();


if (process.env.NODE_ENV === 'development') {
    router.post('/create', async function (req, res) {
        let owners=await ownerModel.find();
        if(owners.length>0){
            return res.status(400).send('owners already created so you can not create one');
        }
        let {fullname,email,password}=req.body;
        let createdowner=await  ownerModel.create({
            fullname,
            email,
            password,

        });
        res.send(createdowner);
    });
    }


router.get('/admin', function (req, res) {
    let success=req.flash('success', 'Welcome to the admin page');
    res.render("createproducts");
});
module.exports = router; 
