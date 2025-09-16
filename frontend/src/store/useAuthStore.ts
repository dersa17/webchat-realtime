import { create } from "zustand"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast";

type AuthStore = {
    authUser: null | { id: string, email: string, fullname: string }
    isCheckingAuth: boolean
    isSigningUp: boolean
    // login: (email: string, password: string) => Promise<void>
    // signup: (fullname: string, email: string, password: string) => Promise<void>
    // logout: () => Promise<void>
    checkAuth: () => Promise<void>
    signup: (data: { fullName: string, email: string, password: string }) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isCheckingAuth: false,
    isSigningUp: false,

    checkAuth: async () => {
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
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
}))