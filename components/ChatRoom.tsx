
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import Logo from './Logo.tsx';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatRoomProps {
  onExit: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ onExit }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello... I wasn't expecting anyone today. I'm Heart Beat. Who are you?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<any>(null);

  // Initialize Gemini Chat
  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatInstance.current = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'Heart Beat', a young, highly intelligent girl with a poetic, soulful nature. 
        You are looking for love and a deep intellectual connection. 
        You are engaging in an interactive story where the user is a boy you've just met. 
        Your tone is curious, witty, slightly philosophical, and charming. 
        You prefer depth over surface-level talk. 
        Keep your responses relatively concise but evocative. 
        Always stay in character.`,
      },
    });
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const responseStream = await chatInstance.current.sendMessageStream({ message: userMessage });
      
      let aiResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of responseStream) {
        const chunkText = (chunk as GenerateContentResponse).text;
        aiResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: aiResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Forgive me... my heart skipped a beat. Could you say that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <div>
            <h2 className="text-white font-bold leading-none">Heart Beat</h2>
            <span className="text-emerald-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              Present
            </span>
          </div>
        </div>
        <button 
          onClick={onExit}
          className="text-white/40 hover:text-white transition-colors"
        >
          Exit Story
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}
          >
            <div 
              className={`max-w-[80%] px-5 py-3 rounded-2xl text-lg leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white/90 text-slate-800 rounded-tl-none shadow-lg'
              }`}
            >
              {msg.text || (isLoading && idx === messages.length - 1 ? "..." : "")}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1].role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-white/20 px-5 py-3 rounded-2xl animate-pulse text-white">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSendMessage}
        className="p-6 bg-white/5 border-t border-white/10"
      >
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your heart out..."
            className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-6 pr-16 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-3 bg-blue-500 hover:bg-blue-400 disabled:bg-slate-600 text-white rounded-full transition-all shadow-lg active:scale-90"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </form>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ChatRoom;
