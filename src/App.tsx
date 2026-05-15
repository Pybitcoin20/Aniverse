import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { HomeView } from './components/streaming/HomeView';
import { AnimeDetails } from './components/streaming/AnimeDetails';
import { EpisodePlayer } from './components/streaming/EpisodePlayer';
import { QuizSystem } from './components/quiz/QuizSystem';
import { WordleGame } from './components/games/WordleGame';
import { HigherLowerGame } from './components/games/HigherLowerGame';
import { UserStats, AnimeTitle } from './types/anime';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ShieldAlert, Sparkles, Gamepad2 } from 'lucide-react';

const INITIAL_STATS: UserStats = {
  level: 1,
  xp: 1500,
  title: 'Chūnin',
  badges: [],
  streak: 5,
  lastPlayed: new Date().toISOString(),
  watchlist: [],
};

export default function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'quizzes' | 'games' | 'rankings' | 'profile' | 'details' | 'player'>('dashboard');
  const [selectedAnime, setSelectedAnime] = useState<AnimeTitle | null>(null);
  const [activeEpisode, setActiveEpisode] = useState<number>(1);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_STATS);
  const [activeGame, setActiveGame] = useState<'none' | 'wordle' | 'higher-lower'>('none');

  useEffect(() => {
    const saved = localStorage.getItem('aniverse_stats');
    if (saved) {
      setUserStats(JSON.parse(saved));
    }
  }, []);

  const saveStats = (newStats: UserStats) => {
    setUserStats(newStats);
    localStorage.setItem('aniverse_stats', JSON.stringify(newStats));
  };

  const handleQuizComplete = (earnedXP: number) => {
    const newXP = userStats.xp + earnedXP;
    const newLevel = Math.floor(newXP / 1000) + 1;
    saveStats({ ...userStats, xp: newXP, level: newLevel });
    setActiveView('dashboard');
  };

  const handleSelectAnime = (anime: AnimeTitle) => {
    setSelectedAnime(anime);
    setActiveView('details');
  };

  const handlePlayAnime = (anime: AnimeTitle, ep: number = 1) => {
    setSelectedAnime(anime);
    setActiveEpisode(ep);
    setActiveView('player');
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <HomeView onSelect={handleSelectAnime} onPlay={handlePlayAnime} />;
      
      case 'details':
        return selectedAnime ? (
          <AnimeDetails 
            anime={selectedAnime} 
            onBack={() => setActiveView('dashboard')} 
            onPlay={handlePlayAnime} 
          />
        ) : null;

      case 'player':
        return selectedAnime ? (
          <EpisodePlayer 
            anime={selectedAnime} 
            episodeNumber={activeEpisode} 
            onBack={() => setActiveView('details')} 
          />
        ) : null;

      case 'quizzes':
        return <QuizSystem onComplete={handleQuizComplete} />;
      
      case 'games':
        if (activeGame === 'wordle') return <div className="p-8"><button onClick={() => setActiveGame('none')} className="btn-outline mb-8">&larr; Back</button><WordleGame /></div>;
        if (activeGame === 'higher-lower') return <div className="p-8"><button onClick={() => setActiveGame('none')} className="btn-outline mb-8">&larr; Back</button><HigherLowerGame /></div>;
        
        return (
          <div className="p-8 space-y-8">
            <h1 className="text-4xl font-black text-white tracking-tighter">ELITE <span className="neon-text-cyan">MINI-GAMES</span></h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div onClick={() => setActiveGame('wordle')} className="glass p-8 rounded-3xl border border-white/5 hover:neon-border-red transition-all cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-akatsuki-cyan/20 text-akatsuki-cyan flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Anime Wordle</h3>
                <p className="text-gray-400 mb-6">Guess the character using traits and feedback clues.</p>
                <div className="flex items-center gap-2 text-akatsuki-red font-black uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                  Play Level <Gamepad2 className="w-4 h-4" />
                </div>
              </div>
              <div onClick={() => setActiveGame('higher-lower')} className="glass p-8 rounded-3xl border border-white/5 hover:neon-border-purple transition-all cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-akatsuki-purple/20 text-akatsuki-purple flex items-center justify-center mb-6">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Higher or Lower</h3>
                <p className="text-gray-400 mb-6">Test your knowledge of anime rankings and popularity.</p>
                <div className="flex items-center gap-2 text-akatsuki-purple font-black uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                  Play Level <Gamepad2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'rankings':
        return (
          <div className="p-8 space-y-8">
            <h1 className="text-4xl font-black text-white tracking-tighter">GLOBAL <span className="neon-text-red">RANKINGS</span></h1>
            <div className="glass rounded-3xl overflow-hidden border border-white/5">
              <div className="p-8 bg-akatsuki-red/10 border-b border-akatsuki-red/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-black font-black text-3xl shadow-[0_0_20px_rgba(250,204,21,0.4)]">#1</div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Shadow_Slayer</h2>
                    <p className="text-xs font-black text-yellow-400 uppercase tracking-widest">Global Master • Level 89</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-white">1,245,600 XP</p>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">All-time Score</p>
                </div>
              </div>
              
              <div className="p-4 md:p-8 space-y-4">
                {[2, 3, 4, 5, 6].map((pos) => (
                  <div key={pos} className="flex items-center gap-6 p-4 hover:bg-white/5 transition-all rounded-2xl border border-transparent hover:border-white/10 group">
                    <span className="w-8 text-center font-black text-2xl text-gray-500 group-hover:text-white transition-colors">{pos}</span>
                    <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden border border-white/5">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${pos}`} alt="user" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">Rival_Kun_{pos}</h4>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Chūnin • Level {20 - pos}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-white">{45000 / pos} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="p-8 space-y-8">
             <h1 className="text-4xl font-black text-white tracking-tighter">PLAYER <span className="neon-text-cyan">PROFILE</span></h1>
             <div className="grid md:grid-cols-3 gap-8">
               <div className="glass p-8 rounded-3xl border border-white/5 text-center flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-akatsuki-red to-akatsuki-purple p-1 mb-6">
                    <div className="w-full h-full rounded-full bg-akatsuki-bg flex items-center justify-center overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anime" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-white underline decoration-akatsuki-red underline-offset-4 mb-2">User_420</h2>
                  <p className="text-xs font-black text-akatsuki-red uppercase tracking-widest mb-6">{userStats.title} Rank</p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white/5 p-4 rounded-2xl">
                      <p className="text-xl font-black text-white">{userStats.level}</p>
                      <p className="text-[10px] text-gray-500 font-black uppercase">Level</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl">
                      <p className="text-xl font-black text-white">{userStats.xp}</p>
                      <p className="text-[10px] text-gray-500 font-black uppercase">TOTAL XP</p>
                    </div>
                  </div>
               </div>
               
               <div className="md:col-span-2 space-y-6">
                 <h3 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tighter">
                   <Trophy className="w-5 h-5 text-yellow-400" />
                   Unlocked Badges
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['Naruto Fan', 'Quiz Master', 'MAL Guru', 'Early Access'].map(badge => (
                      <div key={badge} className="glass p-4 rounded-2xl border border-white/5 text-center flex flex-col items-center group hover:neon-border-purple transition-all">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Sparkles className="w-6 h-6 text-akatsuki-purple" />
                        </div>
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">{badge}</p>
                      </div>
                    ))}
                 </div>
               </div>
             </div>
          </div>
        );

      default:
        return <HomeView onSelect={handleSelectAnime} onPlay={handlePlayAnime} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} userStats={userStats}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView + (selectedAnime?.id || 'none')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
