import React from 'react';
import { motion } from 'motion/react';
import { Play, Star, Plus, Share2, ChevronLeft, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { AnimeTitle } from '../../types/anime';

interface AnimeDetailsProps {
  anime: AnimeTitle;
  onBack: () => void;
  onPlay: (anime: AnimeTitle, episode?: number) => void;
}

export const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime, onBack, onPlay }) => {
  return (
    <div className="min-h-screen pb-24">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 p-4 rounded-2xl glass border border-white/10 text-white hover:neon-border-red transition-all flex items-center gap-2 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        <span className="font-black uppercase tracking-widest text-xs">Home</span>
      </button>

      {/* Hero Header */}
      <div className="relative h-[65vh] w-full">
        <img 
          src={anime.bannerUrl} 
          alt={anime.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-akatsuki-bg via-akatsuki-bg/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-24 pb-12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row items-end gap-8"
          >
            {/* Poster */}
            <div className="hidden md:block w-64 aspect-[2/3] rounded-2xl overflow-hidden glass border-4 border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] shrink-0">
              <img src={anime.imageUrl} alt={anime.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded font-black text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  {anime.rating}
                </div>
                <div className="flex items-center gap-1 bg-white/10 text-white px-3 py-1 rounded font-black text-sm backdrop-blur-md">
                  <Calendar className="w-4 h-4" />
                  {anime.year}
                </div>
                <div className="flex items-center gap-1 bg-white/10 text-white px-3 py-1 rounded font-black text-sm backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4" />
                  HD
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                {anime.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => onPlay(anime)}
                  className="bg-akatsuki-red text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-3 hover:bg-white hover:text-akatsuki-red transition-all shadow-[0_0_30px_rgba(255,0,51,0.4)]"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Play Episode 1
                </button>
                <button className="bg-white/10 backdrop-blur-xl border border-white/10 text-white px-8 py-5 rounded-2xl font-black text-xl flex items-center gap-3 hover:bg-white/20 transition-all">
                  <Plus className="w-6 h-6" />
                  Add to List
                </button>
                <button className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-8 md:px-24 mt-12 grid md:grid-cols-3 gap-12">
        {/* Left Column: Synopsis & Metadata */}
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              <span className="w-1 h-6 bg-akatsuki-red rounded-full" />
              Synopsis
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {anime.synopsis}
            </p>
            <div className="flex flex-wrap gap-2 mt-8">
              {anime.genres.map(genre => (
                <span key={genre} className="px-4 py-2 bg-white/5 rounded-xl text-sm font-bold text-gray-300 border border-white/5 hover:border-akatsuki-red/30 transition-colors cursor-default">
                  {genre}
                </span>
              ))}
            </div>
          </section>

          {/* Episode List */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                <span className="w-1 h-6 bg-akatsuki-purple rounded-full" />
                Episodes
              </h2>
              <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">{anime.episodes?.length || 0} Episodes Total</span>
            </div>
            
            <div className="space-y-4">
              {anime.episodes?.map(ep => (
                <motion.div 
                  key={ep.number}
                  whileHover={{ x: 10 }}
                  onClick={() => onPlay(anime, ep.number)}
                  className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-6 cursor-pointer group hover:bg-white/5"
                >
                  <div className="relative w-48 aspect-video rounded-xl overflow-hidden shrink-0">
                    <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-akatsuki-red font-black text-xs uppercase tracking-widest">Episode {ep.number}</span>
                      <div className="flex items-center gap-1 text-gray-500 text-xs font-bold">
                        <Clock className="w-3 h-3" />
                        {ep.duration}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-white group-hover:text-akatsuki-red transition-colors">{ep.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-1 mt-2">Summary of the intense battle occurring in this episode...</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Cast & Info */}
        <div className="space-y-12">
          <section className="glass rounded-3xl p-8 border border-white/5">
            <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">Details Info</h3>
            <div className="space-y-6">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500 font-bold text-sm uppercase">Status</span>
                <span className="text-white font-black text-sm">{anime.status}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500 font-bold text-sm uppercase">Studios</span>
                <span className="text-white font-black text-sm">Aniverse Studios</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500 font-bold text-sm uppercase">Format</span>
                <span className="text-white font-black text-sm">TV Series</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-500 font-bold text-sm uppercase">Popularity</span>
                <span className="text-white font-black text-sm">#{anime.popularity.toLocaleString()}</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">Recommended</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[2/3] rounded-xl overflow-hidden glass border border-white/5 group cursor-pointer relative">
                  <img src={`https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=400&i=${i}`} alt="Rec" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black flex items-end p-2">
                    <p className="text-[10px] font-black text-white uppercase text-center w-full">Anime Title {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
