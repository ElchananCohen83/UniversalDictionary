import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { connectToDatabase } from "./db/dbConnect.js"
import { getInsertWordController, getfindWordController, getSelectAllController } from "./controllers/wordController.js"
import { insertUserController, insertUserControllerMiddleware, chackUserLoginController } from "./controllers/userController.js"

dotenv.config({
  path: './.env'
});

const app = express();
const port = process.env.PORT || 3001

const url = `localhost:${port}`

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

connectToDatabase()

app.post('/register', insertUserControllerMiddleware, insertUserController)
app.get('/login', chackUserLoginController)

//app.post('/insertWordDB', getInsertWordController)
app.post('/find', getfindWordController)
app.get('/selectAllCollection', getSelectAllController)


app.listen(port, () => {
  console.log(`server is running in port: ${port}`);
});