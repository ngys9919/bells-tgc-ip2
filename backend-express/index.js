const express = require('express');
const path = require("path");
const hbs = require('hbs');
const helpers = require('handlebars-helpers');
const wax = require('wax-on');
const cors = require('cors');
require('dotenv').config();

// make sure this comes AFTER dotenv config
const databasesRouter = require('./routes/databases');
const productsRouter = require('./routes/products');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const adminRoutes = require('./routes/admin');

const pool = require('./database');
// const connection = require('./database');

// const admin = require('./admin');

const app = express();
// Register handlebars helpers using handlebars-helpers
helpers({
  'handlebars': hbs.handlebars,  // Connect the helpers to hbs
});

// Register custom helpers (for #extends and #block) using wax-on
wax.on(hbs.handlebars);  // Enable wax-on for additional Handlebars features
wax.setLayoutPath('./views/layouts');


// Set up Handlebars engine with Express
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// app.set('view engine', 'hbs');
// app.use(express.static('public'));
// app.use(express.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}));

// wax.on(hbs.handlebars);
// wax.setLayoutPath('./views/layouts');

// require in handlebars and their helpers
// const helpers = require('handlebars-helpers');
// tell handlebars-helpers where to find handlebars
// helpers({
//     'handlebars': hbs.handlebars
// })


hbs.handlebars.registerHelper("link", function(text, url) {
  let url2 = hbs.handlebars.escapeExpression(url),
      text2 = hbs.handlebars.escapeExpression(text)
      
 return new hbs.handlebars.SafeString("<a href='" + url2 + "'>" + text2 +"</a>");
});

hbs.handlebars.registerHelper('attr', function(name, data) {
  if(typeof target === 'undefined') target = "";

  let result = ' ' + name + '="' + data +  '" ';

  return new hbs.handlebars.SafeString(result);
});


// Middleware
// Middleware for JSON parsing
app.use(express.json());
app.use(cors());

// main - Shop Management -> Site Administration
// admin();

// Routes
app.use('/api/databases', databasesRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);

// Handlebars route for SSR Order Management Module
app.get("/orders1", (req, res) => {
  res.render("orders", { title: "Orders Management" });
});

// Example route: Orders
app.get('/orders2', (req, res) => {
  const orders = [
      { name: 'Order 1' },
      { name: 'Order 2' },
      { name: 'Order 3' },
  ];
  res.render('orders', { orders });
});

// Basic Route

// https://<server url>/
// https://<server url>/?success=true
// https://<server url>/?canceled=true

app.get('/', (req, res) => {
  let { success, canceled } = req.query;

  if (success == 'true') {
    res.json({ message: "Stripe transaction is successful!" });
  } else if (canceled == 'true') {
    res.json({ message: "Stripe transaction is canceled!" });
  } else {
    res.json({ message: "Welcome to the API" });
  }
  
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
