import React, { useState } from "react";
import ChatIcon from "../../assets/images/chat.png";
import { Eye, EyeOff, Key, Loader, Mail, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import Lottie from "lottie-react"
import animation from "../../assets/animation/animation.json"

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setshowPassword] = useState(false);
  const {signup,isSigningUp} = useAuthStore();

  const validateForm = () => {

  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className="min-h-screen flex flex-col lg:flex-row ">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-16 ml-16">
        <div className="w-full mb-8">
          {/* logo and text */}
          <div className="text-center mb-8">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex items-center justify-center">
                <img src={ChatIcon} alt="Chat Icon" className="w-[15%]"></img>
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className=" text-lg font-normal text-slate-500">
                Get started with your free account
              </p>
            </div>
          </div>
          {/* sign up form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative flex flex-row justify-center items-center">
                <div className="absolute insert-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  className={`input input-bordered pl-10 w-full`}
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                ></input>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative flex flex-row justify-center items-center">
                <div className="absolute insert-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  className={`input input-bordered pl-10 w-full`}
                  type="text"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                ></input>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative flex flex-row justify-center items-center">
                <div className="absolute insert-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="size-5 text-base-content/40" />
                </div>
                <input
                  className={`input input-bordered pl-10 w-full`}
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                ></input>
                <button
                  type="button"
                  className="absolute insert-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-active btn-accent w-full" disabled={isSigningUp}>
              {isSigningUp ? (<> <Loader className='size-10 animate-spin' /> </>) : "Create Account"}
            </button>
          </form>
          {/* Login option */}
          <div className="text-center">
            <p className="text-base-content/60 font-semibold mt-4 text-normal">
            Already have an account? {" "}
            <Link to={"/login"} className="link link-primary">Login</Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-16 mb-8 ml-16">
      <Lottie animationData={animation} />
      <div className="text-center mb-8">
        <h1 className="font-bold text-2xl mb-4">Welcome to ChatHub</h1>
        <p className="text-lg font-normal text-slate-500">Your personalized real-time chat application.</p>
      </div>
    </div>
    </div>
  );
}

export default Signup;
