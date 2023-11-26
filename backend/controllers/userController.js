import { insertUsersDB, getUpdateUserTitleDB, chackUserLoginDB, checksIfUsernameExists } from '../services/userServices.js';
import { check, validationResult } from "express-validator";
import { connectToDatabase } from "../db/dbConnect.js"

const insertUserControllerMiddleware = [
  check("email")
    .isEmail().withMessage("Please provide a valid email")
    .matches(/^[a-zA-Z0-9@._-]+$/).withMessage("Email must contain only English letters, numbers, and standard email characters"),
  // Other validation checks can be added here
  check("password", "Please provide a password that is greater than 8 characters").isLength({ min: 8 })
];

const insertUserController = async (req, res) => {
  connectToDatabase();
  const data = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  const user = await checksIfUsernameExists(data);
  if (user) {
    return res.status(400).json({ errors: ['This user already exists'] })
  } else {
    try {
      const success = await insertUsersDB(data);
      if (success) {
        return res.status(201).json({ message: 'User inserted successfully', token: success });
      } else {
        return res.status(400).json({ error: 'User insertion failed' });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

const getUpdateUserTitleController = async (req, res) => {
  try {
    connectToDatabase();
    const data = req.body
    const result = await getUpdateUserTitleDB(data)
    if (result) {
      console.log("The update was successful");
      return res.status(200).json({ message: "The update was successful" });
    }
    return res.status(400).send({
      massage: "Username does not exist, you can register!"
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const chackUserLoginController = async (req, res) => {
  try {
    connectToDatabase();
    const data = req.body
    console.log(data);
    const result = await chackUserLoginDB(data)
    if (result) {
      return res.status(200).send({ message: "You connected to success", token: result.token, title: result.title });
    } else {
      return res.status(400).json({ errors: ['Email or Password is incorrect'] })
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export { insertUserController, insertUserControllerMiddleware, getUpdateUserTitleController, chackUserLoginController };
