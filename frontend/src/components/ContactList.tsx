import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import UserLoadingSkeleton from "./UserLoadingSkeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore()

  useEffect(() => {
    getAllContacts()
  }, [getAllContacts])

  if (isUsersLoading) return <UserLoadingSkeleton />

  return (
    <div className="space-y-2">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* Avatar with online indicator */}
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={contact.profilePic || "/avatar.png"} />
                <AvatarFallback>
                  {contact.fullName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              <span className="absolute top-0 right-0 block w-3 h-3 rounded-full bg-green-500 ring-1 ring-white dark:ring-gray-800"></span>
            </div>

            <h4 className="text-gray-800 dark:text-gray-200 font-medium">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactList
