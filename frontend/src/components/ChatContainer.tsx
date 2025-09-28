import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
// import { useAuthStore } from "@/store/useAuthStore" 
import { useChatStore } from "@/store/useChatStore"; 
import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore(); 
  // const {authUser} = useAuthStore() 
  useEffect(() => { getMessagesByUserId(selectedUser!._id); 
    subscribeToMessages()

    //cleanup
    return () => unsubscribeFromMessages()
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])


  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8 ">
        {messages?.length > 0 && !isMessagesLoading ? (
          <div className="max-w-5xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.senderId === selectedUser!._id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs shadow-sm ${
                    message.senderId === selectedUser!._id
                      ? "bg-gray-100 text-black" // chat dari orang lain
                      : "bg-indigo-500 text-white" // chat dari kita
                  }`}
                >
                  {message.image && (
                    <img src={message.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {message.text && <p>{message.text}</p>}
                   <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef}/>
          </div>
        ) : isMessagesLoading ? <MessagesLoadingSkeleton /> : (
          <NoChatHistoryPlaceholder name={selectedUser!.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
