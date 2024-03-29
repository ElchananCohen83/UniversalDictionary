import express from "express";
import bodyParser from "body-parser";
import { connectToDatabase } from "./db/dbConnect.js";
import verifyToken from "./middleware/auth_JWT.js";
import userRoutes from "./routes/userRoutes.js";
import wordRoutes from "./routes/wordRoutes.js";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(verifyToken);

app.use("/api/users", userRoutes);
app.use("/api/words", wordRoutes);

connectToDatabase();

export default app;
