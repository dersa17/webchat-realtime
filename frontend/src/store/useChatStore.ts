
import {create} from "zustand"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast"


type ChatStore = {
    allContacts: {_id: string, email: string, fullName: string, profilePic?: string }[]
    chats: {_id: string, email: string, fullName: string, profilePic?: string}[]
    messages: null | []
    activeTab: string
    selectedUser: null | {_id: string, email: string, fullName: string, profilePic?: string }
    isUsersLoading: boolean
    isMessagesLoading: boolean

    setActiveTab: (tab: string) => void
    setSelectedUser: (selectedUser: {_id: string, email: string, fullName: string, profilePic?: string  } ) => void
    getAllContacts: () => Promise<void>
    getMyChatPartners: () => Promise<void>
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
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

 

}))