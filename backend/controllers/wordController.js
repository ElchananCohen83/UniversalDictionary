import { getFindWordService, getAllCollectioServices } from "../services/WordServices.js";

const getFindWordController = async (req, res) => {
  try {
    const result = await getFindWordService();
    res.send(result);
  } catch (e) {
    throw new Error(e.message);
  }
};
const getAllCollectioController = async (req, res) => {
  const { SearchWord } = req.params;
  try {
    const result = await getAllCollectioServices(SearchWord);
    res.send(result);
  } catch (e) {
    throw new Error(e.message);
  }
};


module.exports = {getFindWordController, getAllCollectioController}