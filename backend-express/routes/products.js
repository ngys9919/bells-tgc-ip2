const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const StatusCode = require('../middleware/StatusCode');
const logHttpUrl = require('../middleware/HttpUrl');

// Apply the logHttpUrl middleware to all routes
router.use(logHttpUrl);

// Apply the StatusCode middleware to router.get route only
// GET all products
router.get('/', StatusCode, async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET => Read
// GET a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//POST => Create
// POST a single product
router.post('/create', async (req, res) => {
  try {
    let {isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName} = req.body;
    
    // basic validation: 
    // make sure that bookTitle, isbn_13 and firstName must be present
    if (!firstName || !isbn_13 || !bookTitle) {
      return res.status(400)
      .json({ "error": "The field(s) is incomplete: isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName" })
    }

    const product = await productService.createProductByBody(isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//PUT => Update by replace
// PUT a single product
router.put('/:id/edit', async (req, res) => {
  try {
    let {isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName} = req.body;
    
    // basic validation: 
    // make sure that bookTitle, isbn_13 and firstName must be present
    if (!firstName || !isbn_13 || !bookTitle) {
      return res.status(400)
      .json({ "error": "The field(s) is incomplete: isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName" })
    }

    const product = await productService.updateProductByIdBody(req.params.id, isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//DELETE => Delete
// DELETE a single product
router.delete('/:id/delete', async (req, res) => {
  try {
    const product = await productService.deleteProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
