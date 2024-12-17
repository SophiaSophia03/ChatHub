import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const dbURI = process.env.MONGO_URI;

// MongoDB connection setup
export const connectdb = async () => {
  await mongoose.connect(dbURI);
};
connectdb()
  .then((res) => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
