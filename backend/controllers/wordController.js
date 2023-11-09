import { getInsertWordDB, getSelectAllCollectionDB, getfindWordDB } from "../action/wordFunction.js";


const getInsertWordController = async (req, res) => {
  try {
    const data = req.query;
    const result = getInsertWordDB(data);
    console.log(req.query);
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response
  }
};


const getfindWordController = async (req, res) => {
  try {
    const data = req.query;
    const result = await getfindWordDB(data);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response
  }
};


const getSelectAllController = async (req, res) => {
  try {
    const documents = await getSelectAllCollectionDB();
    res.json(documents); // Send the documents as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response
  }
};


export { getInsertWordController, getfindWordController, getSelectAllController };