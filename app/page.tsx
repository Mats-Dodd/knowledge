"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChatMessage } from "@/components/ChatMessage"
import { useChat } from '@ai-sdk/react';
import { Input } from "@/components/ui/input"

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Chat Display Area */}
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

      {/* Message Input Area */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <Textarea
          placeholder="Type your message..."
          className="flex-grow mr-2 min-h-[40px] resize-none"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as any);
            }
          }}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}
