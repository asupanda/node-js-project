const express = require('express');
const router = express.Router();
const isLoggedin = require('../middleware/isLoggedin');
const Product = require('../models/product-model');
const userModel = require('../models/user-model');
router.get('/', function(req, res, next) {
    res.render('index', { error: req.flash('error'), loggedin:false });
});

// In your route handler
router.get('/shop', async (req, res) => {
    try {
      const products = await Product.find({}); // Assuming you have a Product model
     
      res.render('shop', { products: products });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching products');
    }
  });
  router.get("/addtocart/:productid", isLoggedin, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        let product = await Product.findById(req.params.productid);
        
        user.cart.push(product);
        await user.save();
        
        req.flash('success', 'Product added to cart');
        res.redirect("/shop"); // Redirect to cart after adding item
    } catch (err) {
        console.log(err.message);
    }
});

  router.get("/cart", isLoggedin, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        
        if (!user || !user.cart) {
            return res.render("cart", { user: user, products: [] }); // Ensures products is always defined
        }

        res.render("cart", { user: user, products: user.cart });
    } catch (err) {
        console.log(err.message);
        res.redirect("/shop");
    }
});
router.get("/removefromcart/:productid", isLoggedin, async function (req, res) {
  try {
      let user = await userModel.findOne({ email: req.user.email });

      // Remove item by ID instead of the whole product object
      user.cart.pull(req.params.productid); 
      
      await user.save();
      req.flash('success', 'Product removed from cart');
      res.redirect("/cart");
  } catch (err) {
      console.log(err.message);
      res.redirect("/cart");
  }
});


module.exports = router;
