import { getAllCollectioController, getFindWordController } from "../controllers/wordController";
import express from "express"
const router = express.Router();

//router.get("/", ???);
router.get("/allCollectio", getAllCollectioController);
router.get("/findWord", getFindWordController);

module.exports = router;