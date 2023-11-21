import { getfindByLetterDB, getfindWordDB, checkCollection } from "../services/wordServices.js";


const getfindWordController = async (req, res) => {
  try {
    const data = req.query;
    //checkCollection(data)
    const result = await getfindWordDB(data);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response
  }
};


const getfindByLetterController = async (req, res) => {
  try {
    const data = req.query;
    //checkCollection(data)
    const result = await getfindByLetterDB(data);
    res.json(result); // Send the documents as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response
  }
};


export { getfindWordController, getfindByLetterController };


// const insertWordController = async (req, res) => {
//   try {
//     const data = req.query;
//     //checkCollection(data)
//     const result = insertWordDB(data);
//     console.log(req.query);
//     res.json(result)
//   } catch (error) {
//     res.status(500).json({ error: error.message }); // Send an error response
//   }
// };