"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChatMessage } from "@/components/ChatMessage"
import { useChat } from '@ai-sdk/react';
import { Input } from "@/components/ui/input"
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-4">
      <h1 className="text-3xl font-bold">Knowledge Chat</h1>
      <Link href="/chat">
        <Button size="lg">Start New Chat</Button>
      </Link>
    </div>
  );
}
