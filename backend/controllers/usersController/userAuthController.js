import { connectToDatabase } from "../../db/dbConnect.js"
import loginUser from '../../services/users/userAuthServices.js';

const loginUserController = async (req, res) => {
  try {
    connectToDatabase();
    const data = req.body
    const result = await loginUser(data)

    if (result) {
      return res.status(200).json({ message: "You connected to success", token: result.token, title: result.title });
    } else {
      return res.status(400).json({ errors: "Email or Password is incorrect." });
    }

  } catch (error) {
    return res.status(400).json({ errors: error.message });
  }
};

export default loginUserController;