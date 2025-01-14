const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL Database connected (pool-aieshop2) !");

// const { createConnection } = require('mysql2/promise');

// let connection = mysql.createConnection({
//   'host': process.env.DB_HOST,
//   'user': process.env.DB_USER,
//   'database': process.env.DB_NAME_EDS,
//   'password': process.env.DB_PASSWORD
// })

// console.log("MySQL Database connected (connection) !");

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME_EDS,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// console.log("MySQL Database connected (pool-eds) !");

module.exports = pool;

// module.exports = {
//   pool,
//   connection
// };

// module.exports = {
//   pool,
//   pool2
// };
