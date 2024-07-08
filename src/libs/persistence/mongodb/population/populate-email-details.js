/* global db */
// MongoDB Script for collection creation and population

// Function to generate UUID v4 manually
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Define database name and collection name
const databaseName = 'test';
const collectionName = 'emailDetails';

// Use the database
db = db.getSiblingDB(databaseName);

// Create 'emailDetails' collection with basic validation and UUID
db.createCollection(collectionName, {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['id', 'from', 'to', 'subject'], // Include 'id' as required
      properties: {
        id: { bsonType: 'string' }, // Define 'id' as a string
        from: { bsonType: 'string' },
        to: { bsonType: 'string' },
        cc: { bsonType: ['string', 'null'] },
        bcc: { bsonType: ['string', 'null'] },
        subject: { bsonType: 'string' },
        text: { bsonType: ['string', 'null'] },
        attachment: {
          bsonType: ['array', 'null'],
          items: { bsonType: 'string' },
        },
        'o:tag': { bsonType: ['array', 'null'], items: { bsonType: 'string' } },
        'o:tracking': { bsonType: 'bool' },
        'o:tracking-clicks': { enum: ['yes', 'no', 'htmlonly'] },
        'o:tracking-opens': { bsonType: 'bool' },
        'o:require-tls': { bsonType: 'bool' },
        'o:skip-verification': { bsonType: 'bool' },
      },
    },
  },
});

// Example data with manually generated UUIDs and multiple attachments
const exampleData = [
  {
    id: generateUUID(), // Generate UUID for 'id' manually
    from: 'mailgun@sandboxcdb5332a3b1440e6943a9c428a85cedc.mailgun.org',
    to: 'samuelquisol@gmail.com',
    subject: 'Subject 1',
    text: 'This is the first test email',
    attachment: [
      'https://example.com/file1.pdf',
      'https://example.com/image1.jpg',
    ],
  },
  {
    id: generateUUID(), // Generate UUID for 'id' manually
    from: 'mailgun@sandboxcdb5332a3b1440e6943a9c428a85cedc.mailgun.org',
    to: 'hrpe.jejfh87@juaxe.com',
    subject: 'Subject 2',
    text: 'This is the second test email',
    attachment: ['https://example.com/file2.docx'],
  },
  {
    id: generateUUID(), // Generate UUID for 'id' manually
    from: 'mailgun@sandboxcdb5332a3b1440e6943a9c428a85cedc.mailgun.org',
    to: 'elipeforero21@gmail.com',
    subject: 'Subject 3',
    text: 'This is the third test email',
    attachment: [
      'https://example.com/file3.zip',
      'https://example.com/image2.png',
    ],
  },
];

// Insert example data into the collection
db[collectionName].insertMany(exampleData);

// Print success message
print(`Collection '${collectionName}' created and data inserted successfully.`);
