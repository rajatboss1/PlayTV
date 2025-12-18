
import React from 'react';
import Logo from './components/Logo';

const App: React.FC = () => {
  return (
    <div className="gradient-bg min-h-screen w-full flex flex-col items-center justify-center p-4">
      {/* Centered Logo Container */}
      <div className="animate-float transition-all duration-500 hover:scale-105 cursor-pointer">
        <Logo size={320} />
      </div>

      {/* Optional subtle branding text that fades in */}
      <div className="mt-12 text-white/80 text-xl font-bold tracking-widest uppercase opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
        PlayTalk
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
