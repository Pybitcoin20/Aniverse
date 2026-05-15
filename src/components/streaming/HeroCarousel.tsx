import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Info, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { AnimeTitle } from '../../types/anime';

interface HeroCarouselProps {
  animes: AnimeTitle[];
  onPlay: (anime: AnimeTitle) => void;
  onInfo: (anime: AnimeTitle) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ animes, onPlay, onInfo }) => {
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % animes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [animes.length]);

  const current = animes[index];

  return (
    <div className="relative h-[85vh] w-full overflow-hidden rounded-[2.5rem] glass border border-white/5 mb-12 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image/Video Placeholder */}
          <div className="absolute inset-0 scale-105">
            <img 
              src={current.bannerUrl} 
              alt={current.title} 
              className="w-full h-full object-cover animate-slow-zoom" 
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-akatsuki-bg via-akatsuki-bg/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-akatsuki-bg via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-akatsuki-red text-white text-xs font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(255,0,51,0.4)]">TRENDING #1</span>
                <span className="text-gray-400 font-bold text-sm tracking-widest">{current.year} • {current.genres.join(', ')}</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
                {current.title.split(' ')[0]} <br />
                <span className="neon-text-red">{current.title.split(' ').slice(1).join(' ')}</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-xl drop-shadow-lg line-clamp-3">
                {current.synopsis}
              </p>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onPlay(current)}
                  className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-3 hover:bg-akatsuki-red hover:text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Watch Now
                </button>
                <button 
                  onClick={() => onInfo(current)}
                  className="bg-white/10 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-3 hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Info className="w-6 h-6" />
                  Details
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute right-12 bottom-12 flex items-center gap-6">
        <div className="flex items-center gap-2">
          {animes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-12 bg-akatsuki-red shadow-[0_0_10px_rgba(255,0,51,0.8)]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setIndex((prev) => (prev - 1 + animes.length) % animes.length)}
            className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setIndex((prev) => (prev + 1) % animes.length)}
            className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Scroll</span>
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  );
};
