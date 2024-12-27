import cloudinary from "cloudinary";
import Message from "../models/messages.model.js";
import User from "../models/users.model.js";

export const getUsers = async(req,res) => {
  try {
    const loggedInUserId = req.user._id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    return res.status(201).json(otherUsers);
  } catch (error) {
    console.log("Error in getUsers controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getMessages = async(req,res) => {
  try {
    const {id} = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({$or:[{senderId:senderId, receiverId:id},{senderId:id, receiverId:senderId}]});

    return res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const sendMessage = async(req,res) => {
  try {
    const {text, image} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl,
    });
    await newMessage.save();

    // Realtime functionallity here to get messages using socket.io

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}