// This middleware function logs the HTTP method and URL of each request. 
// The next() function is called to pass control to the next middleware function.
function logHttpUrl(req, res, next) {
    console.log(`HTTP method: ${req.method} URL: ${req.url} Path: ${req.path}`);
    next();
}

module.exports = logHttpUrl;
