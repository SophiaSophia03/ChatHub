import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { getMessages, getUsers, sendMessage } from "../controllers/msg.controller.js";

const router = express.Router();

router.get("/users",authenticateUser, getUsers );

router.get("/:id",authenticateUser, getMessages );

router.post("/send-msg/:id",authenticateUser,sendMessage );

export default router;