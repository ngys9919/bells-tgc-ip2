const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');
const authenticateToken = require('../middleware/UserAuth');
const logHttpUrl = require('../middleware/HttpUrl');

// (2) Router-level Middleware
// Router-level middleware works similarly to application-level middleware but is bound to an instance of express.Router().

// (2) Middleware for applying logHttpUrl to all routes
router.use(logHttpUrl);

// (2) Middleware for applying the authenticateToken to all routes
router.use(authenticateToken);

// GET cart contents
router.get('/', async (req, res) => {
  try {
    const cartContents = await cartService.getCartContents(req.user.userId);
    res.json(cartContents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT bulk update cart
router.put('/', async (req, res) => {
  try {
    const cartItems = req.body.cartItems; // Expects an array of items with productId and quantity
    // console.log(req.user.userId);
    // console.log(cartItems);
    const result = await cartService.updateCart(req.user.userId, cartItems);
    // console.log(result);
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
