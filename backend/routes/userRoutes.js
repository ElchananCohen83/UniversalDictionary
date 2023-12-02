import { Router } from "express";
import verifyToken from "../middleware/auth_JWT_endpoint.js";
import loginUserController from '../controllers/usersController/userAuthController.js';
import {
    validationUserMiddlewareController,
    insertUserController,
    updateUserTitleController,
    getNamesByTokenController,
    getAllUsersController,
    getUserController,
    UserByCriteriaController,
    profileUpdateController,
    deleteProfileController
} from '../controllers/usersController/userDBOperationsController.js';

const router = Router();

router.get("/verifyToken", verifyToken)
router.post('/register', validationUserMiddlewareController, insertUserController)
router.post('/userTitle', updateUserTitleController)
router.post('/login', loginUserController)
router.get("/avatar", getNamesByTokenController);
// router.get("/users", getAllUsersController); //Get all users
// router.get("/me", getUserController) //Get current user info by email
// router.post("/findUsers", UserByCriteriaController) //Search users by first name, last name, email, username (?)
// router.get("/profile", getUserController) // Get single user by email
// router.put("/profileUpdate",validationUserMiddlewareController, profileUpdateController) // Update user title
// router.put("/deleteProfile", deleteProfileController) // Get single user by email

export default router;