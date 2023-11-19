import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { connectToDatabase } from "./db/dbConnect.js"
import { getfindWordController, getfindByLetterController } from "./controllers/wordController.js"
import { insertUserController, insertUserControllerMiddleware, chackUserLoginController } from "./controllers/userController.js"
import verifyToken from "./middleware/auth_JWT.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 3001

const url = `localhost:${port}`

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(verifyToken)

connectToDatabase()

app.post('/register', insertUserControllerMiddleware, insertUserController)
app.post('/login', chackUserLoginController)

//app.post('/insertWordDB', insertWordController)
app.post('/findWord', getfindWordController)
app.get('/findLetter', getfindByLetterController)

app.listen(port, () => {
  console.log(`server is running in port: ${port}`);
});