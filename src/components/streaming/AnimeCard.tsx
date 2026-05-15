import React from 'react';
import { motion } from 'motion/react';
import { Star, Play, Plus, Info } from 'lucide-react';
import { AnimeTitle } from '../../types/anime';

interface AnimeCardProps {
  anime: AnimeTitle;
  onClick: (anime: AnimeTitle) => void;
  onPlay: (anime: AnimeTitle) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick, onPlay }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative aspect-[2/3] rounded-2xl overflow-hidden glass border border-white/5 cursor-pointer group shadow-2xl"
      onClick={() => onClick(anime)}
    >
      {/* Poster Image */}
      <img 
        src={anime.imageUrl} 
        alt={anime.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-akatsuki-bg/90 via-akatsuki-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-black text-white mb-2 leading-tight drop-shadow-lg">{anime.title}</h3>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
              <Star className="w-4 h-4 fill-yellow-400" />
              {anime.rating}
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white font-bold uppercase">{anime.status}</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onPlay(anime); }}
              className="flex-1 bg-white text-black py-2 rounded-lg font-black text-sm flex items-center justify-center gap-2 hover:bg-akatsuki-red hover:text-white transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch
            </button>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Static Info (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-akatsuki-bg pointer-events-none group-hover:opacity-0 transition-opacity">
        <h3 className="text-sm font-bold text-white truncate">{anime.title}</h3>
        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{anime.genres[0]} • {anime.year}</p>
      </div>

      {/* Top Badge */}
      {anime.rating >= 9 && (
        <div className="absolute top-3 left-3 bg-akatsuki-red text-white text-[10px] font-black px-2 py-1 rounded shadow-[0_0_10px_rgba(255,0,51,0.5)] z-10">
          MUST WATCH
        </div>
      )}
    </motion.div>
  );
};
