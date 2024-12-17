import { generateToken } from "../lib/utils.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Check the required fields.
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the password length is less than 6.
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long!" });
    }

    // Check if email already exists.
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Hashing the password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user.
    const newUser = new User({
      fullName: fullName,
      password: hashedPassword,
      email: email,
    });

    // Generating the JWT Token here!
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        message: "Congratulations! You Signed up Successfuly",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check the required fields.
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if email already exists.
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordCorrect) {
      generateToken(existingUser._id, res);
      return res.status(201).json({
        message: "Congratulations! Login successful",
      });
    } else {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async(req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0});
    return res.status(201).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateProfile = async(req,res)=> {

}