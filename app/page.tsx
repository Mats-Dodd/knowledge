"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChatMessage } from "@/components/ChatMessage"

type Message = {
  content: string;
  isUser: boolean;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { content: input, isUser: true };
    
    // Add echo message (bot response)
    const botMessage: Message = { content: input, isUser: false };
    
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Chat Display Area */}
      <div className="flex-grow p-4 mb-4 overflow-y-auto bg-white border rounded-lg shadow-md">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">Chat messages will appear here.</div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage 
              key={index}
              content={message.content}
              isUser={message.isUser}
            />
          ))
        )}
      </div>

      {/* Message Input Area */}
      <form onSubmit={handleSend} className="flex items-center">
        <Textarea 
          placeholder="Type your message..." 
          className="flex-grow mr-2 min-h-[40px] resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}
