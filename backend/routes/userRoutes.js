import { Router } from "express";
import {
    insertUserController,
    insertUserControllerMiddleware,
    getUpdateUserTitleController,
    chackUserLoginController
} from "../controllers/userController.js";

const router = Router();

router.post('/register', insertUserControllerMiddleware, insertUserController)
router.post('/userTitle', getUpdateUserTitleController)
router.post('/login', chackUserLoginController)
//router.post('/dashboard', )

export default router;