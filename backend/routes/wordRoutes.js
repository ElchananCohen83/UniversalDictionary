import { Router } from "express";
import {
    getfindWordController,
    getfindByLetterController
} from "../controllers/dictionaryController/wordController.js";


const wordRoutes = Router();

//app.post('/insertWordDB', insertWordController)
wordRoutes.get('/findWord', getfindWordController)
wordRoutes.get('/findLetter', getfindByLetterController)

export default wordRoutes;

