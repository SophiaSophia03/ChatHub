import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser:null,
  isSignedUp:false,
  isLoggedIn:false,
  isUpdatingProfile:false,

  isCheckingAuth:true,
  checkAuth: async()=> {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({authUser:response.data});
    } catch (error) {
      console.log("Error in check Auth function", error)
      set({authUser:null})
    }finally{
      set({ isCheckingAuth:false })
    }
  }
}))