import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import msgRoutes from "./routes/msg.route.js"
import {app,server } from "./lib/socket.js"
dotenv.config();

const PORT = process.env.PORT;
const __dirName = path.resolve();

// Middleware to parse JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}));

app.use("/api/auth", authRoutes);
app.use("/api/msg", msgRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirName, "../frontend/dist")));

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirName, "../frontend", "dist", "index.html"))
  })
}


server.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})