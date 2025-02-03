const express = require('express');
const router = express.Router();
const databaseService = require('../services/databaseService');

//GET => Read
// GET a list of databases
router.get('/', async (req, res) => {
  try {
    const databases = await databaseService.getDatabases();
    res.json(databases);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
