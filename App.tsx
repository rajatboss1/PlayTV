
import React, { useState } from 'react';
import Logo from './components/Logo.tsx';
import ChatRoom from './components/ChatRoom.tsx';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="gradient-bg min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {!isStarted ? (
        <div className="flex flex-col items-center animate-in fade-in duration-700">
          {/* Centered Logo Container */}
          <div 
            className="animate-float transition-all duration-500 hover:scale-105 cursor-pointer"
            onClick={() => setIsStarted(true)}
          >
            <Logo size={320} />
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-white text-4xl font-bold tracking-tight mb-2">Heart Beat</h1>
            <p className="text-white/60 text-lg italic">An interactive story of connection</p>
          </div>

          <button 
            onClick={() => setIsStarted(true)}
            className="mt-12 px-8 py-3 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl hover:shadow-2xl active:scale-95"
          >
            Begin the Connection
          </button>

          <div className="mt-8 text-white/40 text-sm tracking-widest uppercase animate-pulse">
            Click to start
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl h-[85vh] animate-in slide-in-from-bottom-10 fade-in duration-500">
          <ChatRoom onExit={() => setIsStarted(false)} />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
