import { useChatStore } from "../store/useChatStore";

import ProfileHeader from "@/components/profile-header";
import ActiveTabSwitch from "@/components/active-tab-switch";
import ChatContainer from "@/components/ChatContainer";
import NoConversationPlaceholder from "@/components/NoConversationPlaceholder";

function Chat() {
  const { selectedUser } = useChatStore();

  return (
    <div className="w-full flex h-screen overflow-hidden shadow-lg">
        {/* LEFT SIDE */}
        <div className="w-80 bg-gray-100 border-r border-gray-200 justify-center">
          <ProfileHeader />
          <ActiveTabSwitch />
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
    </div>
  );
}
export default Chat;