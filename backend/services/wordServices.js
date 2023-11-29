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


async function getfindWordDB(data) {
  const collection = await checkCollection(data)
  const Dictionary = await model(collection)

  const questionInLanguage = collection === 'En_To_Heb'
    ? { $regex: new RegExp(`^\\b${data.original}\\b`, 'i') }
    : { $regex: new RegExp(`^${data.original}`) };

  try {
    const query = {
      original: questionInLanguage
    };

    const result = await Dictionary.find(query).exec();

    const modifiedResult = result.map(item => {
      const { dottedOriginal, ...rest } = item;
      return { original: dottedOriginal, ...rest };
    });

    if (result.length === 0) {
      console.log("The word is not found.");
      return null;
    } else {
      return result;
    }
  } catch (err) {
    console.error('An error occurred:', err);
    return null; // Return null or an error message in case of an error
  }
}


async function getfindByLetterDB(data) {
  const collection = await checkCollection(data)
  const Dictionary = await model(collection)
  const letter = data.original.charAt(0)
  try {
    const query = {
      original: { $regex: new RegExp(`^${letter}`, 'i') }
    };

    // Query documents and print them
    const documents = await Dictionary.find(query).exec(); // Use Mongoose's .find() and .exec()
    console.log(documents.length);
    return documents;
  } catch (e) {
    return new Error(e.message);
  }
}
export { getfindByLetterDB, getfindWordDB, checkCollection };