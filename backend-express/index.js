const express = require('express');
const path = require("path");
const hbs = require('hbs');
const helpers = require('handlebars-helpers');
const wax = require('wax-on');
const cors = require('cors');
require('dotenv').config();

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
  newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return newDate;   
}

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

// Inform express that we are using HBS as view engine
// (aka template engine)
// Set up Handlebars engine with Express
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// (4) Middleware for enabling use of static files

// c.Multiple Directories
// You can serve static files from multiple directories by calling express.static multiple times:
// Express will look for files in the order the static directories are defined.

// a.Basic Usage
// The express.static function takes a root directory from which to serve static assets. 
// Here is a simple example:

// Serve static files for Express / Handlebars (e.g., CSS, images)
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// In this example, files in the public directory can be accessed via URLs like 
// http://localhost:3000/images/kitten.jpg.

// d.Virtual Path Prefix
// To create a virtual path prefix for files served by express.static, specify a mount path:

app.use('/static', express.static('public'));

// Now, files in the public directory can be accessed via URLs like 
// http://localhost:3000/static/images/kitten.jpg.

// (4) Middleware for enabling use of static files
// Set up static file serving for React build folder
// the first parameter is the folder to put all the static files like image files, css files

// b.Using Absolute Paths
// If you run your Express app from a different directory, it's safer to use the absolute path of the directory you want to serve:
app.use(express.static(path.join(__dirname, 'frontend-react/build')));

// (4) Middleware for enabling form (i.e forms submitted by the browser) processing
app.use(express.urlencoded({extended:false}));

// app.set('view engine', 'hbs');
// app.use(express.static('public'));
// app.use(express.urlencoded({extended:false}));


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

// (1) Application-level Middleware
// Application-level middleware is bound to an instance of express using app.use() and app.VERB().

// (1) Middleware with no mount path, executed for every request
app.use((req, res, next) => {
  let user_now = Date.now();
  // console.log('Time1:', user_now);
  let now_date = new Date( parseInt(user_now));
  // console.log('Time2:', now_date);
  let now_datetime = convertUTCDateToLocalDate(new Date(now_date)); // this work
  // console.log('Time3:', now_datetime);
  now_datetime = now_datetime.toLocaleString();
  console.log('Time:', now_datetime);
  next();
});

// (4) Built-in Middleware
// Express provides built-in middleware functions such as express.static, express.json, and express.urlencoded:

// (4) Middleware for JSON parsing
app.use(express.json());
// (4) Middleware for enabling cross origin resources sharing
app.use(cors());

// (3) Error-handling Middleware
// Error-handling middleware is defined with four arguments: (err, req, res, next).

// (3) Middleware for 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// main - Shop Management -> Site Administration
// admin();

// Routes
app.use('/api/databases', databasesRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);

// Catch-all route to serve the React app (React handles routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend-react/build', 'index.html'));
});

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
