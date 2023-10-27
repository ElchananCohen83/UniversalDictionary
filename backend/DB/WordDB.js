import MongoClient from "mongodb";
import con from "./config";

const client = new MongoClient(`mongodb+srv://${con.userName}:${con.password}${con.cluster}`);

async function run() {
  try {
    // Connect to your cluster
    await client.connect();
    
    // Access your database and collection
    const db = client.db('UniversalDictionary');
    const collection = db.collection('EnglishToHebrew');
    return collection
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

const collection = run().catch(console.error);


const getAllCollectioDB = async () => {
  try {
    // Query documents and print them
    const documents = await collection.find().toArray();
    return documents;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getFindWordDB = async (SearchWord) => {
  try {
    const query = {
      name: {
        $regex: SearchWord,
        $options: "i" // Use 'i' for case-insensitive matching, remove it for case-sensitive matching
      }
    };
  const result = await collection.find(query);

  // Use toArray to convert the cursor to an array for easier processing
  const documents = await result.toArray();

  if (documents.length === 0) {
      console.log("The word is not found.");
      return null
  } else {
  documents.forEach(document => {
      const value = [document.name, document.value]
      console.log(value);
      return value
    });
  }  
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

module.exports = { getAllCollectioDB, getFindWordDB};
