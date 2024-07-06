/* global db */
// MongoDB Script to find all documents in a collection with pagination and sorting

// Define database and collection names
const databaseName = 'test';
const collectionName = 'emailDetails';

// Pagination parameters
const pageSize = 10; // Number of documents per page
const pageNumber = 1; // Page number (1-based index)
const skipCount = (pageNumber - 1) * pageSize; // Number of documents to skip

// Use the database
db = db.getSiblingDB(databaseName);

// Define sorting criteria (optional)
const sortCriteria = {
  // Example: Sort by 'fieldA' ascending
  fieldA: 1,
};

// Count total documents in the collection
const totalCount = db.getCollection(collectionName).countDocuments();

// Find documents with pagination and sorting
const cursor = db
  .getCollection(collectionName)
  .find(
    // Filter criteria (optional)
    {
      // Example: Filter by field value
      // fieldA: value,
    },
    // Projection (optional)
    {
      // Example: Include specific fields
      // fieldA: 1,
      // fieldB: 1,
      // _id: 0,
    },
  )
  .sort(sortCriteria) // Apply sorting
  .skip(skipCount) // Skip documents based on pagination
  .limit(pageSize); // Limit number of documents per page

// Iterate over the cursor to process each document
cursor.forEach((doc) => {
  printjson(doc); // Output each document (modify as needed)
});

// Close the cursor
cursor.close();

// Calculate total pages
const totalPages = Math.ceil(totalCount / pageSize);
print(`Total pages: ${totalPages}`);
