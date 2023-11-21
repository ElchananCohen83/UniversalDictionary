import { model } from '../models/wordSchema.js';

async function checkCollection(data) {
  let collection = null
  const firstLetter = data.original.charAt(0);
  if ((firstLetter >= 'A' && firstLetter <= 'Z') || (firstLetter >= 'a' && firstLetter <= 'z')) {
    collection = 'En_To_Heb'
  } else {
    collection = 'Heb_To_En'
  }
  return collection
}


async function getfindByLetterDB(data) {
  const collection = await checkCollection(data)
  const Dictionary = await model(collection)
  const letter = data.original.charAt(0)
  try {
    const query = {
      original: { $regex: new RegExp(`^${letter}`, 'i') }
    };

    console.log(query);
    // Query documents and print them
    const documents = await Dictionary.find(query).exec(); // Use Mongoose's .find() and .exec()
    console.log(documents);
    return documents;
  } catch (e) {
    return new Error(e.message);
  }
}


async function getfindWordDB(data) {
  const collection = await checkCollection(data)
  const Dictionary = await model(collection)

  try {
    const query = {
      original: {
        $regex: data.original,
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


export { getfindByLetterDB, getfindWordDB, checkCollection };


// async function insertWordDB(data) {
//   const collection = await checkCollection(data)
//   console.log(collection);
//   Dictionary = await model(collection)

//   try {
//     const dictionary = new Dictionary({
//       original: data.original,
//       translation: data.translation
//     });
//     const result = await dictionary.save();
//     console.log(`${result._id} document inserted.`);
//     return;
//   } catch (e) {
//     throw new Error('User insertion failed.');
//   }
// }