import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Settings, ChevronLeft, Subtitles, MessageSquare } from 'lucide-react';
import { AnimeTitle } from '../../types/anime';

interface EpisodePlayerProps {
  anime: AnimeTitle;
  episodeNumber?: number;
  onBack: () => void;
}

export const EpisodePlayer: React.FC<EpisodePlayerProps> = ({ anime, episodeNumber = 1, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Video Content Placeholder */}
      <div className="w-full h-full relative cursor-none" onMouseMove={() => setShowControls(true)} onMouseLeave={() => setShowControls(false)}>
        <img 
          src={anime.bannerUrl} 
          className={`w-full h-full object-cover opacity-60 transition-all duration-1000 ${isPlaying ? 'scale-105' : 'scale-100 grayscale-[0.5]'}`} 
          alt="Video content"
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* UI Overlay */}
        <div className={`absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-500 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className="flex items-center gap-4 text-white hover:text-akatsuki-red transition-colors group"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-2 transition-transform" />
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">{anime.title}</h2>
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Episode {episodeNumber}: The Beginning of Chaos</p>
              </div>
            </button>
            
            <div className="flex items-center gap-6">
              <button className="text-white hover:text-akatsuki-red transition-colors"><Subtitles className="w-6 h-6" /></button>
              <button className="text-white hover:text-akatsuki-red transition-colors"><MessageSquare className="w-6 h-6" /></button>
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-xs font-bold text-white">1080p</div>
            </div>
          </div>

          {/* Center Play/Pause Overlay */}
          <div className="flex items-center justify-center">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-24 h-24 rounded-full bg-akatsuki-red text-white flex items-center justify-center shadow-[0_0_50px_rgba(255,0,51,0.5)]"
            >
              {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
            </motion.button>
          </div>

          {/* Bottom Controls */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2 group/progress">
              <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-akatsuki-red relative"
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white] scale-0 group-hover/progress:scale-100 transition-transform" />
                </motion.div>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>08:42</span>
                <span>24:00</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button className="text-white hover:text-akatsuki-red transition-all"><SkipBack className="w-6 h-6 fill-current" /></button>
                <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-akatsuki-red transition-all">
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                </button>
                <button className="text-white hover:text-akatsuki-red transition-all"><SkipForward className="w-6 h-6 fill-current" /></button>
                
                <div className="flex items-center gap-4 group">
                  <Volume2 className="w-6 h-6 text-white" />
                  <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-white" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <button className="flex items-center gap-2 text-white font-bold hover:text-akatsuki-red transition-colors">
                  <Settings className="w-6 h-6" />
                  <span className="text-xs uppercase tracking-widest">Settings</span>
                </button>
                <button className="text-white hover:text-akatsuki-red transition-colors">
                  <Maximize className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
