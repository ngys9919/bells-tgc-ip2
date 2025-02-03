const pool = require('../database');

// GET => Read
// GET a list of databses
async function getDatabases() {
  const [rows] = await pool.query(`SELECT Table_schema AS 'Databases' 
                                    FROM information_schema.TABLES 
                                    GROUP BY table_schema`);
  return rows;
}

module.exports = {
    getDatabases
};