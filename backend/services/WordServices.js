import { getAllCollectioDB, getFindWordDB } from "../DB/WordDB.js";


const getAllCollectioServices = async () => {
  try {
    return await getQuestionAllCollectio();
  } catch (e) {
    throw new Error(e.message);
  }
};


const getFindWordService = async (SearchWord) => {
  try {
    const [res] = await getQuestionFindWord(SearchWord);
    return res
  } catch (e) {
    throw new Error(e.message);
  }
};


module.exports = { getFindWordService, getAllCollectioServices };