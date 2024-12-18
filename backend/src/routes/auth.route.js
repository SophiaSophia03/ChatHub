import express from "express";
import {signup, login, logout, updateProfile, checkAuth} from "../controllers/auth.controller.js"
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup );

router.post("/login",login );

router.post("/logout",logout );

router.put("/update-profile",authenticateUser, updateProfile);

router.get("/check", authenticateUser, checkAuth);

export default router;