import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import "./lib/db.js"
import authRoutes from "./routes/auth.route.js"

const app = express();
import cookieParser from "cookie-parser";
const PORT = process.env.PORT;

app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})