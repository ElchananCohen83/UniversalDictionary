import { getfindByLetterDB, getfindWordDB } from "../../services/dictionary/wordServices.js";

const getfindWordController = async (req, res) => {
  try {
    const data = req.query;
    if (data.original !== '') {
      const result = await getfindWordDB(data);
      if (result) {
        return res.status(200).json({ data: result });
      } else {
        return res.status(400).json({ error: 'Word not found' });
      }
    } else {
      return res.status(400).json({ error: 'You must enter a value in the search' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send an error response
  }
};


const getfindByLetterController = async (req, res) => {
  try {
    const data = req.query;
    if (data.original !== '') {
      const result = await getfindByLetterDB(data);
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ error: 'You must enter a letter in the search' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send an error response
  }
};

export { getfindWordController, getfindByLetterController };