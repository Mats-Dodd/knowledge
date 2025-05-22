type ChatMessageProps = {
  content: string;
  isUser: boolean;
};

export function ChatMessage({ content, isUser }: ChatMessageProps) {
  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg p-3 ${
        isUser 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-gray-200 text-gray-800 rounded-bl-none'
      }`}>
        {content}
      </div>
    </div>
  );
} 