import express from "express"
import path from "path";
import bodyParser from "body-parser";
import { connectToDatabase } from "./db/dbConnect.js"
import verifyToken from "./middleware/auth_JWT.js";
import userRoutes from "./routes/userRoutes.js"
import wordRoutes from "./routes/wordRoutes.js"

import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());
app.use(verifyToken)

app.use("/api/users", userRoutes)
app.use("/api/words", wordRoutes)

app.use(express.static(path.join(__dirname, 'frontend')));


app.get('/nagishli_beta.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'frontend', 'nagishli_beta.js'));
});


connectToDatabase()

export default app;
