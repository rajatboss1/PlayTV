
import React, { useState, useEffect, useRef } from 'react';
import Logo from './components/Logo.tsx';

/**
 * PLAYTALK CONTENT ENGINE
 * Content database for the interactive streaming experience.
 */
const SERIES_DATA = [
  {
    id: 'heart-beats',
    title: 'Heart Beats',
    thumbnail: "https://lh3.googleusercontent.com/d/11oMmLSZFpeZsoGxw2uV_bPEWJB4-fvDx",
    category: 'Interactive Romance',
    rating: '18+',
    description: 'In a world where choices define destiny, your pulse is the controller. Experience the revolutionary vertical series that follows the intertwined lives of strangers.',
    episodes: [
      { 
        id: 1, 
        title: "The Neon Encounter", 
        url: "https://res.cloudinary.com/drw9dpmhj/video/upload/v1766039976/Ending_kaisi_lagi_...Team-_Actor-_whoisaarzoo_DOP-_photographyby_krish_Cinematography-_daaksh_yrgazn.mp4" 
      },
      { 
        id: 2, 
        title: "Pulse Check", 
        url: "https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-futuristic-city-with-neon-lights-4891-large.mp4" 
      },
      { 
        id: 3, 
        title: "Midnight Vows", 
        url: "https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-and-a-bright-moon-4634-large.mp4" 
      }
    ]
  },
  {
    id: 'silent-pulse',
    title: 'Silent Pulse',
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop",
    category: 'Mystery',
    rating: '16+',
    description: 'Every silence tells a story. Uncover the truth behind the pulse in this dark psychological thriller.',
    episodes: [
      { id: 1, title: "The First Silence", url: "https://assets.mixkit.co/videos/preview/mixkit-bubbles-of-water-in-slow-motion-from-bottom-to-top-361-large.mp4" }
    ]
  },
  {
    id: 'neon-vows',
    title: 'Neon Vows',
    thumbnail: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=500&auto=format&fit=crop",
    category: 'Drama',
    rating: '18+',
    description: 'Love in the fast lane of a digital metropolis. Can relationships survive in a world of algorithms?',
    episodes: [
      { id: 1, title: "Binary Hearts", url: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-lights-in-the-city-21800-large.mp4" }
    ]
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSeries, setSelectedSeries] = useState(SERIES_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentEpisode = selectedSeries.episodes[currentEpisodeIndex];

  const handleOpenPlayer = (series: typeof SERIES_DATA[0], episodeIndex: number = 0) => {
    setSelectedSeries(series);
    setCurrentEpisodeIndex(episodeIndex);
    setIsPlaying(true);
    setIsPaused(false);
    setVideoLoading(true);
    setVideoError(null);
    setProgress(0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlayPause = () => {
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
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total) setProgress((current / total) * 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedPos = (x / rect.width);
      videoRef.current.currentTime = clickedPos * videoRef.current.duration;
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${selectedSeries.title} - PlayTalk`,
          text: `Watch ${currentEpisode.title} on PlayTalk!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied!');
      }
    } catch (err) { console.log('Share failed:', err); }
  };

  useEffect(() => {
    document.body.style.overflow = isPlaying ? 'hidden' : 'auto';
  }, [isPlaying]);

  return (
    <div className="flex flex-col min-h-screen pb-40 text-white selection:bg-blue-500/30">
      
      {/* 9:16 High-Performance Native Player */}
      {isPlaying && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col animate-slide-up">
          <div className="absolute top-0 left-0 right-0 z-[210] safe-top p-6 flex justify-between items-center bg-gradient-to-b from-black/95 via-black/20 to-transparent pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-3xl flex items-center justify-center border border-white/10 active:scale-90 transition-all pointer-events-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="text-center">
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500">S1 : E{currentEpisodeIndex + 1}</h2>
              <p className="text-lg font-black tracking-tighter italic uppercase text-white/90 truncate max-w-[200px]">{currentEpisode.title}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-3xl flex items-center justify-center border border-white/10 active:scale-90 transition-all pointer-events-auto">
              {isMuted ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.535 7.465a.75.75 0 0 1 1.06 0L22.12 10l-2.525 2.525a.75.75 0 1 1-1.06-1.06L20 10l-1.465-1.465a.75.75 0 0 1 0-1.06Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06Zm4.44 5.07a.75.75 0 0 1 1.06 0 8.25 8.25 0 0 1 0 11.662.75.75 0 1 1-1.06-1.062 6.75 6.75 0 0 0 0-9.54.75.75 0 0 1 0-1.06ZM15.53 12a.75.75 0 0 1 1.06 0 2.25 2.25 0 0 1 0 3.182.75.75 0 1 1-1.06-1.06.75.75 0 0 0 0-1.06.75.75 0 0 1 0-1.062Z" /></svg>}
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative bg-black p-4" onClick={togglePlayPause}>
            <div className="relative w-full max-w-[440px] aspect-[9/16] rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.3)] bg-slate-900 border border-white/10 group">
              {videoLoading && !videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-slate-950">
                   <div className="w-12 h-12 border-[3px] border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
                   <p className="mt-8 text-[10px] font-black uppercase tracking-[0.6em] text-blue-500/80 animate-pulse">Initializing Stream</p>
                </div>
              )}
              {videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-slate-950 p-10 text-center">
                   <svg className="w-12 h-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                   <p className="text-xs font-black uppercase tracking-widest text-white/50 mb-2">Stream Error</p>
                   <p className="text-[10px] text-white/30 mb-8 uppercase leading-relaxed">Direct MP4 link required.<br/>Check Cloudinary link properties.</p>
                   <button onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }} className="px-8 py-3 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/20 pointer-events-auto">Back to Home</button>
                </div>
              )}
              
              <video
                ref={videoRef}
                key={currentEpisode.url}
                src={currentEpisode.url}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted={isMuted}
                onCanPlay={() => { setVideoLoading(false); setIsPaused(false); }}
                onWaiting={() => setVideoLoading(true)}
                onError={() => {
                  setVideoLoading(false);
                  setVideoError("Format mismatch");
                }}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  if (currentEpisodeIndex < selectedSeries.episodes.length - 1) {
                    setCurrentEpisodeIndex(currentEpisodeIndex + 1);
                    setVideoLoading(true);
                  } else { setIsPlaying(false); }
                }}
              />

              {/* Play/Pause Central Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${isPaused ? 'bg-black/20 opacity-100' : 'opacity-0 scale-150'}`}>
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                  {isPaused ? (
                    <svg className="w-10 h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>
                  ) : (
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm10.5 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75z" /></svg>
                  )}
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10 cursor-pointer group hover:h-3 transition-all z-50" onClick={(e) => { e.stopPropagation(); handleProgressClick(e); }}>
                <div className="h-full bg-blue-500 shadow-[0_0_20px_#3b82f6] relative transition-all" style={{ width: `${progress}%` }}>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow-xl"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 pb-12 text-center bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
             <div className="flex gap-1.5 mb-6">
                {selectedSeries.episodes.map((_, idx) => (
                  <div key={idx} className={`w-10 h-1 rounded-full transition-all duration-500 ${idx === currentEpisodeIndex ? 'bg-blue-500 w-14' : 'bg-white/10'}`} />
                ))}
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">Tap to {isPaused ? 'Resume' : 'Pause'}</p>
          </div>
        </div>
      )}

      {/* Main UI */}
      <header className="safe-top fixed top-0 w-full z-50 px-8 py-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto transition-transform active:scale-95 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Logo size={42} />
        </div>
        <div className="flex gap-4 pointer-events-auto">
          <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center border border-white/5 active:scale-90 transition-all">
             <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button onClick={handleShare} className="w-12 h-12 rounded-full glass-card flex items-center justify-center border border-white/10 active:scale-90 transition-all shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white/60"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" /></svg>
          </button>
        </div>
      </header>

      <main className="flex-1 pt-32 max-w-lg mx-auto w-full">
        <section className="px-8 mb-10 animate-slide-up">
          <p className="text-[11px] font-black tracking-[0.5em] text-blue-500 uppercase mb-2">Watch Now</p>
          <h1 className="text-6xl font-[900] tracking-tighter leading-[0.85] italic uppercase">{selectedSeries.title.split(' ')[0]}<br/>{selectedSeries.title.split(' ')[1] || ''}</h1>
        </section>

        <section className="px-8 mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative w-full aspect-[9/13] rounded-[60px] overflow-hidden glass-card border border-white/10 group shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <img src={selectedSeries.thumbnail} className="w-full h-full object-cover transition-transform duration-[12s] group-hover:scale-110" alt={selectedSeries.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-12">
              <div className="flex items-center gap-3 mb-6">
                 <span className="px-2.5 py-1 rounded-lg border border-white/30 text-[10px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-md">{selectedSeries.rating}</span>
                 <span className="text-[12px] font-black text-blue-400 uppercase tracking-[0.4em]">{selectedSeries.category}</span>
              </div>
              <p className="text-white/60 text-[15px] font-medium leading-relaxed mb-12 line-clamp-3">{selectedSeries.description}</p>
              <button onClick={() => handleOpenPlayer(selectedSeries, 0)} className="w-full h-16 bg-white text-black rounded-full font-black text-[13px] uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 hover:bg-blue-500 hover:text-white group/btn">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-blue-600 transition-colors shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>
                </div>
                Play S1 : E1
              </button>
            </div>
          </div>
        </section>

        <section className="px-8 mb-20 animate-slide-up" style={{ animationDelay: '0.15s' }}>
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] opacity-30">All Episodes</h3>
              <div className="h-0.5 w-1/2 bg-white/5 rounded-full"></div>
           </div>
           <div className="space-y-5">
              {selectedSeries.episodes.map((ep, index) => (
                <div key={ep.id} onClick={() => handleOpenPlayer(selectedSeries, index)} className="glass-card p-6 rounded-[2.5rem] flex items-center justify-between group active:scale-[0.97] transition-all cursor-pointer border border-white/5 hover:border-white/20 hover:bg-white/[0.06]">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[12px] font-black text-white/20 border border-white/5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all shadow-lg">{index + 1}</div>
                    <div>
                      <h4 className="text-[13px] font-black uppercase tracking-widest mb-1.5 group-hover:text-blue-400 transition-colors">{ep.title}</h4>
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] font-bold text-white/20 tracking-widest uppercase">Episode {index + 1}</p>
                        <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                        <p className="text-[10px] font-bold text-blue-500/40 tracking-widest uppercase">HD</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/10 group-hover:text-white group-hover:border-white group-hover:scale-110 transition-all bg-black/20 shadow-inner">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>
                  </div>
                </div>
              ))}
           </div>
        </section>

        <section className="mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
           <h3 className="px-8 text-[11px] font-black uppercase tracking-[0.4em] mb-8 opacity-30">Series Catalog</h3>
           <div className="flex gap-5 overflow-x-auto px-8 no-scrollbar pb-6">
              {SERIES_DATA.map((series) => (
                <div key={series.id} onClick={() => setSelectedSeries(series)} className={`flex-shrink-0 w-44 group cursor-pointer transition-all duration-500 ${selectedSeries.id === series.id ? 'scale-105 opacity-100' : 'opacity-30 hover:opacity-60 hover:scale-102'}`}>
                   <div className={`relative aspect-[2/3.2] rounded-[2.5rem] overflow-hidden mb-4 border-2 ${selectedSeries.id === series.id ? 'border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.4)]' : 'border-white/5'} transition-all`}>
                      <img src={series.thumbnail} className="w-full h-full object-cover" alt={series.title} />
                      {selectedSeries.id === series.id && <div className="absolute inset-0 bg-blue-500/10" />}
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                         <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[7px] font-black uppercase tracking-widest border border-white/10">{series.rating}</span>
                      </div>
                   </div>
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] truncate px-2 mb-1">{series.title}</p>
                   <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest px-2">{series.category}</p>
                </div>
              ))}
           </div>
        </section>

        <footer className="px-8 pb-20 opacity-10 text-center">
           <div className="w-12 h-1 bg-white/20 mx-auto rounded-full mb-8"></div>
           <p className="text-[10px] font-black uppercase tracking-[0.8em] mb-2">PlayTalk OTT</p>
           <p className="text-[8px] font-bold uppercase tracking-[0.4em]">Proprietary Interactive Engine</p>
        </footer>
      </main>

      <nav className="fixed bottom-12 left-10 right-10 z-[150] glass-nav-bottom rounded-[45px] border border-white/10 safe-bottom shadow-[0_50px_100px_rgba(0,0,0,1)] max-w-sm mx-auto">
        <div className="px-12 py-7 flex justify-between items-center">
          {[
            { id: 'home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
            { id: 'search', icon: 'M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'library', icon: 'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z' }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center transition-all duration-500 ${activeTab === tab.id ? 'text-blue-500 scale-125' : 'text-white/20'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === tab.id ? 3 : 2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} /></svg>
              {activeTab === tab.id && <div className="active-indicator w-3 h-1 shadow-[0_0_15px_#3b82f6]"></div>}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
