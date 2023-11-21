import express from "express"
import bodyParser from "body-parser";
import { connectToDatabase } from "./db/dbConnect.js"
import { getfindWordController, getfindByLetterController } from "./controllers/wordController.js"
import verifyToken from "./middleware/auth_JWT.js";
import router from "./routes/userRoutes.js"
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());
//app.use(verifyToken)

app.use("/api/users", router)

connectToDatabase()

//app.post('/insertWordDB', insertWordController)
app.post('/findWord', getfindWordController)
app.get('/findLetter', getfindByLetterController)


export default app;
