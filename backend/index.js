import express from "express" 
//import cors from "cors"
 
require('dotenv').config()

const app = express();
const questionsRoutes = require('./routes/WordRoutes')
const usersRoutes = require('./routes/UserRoutes')


const PORT = process.env.PORT || 3001

app.use(express.json())
//app.use(cors())
app.use("/api/questions", questionsRoutes)
app.use("/api/users", usersRoutes)

app.listen(PORT, () => {
    console.log(`server is running in port: ${PORT}`);
  }); 