/* global db */
// MongoDB Script to update a document in a collection

// Define database and collection names
const databaseName = 'test';
const collectionName = 'emailDetails';

// Use the database
db = db.getSiblingDB(databaseName);

// Define filter (to find the document to update)
const filter = {
  from: 'sender1@example.com', // Example filter criteria
};

// Define new values to update
const updateDoc = {
  $set: {
    to: 'newrecipient@example.com', // New value for 'to' field
    subject: 'New Subject', // New value for 'subject' field
    text: 'Updated text content', // New value for 'text' field
    html: '<p>Updated HTML content</p>', // New value for 'html' field
    attachment: [
      // New value for 'attachment' field (array of strings)
      'https://example.com/newfile.pdf',
      'https://example.com/newimage.jpg',
    ],
    'o:tag': ['newTag'], // New value for 'o:tag' field (array of strings)
    'o:tracking': true, // New value for 'o:tracking' field
    'o:tracking-clicks': 'yes', // New value for 'o:tracking-clicks' field
    'o:tracking-opens': true, // New value for 'o:tracking-opens' field
    'o:require-tls': false, // New value for 'o:require-tls' field
    'o:skip-verification': true, // New value for 'o:skip-verification' field
  },
};

// Update the document
const result = db.getCollection(collectionName).updateOne(filter, updateDoc);

// Check the result of the update operation
if (result.modifiedCount > 0) {
  print(`Document updated successfully.`);
} else {
  print(`No document found matching the filter criteria.`);
}
