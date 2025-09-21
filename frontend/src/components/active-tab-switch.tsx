import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatList from "./ChatList"
import ContactList from "./ContactList"
import { useChatStore } from "../store/useChatStore"

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore()

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="">
      <div className="flex justify-center items-center">
        <TabsList className="flex justify-center w-full">
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <TabsContent value="chats">
          <ChatList />
        </TabsContent>
        <TabsContent value="contacts">
          <ContactList />
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default ActiveTabSwitch
