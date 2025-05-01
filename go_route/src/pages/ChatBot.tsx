import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatBotResponse {
  reply: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await axios.post<ChatBotResponse>('/api/chat/', { message: input });

      setTimeout(() => {
        const botMessage: Message = { sender: 'bot', text: response.data.reply };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }

    setInput('');
  };

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/bc.png")' }}
    >
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      {/* Main Chat Content */}
      <div className="relative flex flex-col h-full p-4">

        <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">GoRoute ChatBot</h1>

        <div className="flex-1 overflow-auto bg-white/80 backdrop-blur-lg rounded-lg shadow-md p-4 mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Bot is typing... */}
          {isTyping && (
            <div className="flex justify-start mb-2">
              <div className="max-w-xs p-3 rounded-lg bg-gray-300 text-gray-700 italic rounded-bl-none">
                Bot is typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me something..."
            className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-lg"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChatBot;
