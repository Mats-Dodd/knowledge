import { prisma } from '@/app/lib/prisma';
import { Message } from 'ai';
import { Message as PrismaMessage } from '@/app/generated/prisma';

export async function createChat(): Promise<string> {
  const chat = await prisma.chat.create({ data: {} });
  return chat.id;
}

export async function loadChat(id: string): Promise<Message[]> {
  const messages = await prisma.message.findMany({
    where: { chatId: id },
    orderBy: { createdAt: 'asc' },
  });
  
  return messages.map((msg: PrismaMessage) => ({
    id: msg.id,
    content: msg.content,
    role: msg.role as 'user' | 'assistant',
    createdAt: msg.createdAt,
  }));
}

export async function saveChat({
  id,
  messages,
}: {
  id: string;
  messages: Message[];
}): Promise<void> {
  // Get existing messages to avoid duplicates
  const existingMessages = await prisma.message.findMany({
    where: { chatId: id },
    select: { id: true },
  });
  
  const existingIds = new Set(existingMessages.map((msg: { id: string }) => msg.id));
  
  // Filter out messages that already exist
  const newMessages = messages.filter((msg: Message) => !existingIds.has(msg.id));
  
  // Create new messages
  await Promise.all(
    newMessages.map((msg: Message) =>
      prisma.message.create({
        data: {
          id: msg.id,
          content: msg.content,
          role: msg.role,
          createdAt: msg.createdAt instanceof Date ? msg.createdAt : new Date(),
          chat: { connect: { id } },
        },
      })
    )
  );
} 