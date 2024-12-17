import mongoose from "mongoose";

const msgSchema = mongoose.Schema({
  senderId:{
    type:String,
    required:true,
    unique:true,
  },
  receiverId:{
    type:String,
    required:true,
  },
  text:{
    type:String,
  },
  image:{
    type:String,
  },
},{timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;