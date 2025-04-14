import express from "express";

import {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMIddleware.js";

const router = express.Router();


router.post("/createUser", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)

router.route("/getAll").get(authenticate, authorizeAdmin, getAllUsers);
router.route("/profile")
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile)

router.route("/manageUser/:id")
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById)
export default router;