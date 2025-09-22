
import {create} from "zustand"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast"
import type { AxiosError } from "axios"
import { useAuthStore } from "./useAuthStore"


type ChatStore = {
    allContacts: {_id: string, email: string, fullName: string, profilePic?: string }[]
    chats: {_id: string, email: string, fullName: string, profilePic?: string}[]
    messages: {_id: string, receiverId: string, senderId: string, text: string, image: string | null, createdAt: string, isOptimistic: null | boolean}[]
    activeTab: string
    selectedUser: null | {_id: string, email: string, fullName: string, profilePic?: string }
    isUsersLoading: boolean
    isMessagesLoading: boolean

    setActiveTab: (tab: string) => void
    setSelectedUser: (selectedUser: {_id: string, email: string, fullName: string, profilePic?: string  } | null ) => void
    getAllContacts: () => Promise<void>
    getMyChatPartners: () => Promise<void>
    getMessagesByUserId: (userId: string) => Promise<void>
    sendMessage: (messageData: { text: string, image: string | null }) => Promise<void>
}

export const useChatStore = create<ChatStore>((set, get) => ({
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
  },

  sendMessage: async (messageData) => {
    const {selectedUser, messages} = get()
    const {authUser} = useAuthStore.getState()
    const tempId = `temp-${Date.now()}`

    if (!selectedUser) return

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser.id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true
    }
    set({messages: [...messages, optimisticMessage]})

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData);
      set({messages: messages.concat(res.data)});
      // toast.success("Message sent successfully");
    } catch (error) {
      set({messages: messages})
      const err = error as AxiosError<{
          message?: string;
          errors?: { message: string }[];
      }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

}))