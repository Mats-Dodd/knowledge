import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 180;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log(messages);

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
} 