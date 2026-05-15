import React from 'react';
import { motion } from 'motion/react';
import { Brain, Gamepad2, Award, Zap, ChevronRight, Play, Trophy } from 'lucide-react';

interface DashboardProps {
  userStats: any;
  setActiveView: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userStats, setActiveView }) => {
  const featuredGames = [
    { id: 'wordle', title: 'Anime Wordle', description: 'Guess the character by clues', icon: Zap, color: 'text-akatsuki-cyan' },
    { id: 'higher-lower', title: 'Higher or Lower', description: 'Compare MAL ratings', icon: Gamepad2, color: 'text-akatsuki-purple' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 rounded-3xl overflow-hidden glass border border-white/10 group bg-[url('https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=2692&auto=format&fit=crop')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-akatsuki-bg via-akatsuki-bg/80 to-transparent flex flex-col justify-center p-8 md:p-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-akatsuki-red font-black tracking-widest text-xs mb-2 block animate-pulse">SEASONAL EVENT LIVE</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">UNLEASH YOUR <br /><span className="neon-text-red">INNER OTAKU</span></h1>
            <p className="text-gray-400 max-w-md text-sm md:text-base mb-6 leading-relaxed">
              Take daily quizzes, play exclusive mini-games, and climb the global leaderboard to become the Hokage of Aniverse.
            </p>
            <button 
              onClick={() => setActiveView('quizzes')}
              className="btn-primary flex items-center gap-2 group"
            >
              Start Your Journey
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: userStats.xp, icon: Award, color: 'text-akatsuki-red' },
          { label: 'Level', value: userStats.level, icon: Zap, color: 'text-yellow-400' },
          { label: 'Streak', value: `${userStats.streak} Days`, icon: Play, color: 'text-akatsuki-cyan' },
          { label: 'Rank', value: userStats.title, icon: Brain, color: 'text-akatsuki-purple' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all group"
          >
            <div className={`p-2 rounded-lg bg-white/5 w-fit mb-3 transition-transform group-hover:scale-110 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Featured Mini-Games */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-akatsuki-red" />
              Featured Games
            </h2>
            <button onClick={() => setActiveView('games')} className="text-akatsuki-red text-xs font-black uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {featuredGames.map((game, i) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:neon-border-red transition-all cursor-pointer group"
                onClick={() => setActiveView('games')}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 transition-colors group-hover:bg-akatsuki-red/20 ${game.color}`}>
                  <game.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">{game.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{game.description}</p>
                <div className="flex items-center text-xs font-black uppercase tracking-widest text-akatsuki-red group-hover:translate-x-2 transition-transform">
                  Play Now <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Rankings Preview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Top Heroes
          </h2>
          <div className="glass rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
            {[1, 2, 3, 4, 5].map((pos) => (
              <div key={pos} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className={`w-6 h-6 flex items-center justify-center font-black rounded ${
                  pos === 1 ? 'bg-yellow-400 text-black' : pos === 2 ? 'bg-gray-300 text-black' : pos === 3 ? 'bg-orange-400 text-black' : 'text-gray-500'
                }`}>
                  {pos}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white group-hover:text-akatsuki-red transition-colors">Uzunyan_99</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black">Genin • Level 12</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">4,250</p>
                  <p className="text-[10px] text-gray-500 font-bold">XP</p>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setActiveView('rankings')}
              className="w-full py-4 text-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors bg-white/5"
            >
              View Full Rankings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
