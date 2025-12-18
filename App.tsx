
import React, { useState, useEffect, useRef } from 'react';
import Logo from './components/Logo.tsx';

/**
 * HEART BEATS - REELS EDITION
 * Episodes are played in a vertical snap-scrolling feed similar to YT Shorts.
 */
const HEART_BEATS_DATA = {
  id: 'heart-beats',
  title: 'Heart Beats',
  thumbnail: "https://lh3.googleusercontent.com/d/11oMmLSZFpeZsoGxw2uV_bPEWJB4-fvDx",
  category: 'Interactive Romance',
  rating: '18+',
  description: 'In a world where choices define destiny, your pulse is the controller. Experience the revolutionary vertical series.',
  episodes: [
    { 
      id: 1, 
      label: "EPISODE 1",
      title: "The Neon Encounter", 
      url: "https://github.com/rajatboss1/plivetv/releases/download/Video/Heart.Beats.Episode.1.mp4",
      duration: "08:42"
    },
    { 
      id: 2, 
      label: "EPISODE 2",
      title: "Pulse Check", 
      url: "https://github.com/rajatboss1/plivetv/releases/download/Video/Heart.Beats.Episode.2.mp4",
      duration: "10:15"
    },
    { 
      id: 3, 
      label: "EPISODE 3",
      title: "Deep Connection", 
      url: "https://github.com/rajatboss1/plivetv/releases/download/Video/Heart.Beats.Episode.3.mp4",
      duration: "09:30"
    },
    { 
      id: 4, 
      label: "EPISODE 4",
      title: "The Final Beat", 
      url: "https://github.com/rajatboss1/plivetv/releases/download/Video/Heart.Beats.Episode.4.mp4",
      duration: "12:05"
    }
  ]
};

const ReelItem: React.FC<{ 
  episode: typeof HEART_BEATS_DATA.episodes[0], 
  isActive: boolean,
  isMuted: boolean,
  toggleMute: () => void 
}> = ({ episode, isActive, isMuted, toggleMute }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Handle autoplay block by remaining muted
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  return (
    <div className="w-full h-screen snap-start relative bg-black overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        src={episode.url}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onLoadStart={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-black tracking-[0.4em] text-blue-500 animate-pulse">BUFFERING PULSE...</p>
        </div>
      )}

      {/* UI Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-4 pointer-events-auto">
          <span className="bg-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-900/40">{episode.label}</span>
          <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">{episode.duration} • 4K</span>
        </div>
        <h3 className="text-4xl font-[900] italic tracking-tighter uppercase mb-2 leading-none pointer-events-auto">{episode.title}</h3>
        <p className="text-white/40 text-[12px] font-bold uppercase tracking-widest leading-relaxed pointer-events-auto">PlayTalk Originals • Heart Beats S1</p>
      </div>

      {/* Interaction Layer */}
      <div className="absolute right-6 bottom-32 flex flex-col gap-8 items-center">
        <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center active:scale-90 transition-transform">
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.535 7.465a.75.75 0 0 1 1.06 0L22.12 10l-2.525 2.525a.75.75 0 1 1-1.06-1.06L20 10l-1.465-1.465a.75.75 0 0 1 0-1.06Z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06Zm4.44 5.07a.75.75 0 0 1 1.06 0 8.25 8.25 0 0 1 0 11.662.75.75 0 1 1-1.06-1.062 6.75 6.75 0 0 0 0-9.54.75.75 0 0 1 0-1.06ZM15.53 12a.75.75 0 0 1 1.06 0 2.25 2.25 0 0 1 0 3.182.75.75 0 1 1-1.06-1.06.75.75 0 0 0 0-1.06.75.75 0 0 1 0-1.062Z" /></svg>
          )}
        </button>
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 mb-1">
            <img src={HEART_BEATS_DATA.thumbnail} className="w-full h-full object-cover" alt="series" />
          </div>
          <p className="text-[10px] font-black tracking-widest opacity-60">HB1</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'feed'>('home');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === 'feed') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.getAttribute('data-index') || '0');
              setActiveIdx(index);
            }
          });
        },
        { threshold: 0.7 }
      );

      const items = document.querySelectorAll('.reel-container');
      items.forEach((item) => observer.observe(item));

      return () => {
        observer.disconnect();
      };
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, [view]);

  return (
    <div className="flex flex-col min-h-screen text-white bg-slate-950">
      
      {/* GLOBAL HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-[100] p-6 flex justify-between items-center transition-all duration-500 ${view === 'feed' ? 'bg-gradient-to-b from-black/60 to-transparent' : ''}`}>
        <div 
          className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform" 
          onClick={() => setView('home')}
        >
          <Logo size={40} isPulsing={view === 'home'} />
          <span className="text-xl font-[900] italic tracking-tighter uppercase">HEART<span className="text-blue-500">BEATS</span></span>
        </div>
        
        {view === 'feed' && (
          <button 
            onClick={() => setView('home')}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center active:scale-90 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </header>

      {/* HOME SCREEN */}
      {view === 'home' && (
        <main className="flex-1 flex flex-col items-center justify-center px-8 pt-32 pb-20 animate-slide-up">
          <section className="text-center mb-12">
            <p className="text-[11px] font-black tracking-[0.6em] text-blue-500 uppercase mb-4">A PlayTalk Original Experience</p>
            <h1 className="text-7xl font-[900] tracking-tighter italic uppercase leading-[0.85] mb-6">PULSE<br/>DRIVEN<br/>CINEMA</h1>
            <p className="max-w-md text-white/40 font-medium text-sm tracking-wide leading-relaxed">
              Step into the world of Heart Beats. Four episodes. One destiny. Swipe through the narrative.
            </p>
          </section>

          <button 
            onClick={() => setView('feed')}
            className="group relative w-full max-w-sm aspect-[9/13] rounded-[50px] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] active:scale-95 transition-all duration-500"
          >
            <img src={HEART_BEATS_DATA.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Series Poster" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-end p-12">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 backdrop-blur-3xl border border-blue-500/30 flex items-center justify-center mb-8 group-hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/60 group-hover:text-white transition-colors">WATCH REELS</p>
            </div>
          </button>
        </main>
      )}

      {/* REELS FEED */}
      {view === 'feed' && (
        <div 
          ref={feedRef}
          className="fixed inset-0 h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth"
        >
          {HEART_BEATS_DATA.episodes.map((ep, index) => (
            <div key={ep.id} className="reel-container" data-index={index}>
              <ReelItem 
                episode={ep} 
                isActive={activeIdx === index} 
                isMuted={isMuted} 
                toggleMute={() => setIsMuted(!isMuted)} 
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default App;
