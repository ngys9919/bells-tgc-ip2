const express = require('express');
const path = require("path");
const hbs = require('hbs');
const helpers = require('handlebars-helpers');
const wax = require('wax-on');
const cors = require('cors');
require('dotenv').config();
const csrfHeader = require('./middleware/csrf-header');

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

// FE1-XSS: Cross-Site Scripting => client-side attack
// Cross-site scripts attack by executing a malicious script in the targeted person's web
// browser as if the script was part of the website. There's a place somwhere
// on the website where user input wasn't properly handled when the page was
// rendered. Attackers take advanatge of the mistake to trick the application
// into executing their own scripts.

// You may think XSS isn't that harmful because it's just a script running in
// the browser. If so, you aren't thinking broadly enough. Here are some things
// that can happen if your application is hit with an XSS attack:

// 1.Defacing and content manipulation
// 2.Session hijacking
// 3.Keylogging and other types of information stealing
// 4.Request forgery
// 5.Installation of malicious programs

// The most common XSS attack vectors tend to be session hijacking and request 
// forgery because they potentially offer the most monetary gain for attackers.
// There are three different types of XSS: reflected, stored, and DOM.
// You'll learn how to protect your web application with various methods and principles.

// 1. XSS Protection by Defining CSP Header

// You can also use the Content Security Policy (CSP) header on browsers to
// defend against XSS. The aim of this header is to specify where scripts on the
// site can originate from. Attackers can inject links to scripts stored on some
// other server, but those scripts won't be excuted because they aren't on the
// whitelist. It's a good idea to limit the site to serving up content only from the
// site itself. A basic header to specify this policy is easy:

// Content-Security-Policy: default-src 'self'

// We can set the same header by defining the following middleware in our stack:

// Middleware for Content-Security-Policy header
app.use(function (req, res, next) {
  res.header('Content-Security-Policy', "default-src 'self'");
  next();
})

// For a more nuanced CSP header setup, I recommend you use a module
// designed for ease of use, such as helmet-csp 

// (https://github.com/helmetjs/csp)

// It allows defining the headers in a readable manner and sniffs the
// user-agent to determine the proper header to set.

// Basic usage is simple:

// var csp = require('helmet-csp');

// app.use(csp({
//     defaultSrc: ["'self'"]
// }));

// Advanced usage is also easy and modular by extending it with various options:

const csp = require('helmet-csp');
app.use(csp({
    // Specify directives as normal
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ['style.com'],
    imgSrc: ['img.com', 'data:'],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',

    // Set to an empty array to allow nothing through
    objectSrc: [],

    // Set to true if you only want browsers to report errors, not block them
    reportOnly: false,

    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,

    // Set to true if you want to disable CSP on Android.
    disableAndroid: false,

    // Set to true if you want to force buggy CSP in Safari 5.1 and below.
    safari5: false
}));

// If the application has to include scripts from other locations, such as tracking
// and feedback modules, you will need to list the possible locations in the
// header. This can quickly grow into a headache. This is why you can use the
// CSP header in a report only mode, which makes the testing and development
// much easier.

// References:

// https://developer.mozilla.org/en-US/docs/Security/CSP/Using_Content_Security_Policy

// https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet


// (5) Third-party Middleware
// To add functionality to your Express app, you can use third-party middleware. 
// Install the required Node.js module and load it in your app: npm install cookie-parser

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const csurf = require('csurf');

// (5) Middleware for loading the cookie-parsing
app.use(cookieParser());
app.use(session({
  secret: 'this is a nice secret',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: false}));

// FE2-CSRF: Cross-Site Request Forgery => client-side attack
// Cross-site request forgery, also known as one-click attack or session riding, 
// is an client-side attack that makes unauthorized requests on the behalf of a trusted
// user. Whereas XSS (Cross-Site Scripting) exploits the user's trust, CSRF exploits the site's trust in 
// the user's browser.

// 1. CSRF Protection by Synchronize Your Token

// The most common CSRF protection is randomly generating a token for the 
// form or session and always including it as part of a POST request. Every request
// is validated by comparing the submitted value with the expected token value.
// If the values match, the request is valid.

// There are several modules to choose from, but we'll take a look at csurf 

// (https://github.com/expressjs/csurf), which used to be part of express

// It took just two lines of code to set up protection from CSRF. While the
// attacker can construct and send a POST request, he or she won't be able to
// set a valid _csrf token.

// Fortunately, csurf handles the heavy lifting and allows you to send the token
// as a _csrf field in the POST or GET request. You can also use the HTTP header 
// X-CSRF-Token.

// You're not finished yet. You should add logging to keep track of malicious
// activity against your site. csurf provides a specific error code you can use in
// your logging code.

// This method of CSRF protection is easy to implement and effective, but it requires
// the application to save the state into the session. This is troublesome if the
// application grows big enough. Depending on the session storage system you're
// using, it can take up too much memory or cause issues in clusters if sessions
// keep going to the same machine.
// app.use(csurf()); // Include csurf middleware

// This method of CSRF protection simply moves the location of the token from the session to the
// cookie as you swutch from the server-side dfense to client-side defense. Instead
// of taking up storage, you now take up bandwidth.
app.use(csurf({cookie: true})); // Include csurf middleware, with cookie option

// Synchronized token patterns are the most commonly used method to prevent
// CSRF, nut there are other ways that don't require extra tokens.


// 2. CSRF Protection by Determination of Referer/Origin Headers

// There may be a reason why you don't want to use tokens for CSRF protection,
// such as having a stateless setup or not wanting to use a lot of resources.
// Perhaps the application doesn't have strict security requirements. For any of
// these situations, you can just use the standard information the browser
// includes in a typical request.

// Modern browsers send Referer and Origin headers with requests when navigating
// through links or submitting forms on a web page. They give the application
// information about which page the request originated from and can be used 
// for both tracking and CSRF protection. You can look at the headers to determine
// if the form did originate on your site.

// Attackers can spoof headers if they're creating the requests, but it's pretty
// much impossible to do so when submitting a request via the victim's browser.
// These headers can be checked for consistency since if the requests originated
// from a different domain, the browser will tell you that upfront.

// On an important note, the Referer header isn't sent when the request originates
// from an HTTPS site. The Origin header was specifically created to mitigate that
// shortcoming, so you should prefer to use that.

// (2) Middleware for applying csrfHeader to all routes
// This just checks for hostname and port.
// If the hostname or port differs from localhost:3000, the application will throw errors.
app.use(csrfHeader({
  hostname: 'localhost',
  port: '3000'
}));

// Middleware for CSRF Error Handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err) // some other error
  }

  // handle CSRF token errors here

  // Besides just saying that we had a mismatch
  // we should log some useful information about the request here
  // like the user and referrer and origin headers of the request
  // for example
  console.warn('CSRF token mismatch');

  res.status(403);
  res.send('form tampered with');
})

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
app.get('/csrf', function (req, res, next) {
  let form = '<form method="POST" action="/add">' +
            '<input type="hidden" name="_csrf" value="' +
            req.csrfToken() + '" />' + // add hidden token field
            '<input type="text" name="name" placeholder="name" />' +
            '<input type="text" name="value" placeholder="value" />' +
            '<input type="submit" value="submit" />' +
            '</form>';
  res.send(form);
});

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
