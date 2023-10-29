import { getAllCollectioDB, getFindWordDB } from "../DB/WordDB.js";


const getAllCollectioServices = async () => {
  try {
    const [res] = await getAllCollectioDB();
    return res
  } catch (e) {
    throw new Error(e.message);
  }
};


const getFindWordService = async (SearchWord) => {
  try {
    const [res] = await getFindWordDB(SearchWord);
    return res
  } catch (e) {
    throw new Error(e.message);
  }
};


module.exports = { getFindWordService, getAllCollectioServices };