'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@/components/ChatMessage";
import { useChat } from '@ai-sdk/react';
import { Message } from 'ai';

interface ChatProps {
  id: string;
  initialMessages: Message[];
}

export default function Chat({ id, initialMessages }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id,
    initialMessages,
    api: '/api/chat',
    sendExtraMessageFields: true,
  });

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-grow p-4 mb-4 overflow-y-auto bg-white border rounded-lg shadow-md">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">Chat messages will appear here.</div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.role === 'user'}
            />
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center">
        <Textarea
          placeholder="Type your message..."
          className="flex-grow mr-2 min-h-[40px] resize-none"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as React.FormEvent);
            }
          }}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
} 