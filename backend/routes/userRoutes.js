import { Router } from "express";
import {
    insertUserController,
    insertUserControllerMiddleware,
    getUpdateUserTitleController,
    chackUserLoginController
} from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post('/register', insertUserControllerMiddleware, insertUserController)
userRoutes.post('/userTitle', getUpdateUserTitleController)
userRoutes.post('/login', chackUserLoginController)
//router.post('/dashboard', )

export default userRoutes;