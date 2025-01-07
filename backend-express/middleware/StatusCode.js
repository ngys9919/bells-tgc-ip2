// This middleware function logs the response status code.
// The next() function is called to pass control to the next middleware function.
function logStatusCode(req, res, next) {
    // console.log(`Response status: ${res.statusCode}`);
    next();
}

module.exports = logStatusCode;