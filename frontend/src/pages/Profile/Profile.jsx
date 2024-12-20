import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";
import userAvatar from "../../assets/images/user.png";

function Profile() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const[selectedImage,setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async() => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await(updateProfile({profilePic:base64Image}))
    }
  };
  return (
    <div className="min-h-screen pt-20 mx-auto rounded-lg ">
    <div className="w-[40vh] sm:w-[60vh] h-auto my-8 mx-auto bg-base-200 rounded-2xl">
      <div className=" flex flex-col justify-center items-center mx-auto p-4 py-8">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-xl text-zinc-500 font-semibold mb-8">
            Your Profile Information
          </p>
        </div>

        <div className="relative">
          <img
            src={selectedImage || authUser.profilePic || userAvatar}
            alt="Profile Image"
            className="size-32 rounded-full object-cover border-4"
          ></img>
          <label
            htmlFor="pic-upload"
            className={`absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-500 ${
              isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
            }`}
          >
            <Camera className="w-7 h-7 text-base-900 bg-zinc-200 rounded-full p-1" />
            <input
              type="file"
              id="pic-upload"
              className="hidden"
              accept="images/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            ></input>
          </label>
        </div>

        <p className="text-md text-zinc-400 mt-4">
          {isUpdatingProfile
            ? "Uploading..."
            : "Click the camera icon to update your profile picture"}
        </p>
      </div>

      <div className="space-y-6 px-0 py-8 mx-8 my-8 flex flex-col gap-4">

        <div className="flex justify-between items-center">
          <div className="lg:text-xl text-lg font-bold text-zinc-700 flex items-center justify-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </div>
          <p className="px-4 bg-base-100 rounded-lg text-xl font-bold">
            {authUser?.fullName}
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="lg:text-xl text-lg font-bold text-zinc-700 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </div>
          <p className="px-4 bg-base-100 rounded-lg text-xl font-bold">
            {authUser?.email}
          </p>
        </div>

      <div className="bg-base-100 rounded-xl p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Account Information</h2>
        <div className="text-xl font-semibold flex flex-col">
          <div className="flex items-center justify-between py-2 border-1 gap-2">
            <span>Member Since:</span>
            <span>{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <hr className="bg-zinc-500" />
          <div className="flex items-center justify-between py-2 border-1 gap-2">
            <span>Account Status:</span>
            <span className="text-green-500">Active</span>
          </div>
        </div>
      </div>


    </div>
    </div>
    </div>
  );
}

export default Profile;
