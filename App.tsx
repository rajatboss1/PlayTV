
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
    description: 'In a world where choices define destiny, your pulse is the controller. Experience the revolutionary vertical series that follows the intertwined lives of three strangers in the neon-soaked streets of Neo-Tokyo.'
  };

  const trendingList = [
    { id: 2, title: 'Silent Pulse', category: 'Mystery', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop' },
    { id: 3, title: 'Neon Vows', category: 'Drama', img: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=500&auto=format&fit=crop' },
    { id: 4, title: 'Last Echo', category: 'Sci-Fi', img: 'https://images.unsplash.com/photo-1614728263952-84ea206f25ab?q=80&w=500&auto=format&fit=crop' }
  ];

  const handleOpenPlayer = () => {
    setIsPlaying(true);
    setVideoLoading(true);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Heart Beats - Interactive Series',
          text: 'Watch this interactive series on PlayTalk!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied!');
      }
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isPlaying ? 'hidden' : 'auto';
  }, [isPlaying]);

  return (
    <div className="flex flex-col min-h-screen pb-40 text-white">
      
      {/* 9:16 Cinematic Video Player */}
      {isPlaying && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col animate-slide-up">
          <div className="absolute top-0 left-0 right-0 z-[210] safe-top p-6 flex justify-between items-center bg-gradient-to-b from-black/95 via-black/20 to-transparent">
            <button 
              onClick={() => setIsPlaying(false)}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-3xl flex items-center justify-center border border-white/10 active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-500">{story.episode}</h2>
              <p className="text-lg font-black tracking-tighter italic uppercase text-white/90">Heart Beats</p>
            </div>
            <div className="w-12"></div>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative bg-black p-4">
            <div className="relative w-full max-w-[440px] aspect-[9/16] rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.2)] bg-slate-900 border border-white/5">
              {videoLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-slate-950">
                   <div className="w-10 h-10 border-2 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
                   <p className="mt-8 text-[9px] font-black uppercase tracking-[0.5em] text-blue-500/60 animate-pulse">Syncing Playback</p>
                </div>
              )}
              <iframe
                src={`${story.videoUrl}?autoplay=1`}
                className="w-full h-full border-none"
                allow="autoplay; fullscreen"
                onLoad={() => setVideoLoading(false)}
              />
            </div>
          </div>
          
          <div className="p-8 pb-12 text-center bg-gradient-to-t from-black via-black/80 to-transparent">
             <p className="text-xs font-bold opacity-40 italic tracking-widest">Interactive choices available during play</p>
          </div>
        </div>
      )}

      {/* App Header */}
      <header className="safe-top fixed top-0 w-full z-50 px-8 py-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto transition-transform active:scale-95" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Logo size={48} />
        </div>
        <div className="flex gap-3 pointer-events-auto">
          <button 
            onClick={handleShare}
            className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center border border-white/10 shadow-2xl active:scale-90 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white/60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Content Feed */}
      <main className="flex-1 pt-32 max-w-lg mx-auto w-full">
        
        {/* Spotlight Section */}
        <section className="px-8 mb-10 animate-slide-up">
          <p className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase mb-2">Original Series</p>
          <h1 className="text-6xl font-[900] tracking-tighter leading-none italic uppercase">Heart<br/>Beats</h1>
        </section>

        {/* Hero Card */}
        <section className="px-8 mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative w-full aspect-[9/13] rounded-[50px] overflow-hidden glass-card shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 group">
            <div className="absolute inset-0">
              <img 
                src={story.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                alt="Heart Beats Main"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-2 py-0.5 rounded border border-white/40 text-[9px] font-black uppercase tracking-widest">{story.rating}</span>
                 <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em]">{story.category}</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-8 line-clamp-3">
                {story.description}
              </p>
              <button 
                onClick={handleOpenPlayer}
                className="w-full h-16 bg-white text-black rounded-full font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>
                </div>
                Watch Episode 1
              </button>
            </div>
          </div>
        </section>

        {/* Trending Rail */}
        <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
           <h3 className="px-8 text-xs font-black uppercase tracking-[0.4em] mb-6 opacity-40">More Interactive Stories</h3>
           <div className="flex gap-4 overflow-x-auto px-8 no-scrollbar pb-4">
              {trendingList.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-36 group">
                   <div className="relative aspect-[2/3] rounded-3xl overflow-hidden mb-3 border border-white/5 shadow-xl">
                      <img src={item.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={item.title} />
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[8px] font-black tracking-widest uppercase">SOON</div>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest truncate">{item.title}</p>
                   <p className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">{item.category}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Footer Info */}
        <footer className="px-8 pb-10 opacity-20 text-center">
           <div className="w-10 h-0.5 bg-white/20 mx-auto rounded-full mb-6"></div>
           <p className="text-[9px] font-black uppercase tracking-[0.6em]">Powered by PlayTalk Engine v2.0</p>
        </footer>
      </main>

      {/* Persistent Navigation */}
      <nav className="fixed bottom-10 left-8 right-8 z-[150] glass-nav-bottom rounded-[40px] border border-white/10 safe-bottom shadow-[0_40px_100px_rgba(0,0,0,0.9)] max-w-sm mx-auto">
        <div className="px-10 py-6 flex justify-between items-center">
          {[
            { id: 'home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
            { id: 'search', icon: 'M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { id: 'library', icon: 'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z' }
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center transition-all duration-300 ${activeTab === tab.id ? 'text-blue-500 scale-125' : 'text-white/20'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={activeTab === tab.id ? 3 : 2} stroke="currentColor" className="w-7 h-7">
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
