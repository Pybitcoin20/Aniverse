import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Star, ChevronRight, RotateCcw, Award } from 'lucide-react';
import { ANIME_TITLES } from '../../data/animeData';
import { AnimeTitle } from '../../types/anime';

export const HigherLowerGame: React.FC = () => {
  const [currentAnime, setCurrentAnime] = useState<AnimeTitle | null>(null);
  const [nextAnime, setNextAnime] = useState<AnimeTitle | null>(null);
  const [comparisonType, setComparisonType] = useState<'rating' | 'popularity'>('rating');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'lost'>('playing');

  const titles = ANIME_TITLES;

  const getRandomAnime = (excludeId?: string) => {
    let filtered = excludeId ? titles.filter(t => t.id !== excludeId) : titles;
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const first = getRandomAnime();
    const second = getRandomAnime(first.id);
    setCurrentAnime(first);
    setNextAnime(second);
    setScore(0);
    setGameState('playing');
  };

  const handleGuess = (isHigher: boolean) => {
    if (!currentAnime || !nextAnime || gameState !== 'playing') return;

    const currentVal = comparisonType === 'rating' ? currentAnime.rating : currentAnime.popularity;
    const nextVal = comparisonType === 'rating' ? nextAnime.rating : nextAnime.popularity;

    const correct = isHigher ? nextVal >= currentVal : nextVal <= currentVal;

    if (correct) {
      setScore(prev => prev + 1);
      setCurrentAnime(nextAnime);
      setNextAnime(getRandomAnime(nextAnime.id));
    } else {
      setGameState('lost');
    }
  };

  if (!currentAnime || !nextAnime) return null;

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter">HIGHER OR <span className="neon-text-purple">LOWER</span></h1>
          <p className="text-gray-400 text-sm">Compare anime by their MyAnimeList score.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass px-6 py-2 rounded-xl border border-akatsuki-purple/30">
            <p className="text-[10px] text-gray-500 uppercase font-black">Current Streak</p>
            <p className="text-2xl font-black text-white">{score}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 relative overflow-hidden rounded-3xl min-h-[500px]">
        {/* Current Anime */}
        <div className="relative group">
          <img src={currentAnime.imageUrl} alt={currentAnime.title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-akatsuki-bg via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-2xl">{currentAnime.title}</h2>
            <div className="glass p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
              <p className="text-xs uppercase font-black text-gray-500 tracking-[0.2em] mb-1">Has a Rating of</p>
              <div className="flex items-center justify-center gap-2 text-4xl font-black text-yellow-400">
                <Star className="w-8 h-8 fill-yellow-400" />
                {currentAnime.rating}
              </div>
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-16 h-16 rounded-full glass border-2 border-white/20 flex items-center justify-center font-black text-white shadow-2xl backdrop-blur-3xl">
            VS
          </div>
        </div>

        {/* Next Anime */}
        <div className="relative group">
          <AnimatePresence mode="wait">
            <motion.div
              key={nextAnime.id}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              className="absolute inset-0"
            >
              <img src={nextAnime.imageUrl} alt={nextAnime.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-akatsuki-bg via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-8 drop-shadow-2xl">{nextAnime.title}</h2>
                
                {gameState === 'playing' ? (
                  <div className="flex flex-col gap-4 w-full max-w-[240px]">
                    <button 
                      onClick={() => handleGuess(true)}
                      className="group relative px-6 py-4 bg-white/5 hover:bg-green-500 rounded-2xl border border-white/10 hover:border-green-400 transition-all active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                    >
                      <TrendingUp className="w-6 h-6 text-green-400 group-hover:text-white transition-colors" />
                      <span className="text-xl font-black text-white">HIGHER</span>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    </button>
                    
                    <button 
                      onClick={() => handleGuess(false)}
                      className="group relative px-6 py-4 bg-white/5 hover:bg-red-500 rounded-2xl border border-white/10 hover:border-red-400 transition-all active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                    >
                      <TrendingDown className="w-6 h-6 text-red-400 group-hover:text-white transition-colors" />
                      <span className="text-xl font-black text-white">LOWER</span>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                    </button>
                  </div>
                ) : (
                  <div className="glass p-6 rounded-2xl border border-white/10 backdrop-blur-xl animate-bounce">
                    <p className="text-xs uppercase font-black text-gray-500 tracking-[0.2em] mb-1">Actually had</p>
                    <div className="flex items-center justify-center gap-2 text-4xl font-black text-akatsuki-red">
                      {nextAnime.rating}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Persistence / Feedback */}
      {gameState === 'lost' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glass p-8 rounded-3xl border border-akatsuki-red/20 text-center"
        >
          <div className="w-16 h-16 bg-akatsuki-red/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-akatsuki-red">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">RUN ENDED</h2>
          <p className="text-gray-400 mb-6">You achieved a streak of <span className="text-white font-black">{score}</span> anime titles correctly compared.</p>
          <button 
            onClick={startNewGame}
            className="btn-primary flex items-center justify-center gap-2 py-4 px-12 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Try to Beat It
          </button>
        </motion.div>
      )}
    </div>
  );
};
