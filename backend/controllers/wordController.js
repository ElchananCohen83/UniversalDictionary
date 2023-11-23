import { getfindByLetterDB, getfindWordDB, checkCollection } from "../services/wordServices.js";

const getfindWordController = async (req, res) => {
  try {
    const data = req.query;
    const result = await getfindWordDB(data);
    if (result) {
    return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ error: 'Word not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send an error response
  }
};


const getfindByLetterController = async (req, res) => {
  try {
    const data = req.query;
    const result = await getfindByLetterDB(data);
    return res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send an error response
  }
};

export { getfindWordController, getfindByLetterController };