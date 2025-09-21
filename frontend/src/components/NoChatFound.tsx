import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useChatStore } from "../store/useChatStore"

function NoChatsFound() {
  const { setActiveTab } = useChatStore()

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="flex flex-col items-center justify-center py-10 text-center space-y-4">
        {/* Icon wrapper */}
        <div className="w-16 h-16 bg-gray-500/10 rounded-full flex items-center justify-center">
          <MessageCircle className="w-8 h-8" />
        </div>

        {/* Text */}
        <div>
          <h4 className="text-foreground font-medium mb-1">
            No conversations yet
          </h4>
          <p className="text-muted-foreground text-sm px-6">
            Start a new chat by selecting a contact from the contacts tab
          </p>
        </div>

        {/* Action button */}
        <Button
          variant="outline"
          className=""
          onClick={() => setActiveTab("contacts")}
        >
          Find contacts
        </Button>
      </CardContent>
    </Card>
  )
}

export default NoChatsFound
