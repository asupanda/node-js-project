"use strict";

var express = require('express');

var router = express.Router();

var isLoggedin = require('../middleware/isLoggedin');

var Product = require('../models/product-model');

var userModel = require('../models/user-model');

router.get('/', function (req, res, next) {
  res.render('index', {
    error: req.flash('error'),
    loggedin: false
  });
}); // In your route handler

router.get('/shop', function _callee(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.find({}));

        case 3:
          products = _context.sent;
          // Assuming you have a Product model
          res.render('shop', {
            products: products
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).send('Error fetching products');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get("/addtocart/:productid", isLoggedin, function _callee2(req, res) {
  var user, product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: req.user.email
          }));

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Product.findById(req.params.productid));

        case 6:
          product = _context2.sent;
          user.cart.push(product);
          _context2.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          req.flash('success', 'Product added to cart');
          res.redirect("/shop"); // Redirect to cart after adding item

          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0.message);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.get("/cart", isLoggedin, function _callee3(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: req.user.email
          }).populate("cart"));

        case 3:
          user = _context3.sent;

          if (!(!user || !user.cart)) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.render("cart", {
            user: user,
            products: []
          }));

        case 6:
          res.render("cart", {
            user: user,
            products: user.cart
          });
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);
          res.redirect("/shop");

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.get("/removefromcart/:productid", isLoggedin, function _callee4(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: req.user.email
          }));

        case 3:
          user = _context4.sent;
          // Remove item by ID instead of the whole product object
          user.cart.pull(req.params.productid);
          _context4.next = 7;
          return regeneratorRuntime.awrap(user.save());

        case 7:
          req.flash('success', 'Product removed from cart');
          res.redirect("/cart");
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0.message);
          res.redirect("/cart");

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = router;