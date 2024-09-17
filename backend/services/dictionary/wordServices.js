import { model } from '../../models/wordSchema.js';

async function checkCollection(data) {
  let collection = null
  const firstLetter = data.word.charAt(0);
  if ((firstLetter >= 'A' && firstLetter <= 'Z') || (firstLetter >= 'a' && firstLetter <= 'z')) {
    collection = 'EnglishToHebrew'
  } else {
    collection = 'HebrewToEnglish'
  }
  return collection
}


// async function getfindWordDB(data) {
//   const collection = await checkCollection(data)
//   const Dictionary = await model(collection)

//   const questionInLanguage = collection === 'En_To_Heb'
//     ? { $regex: new RegExp(`^\\b${data.word}\\b`, 'i') }
//     : { $regex: new RegExp(`^${data.word}`) };

//   try {
//     const query = {
//       word: questionInLanguage
//     };

//     const result = await Dictionary.find(query).exec();

//     const modifiedResult = result.map(item => {
//       const { dottedOriginal, ...rest } = item;
//       return { original: dottedOriginal, ...rest };
//     });

//     if (result.length === 0) {
//       console.log("The word is not found.");
//       return null;
//     } else {
//       return result;
//     }
//   } catch (err) {
//     console.error('An error occurred:', err);
//     return null; // Return null or an error message in case of an error
//   }
// }

async function getfindWordDB(data) {
  const collection = await checkCollection(data);
  const Dictionary = await model(collection);
  
  // const questionInLanguage = collection === 'EnglishToHebrew'
  //   ? { $regex: new RegExp(`^\\b${data.word}\\b`, 'i') }
  //   : { $regex: new RegExp(`^${data.word}`) };

  const questionInLanguage = data.word
  try {
    const query = {
      word: questionInLanguage
    };
    
    const result = await Dictionary.findOne(query).exec();

    // const modifiedResult = result.map(item => {
    // console.log(item.word);
      
    //   return { word: item.word, transcription: item.transcription };
    // });

    if (result === null) {
      console.log("The word is not found.");
      return null;
    } else {
      return [result];
    }
  } catch (err) {
    console.error('An error occurred:', err);
    return null;
  }
}



async function getfindByLetterDB(data) {
  const collection = await checkCollection(data)
  const Dictionary = await model(collection)
  const letter = data.word.charAt(0)
  try {
    const query = {
      word: { $regex: new RegExp(`^${letter}`, 'i') }
    };

    // Query documents and print them
    const documents = await Dictionary.find(query).exec(); // Use Mongoose's .find() and .exec()
    console.log(documents);
    return documents;
  } catch (e) {
    return new Error(e.message);
  }
}
export { getfindByLetterDB, getfindWordDB, checkCollection };