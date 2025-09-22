import { useChatStore } from "@/store/useChatStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setSelectedUser(null);
        }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
        window.removeEventListener("keydown", handleEscKey);
    }
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-gray-100 border-gray-300 max-h-[84px] px-6 flex-1 ">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={selectedUser?.profilePic || "/avatar.png"} />
            <AvatarFallback>
              {selectedUser?.fullName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <span className="absolute top-0 right-0 block w-3 h-3 rounded-full bg-green-500 ring-1 ring-white dark:ring-gray-800"></span>
        </div>
        <div>
          <h3 className="font-medium">{selectedUser?.fullName}</h3>
          <p className="text-green-500 text-xs">Online</p>
        </div>
      </div>
      <Button
        onClick={() => setSelectedUser(null)}
        variant="ghost"
        className=" text-gray-400 hover:text-red-500 focus:ring-0"
      >
        <XIcon className="w-10 h-10" />
      </Button>
    </div>
  );
};

export default ChatHeader;
