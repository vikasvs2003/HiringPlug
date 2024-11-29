import express from "express";

import { register,login, updateProfile,logout } from "../controllers/user.controller.js";
import isAuthenticated from "../midleware/isAuthenticated.js";
import { singleUpload } from "../midleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/updateProfile").post(isAuthenticated,singleUpload,updateProfile);
router.route("/logout").get(logout);


export default router;