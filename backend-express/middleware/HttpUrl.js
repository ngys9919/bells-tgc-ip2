// This middleware function logs the HTTP method and URL of each request. 
// The next() function is called to pass control to the next middleware function.
function logHttpUrl(req, res, next) {
    console.log(`HOST: ${req.headers.host}, HTTP METHOD: ${req.method}, URL: ${req.originalUrl}, PATH: ${req.path}`);
    next();
}

module.exports = logHttpUrl;
