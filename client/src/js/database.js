import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create a variable and set it to asyncronously await the opening of the database. Replace the items in all caps
  const DB_VAR = await openDB('jate', 1);

  // Create a variable for the transaction
  const TX_VAR = DB_VAR.transaction('jate', 'readwrite');

  // Create a variable for the store
  const STORE_VAR = TX_VAR.objectStore('jate');

  // Create a variable named "request" and have it perform the update
  const request = STORE_VAR.put({ id: 1, value: content });

  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  
  const DB_VAR = await openDB('jate', 1);

  // Create a variable for the transaction
  const TX_VAR = DB_VAR.transaction('jate', 'readonly');

  // Create a variable for the store
  const STORE_VAR = TX_VAR.objectStore('jate');

  const request = STORE_VAR.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  // Check if a variable is defined and if it is, return it.
  return result?.value;
};

initdb();