import React, { useState } from "react";
import ChatIcon from "../../assets/images/chat.png";
import { Link } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

function Navbar() {
 const {logout,authUser} =  useAuthStore();
  return (
    <header className="bg-base-200 fixed top-0 z-40 w-full">
      <div className="container mx-auto lg:px-16 px-8 py-4 h-20">
        <div className="flex justify-between flex-row">
          <Link to={"/"} className="flex items-center gap-4 hover:opacity-80">
            <img src={ChatIcon} alt="Chat Icon" className="w-[40px]"></img>
            <h1 className="text-2xl font-bold text-center">ChatHub</h1>
          </Link>
          <div className="flex items-center gap-8 sm:gap-8">
            <Link to={"/setting"} className="flex items-center gap-2 hover:opacity-80">
              <Settings />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to={"/profile"} className="flex items-center gap-2 hover:opacity-80">
                  <User />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button className="flex items-center gap-2 hover:opacity-80" onClick={logout}>
                  <LogOut />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
