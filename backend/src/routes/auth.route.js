import express from "express";
import {signup, login, logout,updateProfile} from "../controllers/auth.controller.js"
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup );

router.post("/login",login );

router.post("/logout",logout );

router.purge("/update-profile",authenticateUser, updateProfile)

export default router;