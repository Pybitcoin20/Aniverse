import React from 'react';
import { motion } from 'motion/react';
import { HeroCarousel } from './HeroCarousel';
import { AnimeCard } from './AnimeCard';
import { AnimeTitle } from '../../types/anime';
import { ANIME_TITLES } from '../../data/animeData';
import { ChevronRight, Play, TrendingUp, Clock, Heart, Plus, Star } from 'lucide-react';

interface HomeViewProps {
  onSelect: (anime: AnimeTitle) => void;
  onPlay: (anime: AnimeTitle) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelect, onPlay }) => {
  const trending = ANIME_TITLES.slice(0, 3);
  const featured = ANIME_TITLES.slice(0, 4);
  const recentlyAdded = ANIME_TITLES.slice(2, 6);
  const highlyRated = ANIME_TITLES.filter(a => a.rating >= 8.8);

  const Section = ({ title, animes, icon: Icon }: { title: string, animes: AnimeTitle[], icon: any }) => (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
          <Icon className="w-8 h-8 text-akatsuki-red" />
          {title}
        </h2>
        <button className="text-gray-500 font-black uppercase text-xs tracking-[0.2em] hover:text-akatsuki-red transition-colors flex items-center gap-1 group">
          View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {animes.map(anime => (
          <AnimeCard key={anime.id} anime={anime} onClick={onSelect} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="pb-24">
      <HeroCarousel animes={trending} onPlay={onPlay} onInfo={onSelect} />

      <div className="px-4 md:px-8 max-w-[1920px] mx-auto">
        <Section title="Trending Now" animes={featured} icon={TrendingUp} />
        
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3 mb-8">
            <Clock className="w-8 h-8 text-akatsuki-purple" />
            Continue Watching
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANIME_TITLES.slice(0, 2).map((anime, i) => (
              <motion.div 
                key={anime.id}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-3xl overflow-hidden border border-white/5 flex h-40 cursor-pointer group"
                onClick={() => onPlay(anime)}
              >
                <div className="relative w-1/2 overflow-hidden">
                  <img src={anime.imageUrl} alt={anime.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white fill-current" />
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center gap-1 flex-1">
                  <p className="text-[10px] text-akatsuki-red font-black uppercase tracking-widest">Episode {i + 4}</p>
                  <h3 className="text-xl font-black text-white line-clamp-1">{anime.title}</h3>
                  <div className="mt-2 w-full bg-white/10 h-1 rounded-full">
                    <div className="h-full bg-akatsuki-red w-[65%]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Section title="Highly Rated" animes={highlyRated} icon={Star} />
        <Section title="Recently Added" animes={recentlyAdded} icon={Heart} />
      </div>
    </div>
  );
};
