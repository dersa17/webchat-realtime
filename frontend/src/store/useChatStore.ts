
import {create} from "zustand"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast"
import type { AxiosError } from "axios"


type ChatStore = {
    allContacts: {_id: string, email: string, fullName: string, profilePic?: string }[]
    chats: {_id: string, email: string, fullName: string, profilePic?: string}[]
    messages: {_id: string, chatId: string, senderId: string, text: string, createdAt: string}[]
    activeTab: string
    selectedUser: null | {_id: string, email: string, fullName: string, profilePic?: string }
    isUsersLoading: boolean
    isMessagesLoading: boolean

    setActiveTab: (tab: string) => void
    setSelectedUser: (selectedUser: {_id: string, email: string, fullName: string, profilePic?: string  } | null ) => void
    getAllContacts: () => Promise<void>
    getMyChatPartners: () => Promise<void>
    getMessagesByUserId: (userId: string) => Promise<void>
}

export const useChatStore = create<ChatStore>((set) => ({
    allContacts : [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (selectedUser) => set({selectedUser}),
     getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      const err = error as AxiosError<{
          message?: string;
          errors?: { message: string }[];
      }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      const err = error as AxiosError<{
          message?: string;
          errors?: { message: string }[];
      }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    set({isMessagesLoading: true})
    try {
      const res = await axiosInstance.get(`/messages/${userId}`)
      set({messages: res.data})
    } catch (error) {
       const err = error as AxiosError<{
                      message?: string;
                      errors?: { message: string }[];
                  }>;
      toast.error(err.response?.data?.message || "Something went wrong")
    } finally {
      set({isMessagesLoading: false})
    }
  }

 

}))