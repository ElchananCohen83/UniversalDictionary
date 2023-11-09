const { MongoClient } = require('mongodb');
require('dotenv').config();

// Replace with your MongoDB Atlas connection details
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD; 
const clusterUri = process.env.CLUSTER_URI;
//console.log(username);

const client = new MongoClient(`mongodb+srv://${username}:${password}${clusterUri}`);

async function run() {
  try {
    // Connect to your cluster
    await client.connect();
    
    // Access your database and collection
    const db = client.db('UniversalDictionary');
    //const collection = db.collection('HebrewToEnglish');
    const collection = db.collection('EnglishToHebrew');

    // Query documents and print them
    const documents = await collection.find().toArray();
    //console.log('Documents All in collection:');
    documents.forEach(doc => console.log(doc));


  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

run().catch(console.error);