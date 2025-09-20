import { create } from "zustand"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast";

type AuthStore = {
    authUser: null | { id: string, email: string, fullName: string }
    isCheckingAuth: boolean
    isSigningUp: boolean
    isLoggingIn: boolean
    login: (data: {email: string, password: string}) => Promise<void>
    logout: () => Promise<void>
    checkAuth: () => Promise<void>
    signup: (data: { fullName: string, email: string, password: string }) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        set({isCheckingAuth: true})
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in auth check:", error)
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            toast.success("Account created successfully!");
        } catch (error) {
         if (error.response?.data?.errors) {
                // kalau ada error dari Zod, ambil pesan pertama misalnya
                const firstError = error.response.data.errors[0];
                toast.error(firstError.message || "Validation failed");
            } else {
                toast.error(error.response?.data?.message || "Signup failed");
            }
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async(data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser: res.data})
            toast.success("Logged in successfully")
        } catch {
            if (error.response?.data?.errors) {
                // kalau ada error dari Zod, ambil pesan pertama misalnya
                const firstError = error.response.data.errors[0];
                toast.error(firstError.message || "Validation failed");
            } else {
                toast.error(error.response?.data?.message || "Login failed");
            }
        } finally {
            set({isLoggingIn: false})
        }
    },

    logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    //   get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },
    
}))