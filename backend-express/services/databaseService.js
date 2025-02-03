const databaseData = require('../data/databaseData');

async function getDatabases() {
  const databases = await databaseData.getDatabases();
  if (!databases) {
    throw new Error('Databases not found');
  }
  return databases;
}

module.exports = {
    getDatabases
};

