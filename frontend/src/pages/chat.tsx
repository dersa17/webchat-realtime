import { useChatStore } from "../store/useChatStore";

import ProfileHeader from "@/components/profile-header";
import ActiveTabSwitch from "@/components/active-tab-switch";
import ChatList from "@/components/ChatList";
import ContactList from "@/components/ContactList";
import ChatContainer from "@/components/ChatContainer";
import NoConversationPlaceholder from "@/components/NoConversationPlaceholder";

function Chat() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full flex h-screen overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50  flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
    </div>
  );
}
export default Chat;