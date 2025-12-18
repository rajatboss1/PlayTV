
import React, { useState } from 'react';
import Logo from './components/Logo.tsx';
import ChatRoom from './components/ChatRoom.tsx';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="gradient-bg min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {!isStarted ? (
        <div className="flex flex-col items-center animate-in fade-in">
          {/* Centered Logo Container */}
          <div 
            className="animate-float transition-all duration-500 hover:scale-105 cursor-pointer"
            onClick={() => setIsStarted(true)}
          >
            <Logo size={320} />
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-white text-5xl font-extrabold tracking-tight mb-2">Heart Beat</h1>
            <p className="text-white/70 text-xl font-medium italic">An interactive story of connection</p>
          </div>

          <button 
            onClick={() => setIsStarted(true)}
            className="mt-12 px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-2xl hover:shadow-white/20 active:scale-95"
          >
            Begin the Connection
          </button>

          <div className="mt-8 text-white/40 text-sm tracking-widest uppercase animate-pulse">
            Click to start
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl h-[85vh] animate-in fade-in slide-in-from-bottom-10">
          <ChatRoom onExit={() => setIsStarted(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
