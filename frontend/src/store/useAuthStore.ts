import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type AuthStore = {
    authUser: {
        id: string;
        email: string;
        fullName: string;
        profilePic?: string;
    };
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    login: (data: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    signup: (data: {
        fullName: string;
        email: string;
        password: string;
    }) => Promise<void>;
    updateProfile: (profilePic: string) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: { id: "", email: "", fullName: "" },
    isCheckingAuth: false,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in auth check:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            toast.success("Account created successfully!");
        } catch (err) {
            const error = err as AxiosError<{
                message?: string;
                errors?: { message: string }[];
            }>;

            if (error.response?.data?.errors) {
                const firstError = error.response.data.errors[0];
                toast.error(firstError.message || "Validation failed");
            } else {
                toast.error(error.response?.data?.message || "Signup failed");
            }
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (err) {
              const error = err as AxiosError<{
                message?: string;
                errors?: { message: string }[];
            }>;
            if (error.response?.data?.errors) {
                // kalau ada error dari Zod, ambil pesan pertama misalnya
                const firstError = error.response.data.errors[0];
                toast.error(firstError.message || "Validation failed");
            } else {
                toast.error(error.response?.data?.message || "Login failed");
            }
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: { id: "", email: "", fullName: "" } });
            toast.success("Logged out successfully");
            //   get().disconnectSocket();
        } catch (error) {
            toast.error("Error logging out");
            console.log("Logout error:", error);
        }
    },

    updateProfile: async (profilePic) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", {
                profilePic,
            });
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
                const err = error as AxiosError<{
                message?: string;
                errors?: { message: string }[];
            }>;
            if (err.response?.data?.errors) {
                const firstError = err.response.data.errors[0];
                console.log("Error in update profile:", firstError);
                toast.error(firstError.message);
            } else {
                console.log("Error in update profile:", err);
                toast.error(err.message);
            }
        }
    },
}));
