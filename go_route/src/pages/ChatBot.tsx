import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatBotResponse {
  reply: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      sender: 'user', 
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsError(false);
    
    try {
      const response = await axios.post<ChatBotResponse>('/api/chatbot/chat/', { message: input });

      
      const typingDelay = Math.floor(Math.random() * 1000) + 1000;
      
      setTimeout(() => {
        const botMessage: Message = { 
          sender: 'bot', 
          text: response.data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, typingDelay);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setIsError(true);
      
      const errorMessage: Message = {
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInput('');
    
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/bc.png")' }}
    >
      
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      
      <div className="relative flex flex-col h-full p-4">

        

        <div className="flex-1 overflow-auto bg-white/80 backdrop-blur-lg rounded-lg shadow-md p-4 mb-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p className="text-center">Ask me about bus routes, schedules, or send an SOS if needed!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className="flex flex-col">
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-1">
                    {msg.sender === 'user' ? 'You' : 'Groute'} • {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex justify-start mb-2">
              <div className="flex flex-col">
                <div className="max-w-xs p-3 rounded-lg bg-gray-300 text-gray-700 italic rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2 mb-2">
              <p>Connection error. Please check your network and try again.</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me something..."
            className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            className={`px-6 rounded-r-lg ${
              isTyping 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={isTyping}
          >
            {isTyping ? 'Wait...' : 'Send'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChatBot;