import  { Dictionary } from '../db/wordSchema.js';


async function getInsertWordDB(data) {
    try {
      const dictionary = new Dictionary({
        original: data.original,
        translation: data.translation
      });
      const result = await dictionary.save();
      console.log(`${result._id} document inserted.`);
      return;
    } catch (e) {
        throw new Error('User insertion failed.');
      }
    }
  

    async function getSelectAllCollectionDB() {
      try {
        // Query documents and print them
        const documents = await Dictionary.find().exec(); // Use Mongoose's .find() and .exec()
        console.log(documents);
        return documents;
      } catch (e) {
        return new Error(e.message);
      }
    }


    async function getfindWordDB(word) {
      try {
        const query = {
          original: {
            $regex: word.original,
            $options: "i" // Use 'i' for case-insensitive matching, remove it for case-sensitive matching
          }
        };
        // Create a Mongoose model query
        const result = await Dictionary.find(query).exec();
    
        if (result.length === 0) {
          console.log("The word is not found.");
          return null;
        } else {
          console.log(result);
          return result;
        }
      } catch (err) {
        console.error('An error occurred:', err);
        return null; // Return null or an error message in case of an error
      }
    }
    

  export { getInsertWordDB, getSelectAllCollectionDB, getfindWordDB };