import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

// DEFINE THE ROUTER
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").get(loginUser);

export default router;
