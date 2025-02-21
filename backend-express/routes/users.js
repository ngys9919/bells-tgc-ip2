const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const logHttpUrl = require('../middleware/HttpUrl');

const app = express();

// (5) Third-party Middleware
// To add functionality to your Express app, you can use third-party middleware. 
// Install the required Node.js module and load it in your app: npm install cookie-parser

const cookieParser = require('cookie-parser');
const easySession = require('easy-session');
const session = require('express-session');
const bodyParser = require('body-parser');

// (5) Middleware for loading the cookie-parsing
app.use(cookieParser());
app.use(session({
  // secret: 'this is a nice secret',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(easySession.main(session));

// (2) Router-level Middleware
// Router-level middleware works similarly to application-level middleware but is bound to an instance of express.Router().

// (2) Middleware for applying logHttpUrl to all routes
router.use(logHttpUrl);

// POST register a new user
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      salutation,
      marketingPreferences,
      country
    } = req.body;

   
    // Register user with the new payload structure
    const userId = await userService.registerUser({
      name,
      email,
      password,
      salutation,
      marketingPreferences,
      country
    });

    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST login a user
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userService.loginUser(email, password);
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     const username = user.name;

//     res.json({ message: "Login successful", token, username });
//   } catch (error) {
//     res.status(401).json({ message: error.message });
//   }
// });
const maxFailedCount = 3; // Max tries, default=5
const forgetFailedMins = 1; // Minutes time the user will be blocked, default=15
const blockList = {};

// Check if ip is still allowed
function isAllowed(ip) {
    return !blockList[ip] || blockList[ip].count < maxFailedCount;
}
// Remove ip from blockList
function successfulAttempt(ip) {
    if(blockList[ip]) {
        if(blockList[ip].timeout) {
            clearTimeout(blockList[ip].timeout);
        }
        delete blockList[ip];
    }
}
// Increment blocklist counter
function failedAttempt(ip) {
    if(!blockList[ip]) {
        blockList[ip] = {
            count: 0
        };
    }
    blockList[ip].count++;
    if(blockList[ip].timeout) {
        clearTimeout(blockList[ip].timeout);
    }
    blockList[ip].timeout = setTimeout(function () {
        delete blockList[ip];
    }, forgetFailedMins * 60 * 1000);

    console.log(ip);
    console.log(blockList[ip].count);
}

async function validateUser(loginuser, cb) {
    try {
        // const { email, password } = req.body;
        const email = loginuser.email;
        const password = loginuser.password;
    
        console.log(email);
        console.log(password);

        if(!email || !password) {
          setImmediate(cb, null, {success:false, message: 'Missing email or password'});
          return;
        }

        const user = await userService.loginUser(email, password);
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const username = user.name;
    
        console.log(user);
        console.log(token);
        console.log(username);

        setImmediate(cb, null, {success: true, message: 'Login successful', token: token, username: username});
        return;
        // res.json({ message: "Login successful", token, username });
      } catch (error) {
        console.log(error);
        const errcode = error.message;
        console.log(errcode);
        // errormsg: 'Wrong username or password'
        setImmediate(cb, null, {success: false, message: 'Wrong username or password', errcode: errcode});
        return;
        // res.status(401).json({ message: error.message });
      }
}

router.post('/login', async function (req, res) {
  if(!isAllowed(req.ip)) { // Check if user is blocked
      const errblock = 'You have been blocked for ' +
          forgetFailedMins + ' minutes';

      res.status(401).json({ message: errblock });
  }
  validateUser(req.body, function(err, valid) {
      if(err) {
        res.status(401).json({ message: err });
      }
      if(valid.success) { // Validation success. Create authorized session.
          const token = valid.token;
          const username = valid.username;  
          successfulAttempt(req.ip); // Clear from blocklist
          res.json({ message: "Login successful", token, username });
      } else {
          const errcode = valid.errcode;
          failedAttempt(req.ip); // Register the failed attempt
          if (blockList[req.ip].count < maxFailedCount) {
            res.status(401).json({ message: valid.errcode });
          } else if (blockList[req.ip].count == maxFailedCount) {
            res.status(401).json({ message: "Failed login attempt" });
          }
      }
  });
});

router.get('/logout', function (req, res) {
    res.json({ message: "Session Logout!" });
});

module.exports = router;
