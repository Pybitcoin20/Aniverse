import React from 'react';
import { Sword, Gamepad2, Trophy, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: any) => void;
  userStats: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, userStats }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Sword },
    { id: 'quizzes', label: 'Quizzes', icon: Menu },
    { id: 'games', label: 'Mini-Games', icon: Gamepad2 },
    { id: 'rankings', label: 'Rankings', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-akatsuki-bg">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 glass z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-akatsuki-red rounded flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(255,0,51,0.5)]">A</div>
          <span className="font-black text-xl tracking-tighter neon-text-red">ANIVERSE</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-400">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed md:static inset-y-0 left-0 w-64 glass border-r border-white/10 z-40 transition-all flex flex-col ${isSidebarOpen ? 'block' : 'hidden md:flex'}`}
          >
            <div className="p-8 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-akatsuki-red rounded-lg flex items-center justify-center font-black text-xl text-white shadow-[0_0_15px_rgba(255,0,51,0.6)]">A</div>
                <span className="font-black text-2xl tracking-tighter neon-text-red">ANIVERSE</span>
              </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    activeView === item.id 
                    ? 'bg-akatsuki-red/10 border border-akatsuki-red/30 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-akatsuki-red' : 'group-hover:text-akatsuki-red'}`} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-white/5 mt-auto">
              <div className="glass p-4 rounded-xl border border-akatsuki-red/20 shadow-[0_0_15px_rgba(255,0,51,0.05)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-akatsuki-red to-akatsuki-purple p-[2px]">
                    <div className="w-full h-full rounded-full bg-akatsuki-bg flex items-center justify-center overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anime" alt="Avatar" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white truncate">{userStats.title} Rank</p>
                    <p className="text-[10px] uppercase tracking-widest text-akatsuki-red font-black">Level {userStats.level}</p>
                  </div>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(userStats.xp % 1000) / 10}%` }}
                    className="h-full bg-akatsuki-red shadow-[0_0_10px_rgba(255,0,51,0.8)]"
                  />
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,51,0.05)_0%,transparent_50%)]">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
