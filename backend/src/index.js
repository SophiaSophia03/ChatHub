import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";

import "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import msgRoutes from "./routes/msg.route.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

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


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})