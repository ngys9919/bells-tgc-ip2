// const { lookup } = require('geoip-lite');
const geoip = require('geoip-lite');

function requireGeolocation() {
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = "207.97.227.239";
    // console.log(ip); // ip address of the user
    // console.log("The IP is %s", geoip.pretty(ip));  
    const geo = geoip.lookup(ip);
    // console.log(geo);
    // console.log(lookup(ip)); // location of the user
    return geo;
}

module.exports = {
    requireGeolocation
};
