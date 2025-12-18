
import React, { useState, useRef, useEffect } from 'react';
import Logo from './components/Logo.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [imageError, setImageError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // High-res direct image endpoint
  const heartBeatsThumbnail = "https://lh3.googleusercontent.com/d/11oMmLSZFpeZsoGxw2uV_bPEWJB4-fvDx";
  
  // Direct Download Link for Native Video Player (More seamless than iframe)
  const videoFileId = "1qzLU2GjsA9KIBIHLQh_VmmT5rdHIM6Eu";
  const videoSource = `https://drive.google.com/uc?export=download&id=${videoFileId}`;

  const properties = [
    {
      id: 'heart-beats',
      title: 'Heart Beats',
      thumbnail: heartBeatsThumbnail,
      category: 'Interactive Romance',
      rating: '18+',
      episode: 'Episode 1: The Beginning',
      description: 'Your life, your choices. In this interactive journey, every decision you make beats within the heart of the story. Will you follow your destiny or forge a new path?',
    }
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoLoading(false);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-screen pb-32">
      {/* Premium Video Player Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-slide-up select-none">
          
          {/* Top Bar Controls */}
          <div className="absolute top-0 left-0 right-0 z-20 safe-top p-6 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(false)}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <div>
                <h2 className="text-xl font-black tracking-tighter uppercase italic text-white/90">Heart Beats</h2>
                <p className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.2em]">Now Streaming • Episode 1</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-red-600 text-[10px] font-black tracking-widest uppercase">Live Interactive</span>
            </div>
          </div>
          
          {/* Main Video Surface */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            {videoLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 animate-pulse">Establishing Connection...</p>
              </div>
            )}
            
            <video
              ref={videoRef}
              src={videoSource}
              className={`w-full h-full object-contain transition-opacity duration-1000 ${videoLoading ? 'opacity-0' : 'opacity-100'}`}
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
            />

            {/* Cinematic Choice Teaser Overlay */}
            {!videoLoading && currentTime > 5 && currentTime < 15 && (
              <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 animate-slide-up">
                <div className="glass-card p-6 rounded-[32px] border-blue-500/30 flex flex-col items-center text-center">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">Choice Path Unlocking</p>
                  <p className="text-lg font-bold leading-tight italic">"Will you confront the stranger?"</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Custom Bottom Player Controls */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8 safe-bottom bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Scrub Bar */}
              <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden group cursor-pointer">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                <div 
                  className="absolute top-0 left-0 h-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ width: '0%' }} 
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                  <button onClick={togglePlay} className="text-white hover:text-blue-400 transition-colors active:scale-90">
                    {isPaused ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10">
                        <path fillRule="evenodd" d="M4.5 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10">
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zM17.25 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-black tracking-tighter text-white/90">
                      {formatTime(currentTime)} <span className="text-white/30 mx-1">/</span> {formatTime(duration)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <button className="text-white/40 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                  </button>
                  <button className="text-white/40 hover:text-white transition-colors" onClick={() => videoRef.current?.requestFullscreen()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="safe-top fixed top-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto transition-all active:scale-95">
          <Logo size={42} />
        </div>
        <div className="flex gap-3 pointer-events-auto">
          <button className="w-11 h-11 rounded-2xl glass-card flex items-center justify-center border border-white/10 shadow-xl active:scale-90 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Content Feed */}
      <main className="flex-1 px-6 pt-28">
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-[11px] font-black tracking-[0.4em] text-blue-500 uppercase mb-2">Original Series</p>
          <h1 className="text-5xl font-[900] tracking-tighter premium-text-shadow">For You</h1>
        </div>

        <div className="space-y-12">
          {properties.map((item, idx) => (
            <div 
              key={item.id} 
              className="animate-slide-up" 
              style={{ animationDelay: `${(idx + 1) * 0.2}s` }}
            >
              <div className="relative w-full aspect-[4/5.5] rounded-[52px] overflow-hidden glass-card shadow-3xl border border-white/10 group bg-slate-900/50">
                <div className="absolute inset-0 bg-slate-800">
                  {!imageError ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
                      <Logo size={80} className="opacity-20 mb-4" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-blue-600 text-[10px] font-black uppercase tracking-wider">{item.rating}</span>
                      <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest">{item.category}</span>
                    </div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{item.episode}</p>
                  </div>
                  
                  <h3 className="text-5xl font-[900] tracking-tighter mb-4 italic leading-none drop-shadow-2xl uppercase">{item.title}</h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium line-clamp-2 max-w-sm">
                    {item.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="flex-1 h-14 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
                      </svg>
                      Play Story
                    </button>
                    <button className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white active:scale-95 transition-all hover:bg-white/20">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="w-full h-32 rounded-[36px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center opacity-40 bg-white/5">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300">More stories arriving soon</p>
          </div>
        </div>
      </main>

      {/* Persistent Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 glass-nav-bottom rounded-[32px] shadow-2xl border border-white/10 safe-bottom">
        <div className="px-8 py-5 flex justify-between items-center max-w-md mx-auto">
          {[
            { id: 'home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
            { id: 'discover', icon: 'M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'library', icon: 'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z' },
            { id: 'profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center transition-all duration-300 ${activeTab === tab.id ? 'text-blue-500' : 'text-white/20'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === tab.id ? 3 : 2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              {activeTab === tab.id && <div className="active-indicator"></div>}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
