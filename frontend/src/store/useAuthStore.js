import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { getErrorMessage } from "../lib/errors.js";
import { useChatStore } from "./useChatStore.js";

const BASE_URL =
  import.meta.env.VITE_SOCKET_URL ??
  (import.meta.env.MODE === "development" ? "http://localhost:3000" : "/");

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isRemovingProfilePhoto: false,
  isSendingResetLink: false,
  isResettingPassword: false,
  socket: null,
  // "idle" | "connecting" | "connected" | "disconnected"
  socketStatus: "idle",
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Welcome to Chatify");
      get().connectSocket();
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(getErrorMessage(error, "Couldn't create your account. Please try again."));
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Signed in");
      get().connectSocket();
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(getErrorMessage(error, "Couldn't sign you in. Please try again."));
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      useChatStore.getState().reset();
      set({ authUser: null, onlineUsers: [] });
      toast.success("Signed out");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(getErrorMessage(error, "Couldn't sign you out. Please try again."));
    }
  },

  deleteProfile: async () => {
    try {
      await axiosInstance.delete("/auth/profile");
      get().disconnectSocket();
      useChatStore.getState().reset();
      set({ authUser: null, onlineUsers: [] });
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Profile deletion failed:", error);
      toast.error(getErrorMessage(error, "Couldn't delete account. Please try again."));
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile photo updated");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(getErrorMessage(error, "Couldn't update your photo. Please try again."));
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  removeProfilePhoto: async () => {
    set({ isRemovingProfilePhoto: true });
    try {
      const res = await axiosInstance.delete("/auth/remove-photo");
      set({ authUser: res.data });
      toast.success("Profile photo removed");
    } catch (error) {
      console.error("Profile photo removal failed:", error);
      toast.error(getErrorMessage(error, "Couldn't remove your photo. Please try again."));
    } finally {
      set({ isRemovingProfilePhoto: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isSendingResetLink: true });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "Reset link sent to your email");
    } catch (error) {
      console.error("Forgot password failed:", error);
      toast.error(getErrorMessage(error, "Couldn't send reset link."));
    } finally {
      set({ isSendingResetLink: false });
    }
  },

  resetPassword: async (token, password) => {
    set({ isResettingPassword: true });
    try {
      const res = await axiosInstance.post(`/auth/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password reset successfully. You can now log in.");
      return true;
    } catch (error) {
      console.error("Reset password failed:", error);
      toast.error(getErrorMessage(error, "Couldn't reset password."));
      return false;
    } finally {
      set({ isResettingPassword: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket) return;

    const nextSocket = io(BASE_URL, { withCredentials: true });
    set({ socket: nextSocket, socketStatus: "connecting" });

    nextSocket.on("connect", () => set({ socketStatus: "connected" }));
    nextSocket.on("disconnect", () => set({ socketStatus: "disconnected" }));
    nextSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      set({ socketStatus: "disconnected" });
    });
    nextSocket.on("getOnlineUsers", (userIds) => set({ onlineUsers: userIds }));
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (!socket) return;
    socket.removeAllListeners();
    socket.disconnect();
    set({ socket: null, socketStatus: "idle", onlineUsers: [] });
  },
}));
