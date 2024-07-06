/* global db */
// MongoDB Script to drop a collection

// Define database and collection names
const databaseName = 'test';
const collectionName = 'emailDetails';

// Use the database
db = db.getSiblingDB(databaseName);

// Drop the collection
db.getCollection(collectionName).drop();

// Print success message
print(`Collection '${collectionName}' dropped successfully.`);
