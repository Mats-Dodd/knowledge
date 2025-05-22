import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Chat Display Area */}
      <div className="flex-grow p-4 mb-4 overflow-y-auto bg-white border rounded-lg shadow-md">
        {/* Placeholder for chat messages */}
        <div className="text-center text-gray-500">Chat messages will appear here.</div>
      </div>

      {/* Message Input Area */}
      <div className="flex items-center">
        <Textarea 
          placeholder="Type your message..." 
          className="flex-grow mr-2 min-h-[40px] resize-none"
        />
        <Button>Send</Button>
      </div>
    </div>
  )
}
