
import React, { useState, useEffect } from 'react';
import Logo from './components/Logo.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const story = {
    id: 'heart-beats',
    title: 'Heart Beats',
    thumbnail: "https://lh3.googleusercontent.com/d/11oMmLSZFpeZsoGxw2uV_bPEWJB4-fvDx",
    videoUrl: "https://drive.google.com/file/d/1qzLU2GjsA9KIBIHLQh_VmmT5rdHIM6Eu/preview",
    category: 'Interactive Romance',
    rating: '18+',
    episode: 'Episode 1: Fate',
    description: 'Every heartbeat is a decision. In this world, you don\'t just watch the story—you control the pulse of love.'
  };

  const handleOpenPlayer = () => {
    setIsPlaying(true);
    setVideoLoading(true);
  };

  useEffect(() => {
    if (isPlaying) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col min-h-screen pb-36 text-white">
      
      {/* Immersive Video Player Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-slide-up">
          <div className="absolute top-0 left-0 right-0 z-[110] safe-top p-6 flex justify-between items-center bg-gradient-to-b from-black/95 to-transparent">
            <button 
              onClick={() => setIsPlaying(false)}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-2xl flex items-center justify-center border border-white/10 active:scale-90 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center pr-12">
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500">{story.episode}</h2>
              <p className="text-lg font-black tracking-tighter italic uppercase text-white/90">Heart Beats</p>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative bg-black p-4">
            <div className="relative w-full max-w-[440px] aspect-[9/16] rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)] bg-slate-900 border border-white/5">
              {videoLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-slate-950">
                   <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                   <p className="mt-6 text-[9px] font-black uppercase tracking-[0.6em] text-blue-500 animate-pulse">Initializing Flow</p>
                </div>
              )}
              <iframe
                src={story.videoUrl}
                className="w-full h-full border-none"
                allow="autoplay; fullscreen"
                onLoad={() => setVideoLoading(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Persistent App Header */}
      <header className="safe-top fixed top-0 w-full z-50 px-8 py-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto transition-transform active:scale-95">
          <Logo size={48} />
        </div>
        <div className="pointer-events-auto">
          <div className="w-12 h-12 rounded-[18px] glass-card flex items-center justify-center border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white/40">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Feed Container */}
      <main className="flex-1 px-8 pt-36">
        <div className="mb-10 animate-slide-up">
          <p className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase mb-2">Editor's Spotlight</p>
          <h1 className="text-7xl font-[900] tracking-tighter premium-text-shadow leading-[0.85]">Series</h1>
        </div>

        {/* Hero Story Card (9:16 optimized) */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-full aspect-[9/14] rounded-[60px] overflow-hidden glass-card shadow-[0_40px_120px_rgba(0,0,0,0.7)] border border-white/10 group">
            <div className="absolute inset-0 bg-slate-950">
              <img 
                src={story.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110"
                alt="Heart Beats Poster"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
            
            <div className="absolute top-8 left-8">
               <span className="px-4 py-2 rounded-2xl bg-blue-600/90 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">Original</span>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <div className="flex flex-col gap-1 mb-6">
                <span className="text-[12px] font-black text-blue-400 uppercase tracking-[0.4em]">{story.category}</span>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">S1 • {story.episode}</p>
              </div>
              
              <h3 className="text-7xl font-[900] tracking-tighter mb-4 italic leading-[0.8] uppercase">{story.title}</h3>
              
              <p className="text-white/60 text-sm leading-relaxed mb-10 line-clamp-2 max-w-[280px]">
                {story.description}
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleOpenPlayer}
                  className="flex-1 h-18 bg-white text-black rounded-[32px] font-black text-[13px] uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-0.5"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>
                  </div>
                  Play
                </button>
                <button className="w-18 h-18 rounded-[32px] bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 text-center opacity-20">
           <div className="w-1 h-12 bg-white/40 mx-auto rounded-full mb-4"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em]">Scroll for discovery</p>
        </div>
      </main>

      {/* Bottom Navigation Dock */}
      <nav className="fixed bottom-10 left-8 right-8 z-50 glass-nav-bottom rounded-[48px] border border-white/10 safe-bottom shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        <div className="px-10 py-6 flex justify-between items-center max-w-sm mx-auto">
          {[
            { id: 'home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
            { id: 'search', icon: 'M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'library', icon: 'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z' }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center transition-all duration-300 ${activeTab === tab.id ? 'text-blue-500 scale-125' : 'text-white/20'}`}
            