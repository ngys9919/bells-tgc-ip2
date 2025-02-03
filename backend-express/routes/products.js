const express = require('express');
// const { lookup } = require('geoip-lite');
// const geoip = require('geoip-lite');
const router = express.Router();
const productService = require('../services/productService');
const StatusCode = require('../middleware/StatusCode');
const logHttpUrl = require('../middleware/HttpUrl');

// (2) Router-level Middleware
// Router-level middleware works similarly to application-level middleware but is bound to an instance of express.Router().

// (2) Middleware with no mount path, executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// (2) Middleware sub-stack for /productID/:id
router.use('/productID/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

// (2) Middleware for applying logHttpUrl to all routes
router.use(logHttpUrl);

// (2) Middleware for the StatusCode to router.get route only
// GET all AI-Products products
router.get('/', StatusCode, async (req, res) => {
  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // const ip = "207.97.227.239";
  // console.log(ip); // ip address of the user
  // console.log("The IP is %s", geoip.pretty(ip));  
  // const geo = geoip.lookup(ip);
  // console.log(geo);
  // console.log(lookup(ip)); // location of the user
  try {
    // const products = await productService.getAllProducts(geo);
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product by Product Code ID
router.get('/productCodeID/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await productService.getProductByProductCodeID(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET product by Product Code ID
router.get('/productID/:id', async (req, res) => {
  try {
    // console.log(req.params.id);
    const product = await productService.getProductByProductID(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// fetch(`${import.meta.env.VITE_API_URL}/api/products/product-data?sortBy=${sortBy}&sortOrder=${sortOrder}&filterAIproducts=${selectedProduct}`)
// GET product data for product table with Server-side sort, Server-side filter
router.get('/product-data/', async (req, res) => {
  try {
    // Get all query parameters
    const queryParams = req.query;
    const sortBy = queryParams.sortBy;
    const sortOrder = queryParams.sortOrder;
    const filterAIproducts = queryParams.filterAIproducts;

    // same as this statement
    // let { sortBy, sortOrder, filterAIproducts } = req.query;

    // console.log(sortBy); // column.id
    // console.log(sortOrder); // asc or desc
    // console.log(filterAIproducts); // 0=AI-Products, 1=AI-Books, 2=AI-Image, 3=AI-Music, 4=AI-Video

    // console.log(req.query);
    // const product = await productService.getProductByProductData(req.query); // this wont work!
    const product = await productService.getProductByProductData(sortBy, sortOrder, filterAIproducts);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// axios.get(`${import.meta.env.VITE_API_URL}/api/products/productTitle?searchBy=${productTitle}`);
// GET product data with productTitle query string search
router.get('/productTitle', async (req, res) => {
  try {
    // Get all query parameters
    // const queryParams = req.query;
    // const searchBy = queryParams.searchBy;
    // const filterAIproducts = queryParams.filterAIproducts;

    // this is the same as let searchBy = req.query.searchBy
    // syntax: object destructuring
    // same as this statement
    let { searchBy, filterAIproducts } = req.query;

    // console.log(searchBy); // query string
    // console.log(filterAIproducts); // 0=AI-Products, 1=AI-Books, 2=AI-Image, 3=AI-Music, 4=AI-Video

    // console.log(req.query);
    // const product = await productService.getProductByProductTitle(req.query); // this wont work!
    const product = await productService.getProductByProductTitle(searchBy, filterAIproducts);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// axios.get(`${import.meta.env.VITE_API_URL}/api/products/productTitle?searchBy=${productTitle}`);
// GET product data with productTitle query string search
router.get('/productPrice', async (req, res) => {
  try {
    // Get all query parameters
    // const queryParams = req.query;
    // const searchByMinPrice = queryParams.searchByMinPrice;
    // const searchByMaxPrice = queryParams.searchByMaxPrice;
    // const filterAIproducts = queryParams.filterAIproducts;

    // this is the same as let searchBy = req.query.searchBy
    // syntax: object destructuring
    // same as this statement
    let { searchByMinPrice, searchByMaxPrice, filterAIproducts } = req.query;

    // console.log(searchByMinPrice); // minimum price
    // console.log(searchByMaxPrice); // maximum price
    // console.log(filterAIproducts); // 0=AI-Products, 1=AI-Books, 2=AI-Image, 3=AI-Music, 4=AI-Video

    // console.log(req.query);
    // const product = await productService.getProductByProductPrice(req.query); // this wont work!
    const product = await productService.getProductByProductPrice(searchByMinPrice, searchByMaxPrice, filterAIproducts);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// GET all AI-Books products
router.get('/books', StatusCode, async (req, res) => {
  try {
    const products = await productService.getAllProductsBooks();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all AI-Image products
router.get('/image', StatusCode, async (req, res) => {
  try {
    const products = await productService.getAllProductsImage();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all AI-Music products
router.get('/music', StatusCode, async (req, res) => {
  try {
    const products = await productService.getAllProductsMusic();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all AI-Video products
router.get('/video', StatusCode, async (req, res) => {
  try {
    const products = await productService.getAllProductsVideo();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET product details
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//GET => Read
// GET a single product
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await productService.getProductById(req.params.id);
//     res.json(product);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

//POST => Create
// POST a single product
router.post('/create', async (req, res) => {
  try {
    let {type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName} = req.body;
    
    // basic validation: 
    // make sure that bookTitle, isbn_13 and firstName must be present
    if (!firstName || !isbn_13 || !title) {
      return res.status(400)
      .json({ "error": "The field(s) is incomplete: isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName" })
    }

    const product = await productService.createProductByBody(type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//PUT => Update by replace
// PUT a single product
router.put('/:id/edit', async (req, res) => {
  try {
    let {type_id, isbn_10, isbn_13, title, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName} = req.body;
    
    // basic validation: 
    // make sure that bookTitle, isbn_13 and firstName must be present
    if (!firstName || !isbn_13 || !title) {
      return res.status(400)
      .json({ "error": "The field(s) is incomplete: isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName" })
    }

    const product = await productService.updateProductByIdBody(req.params.id, product_type, isbn_10, isbn_13, bookTitle, pageCount, priceTag, image, format, promotion, badge, discount, review, firstName, lastName);
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
