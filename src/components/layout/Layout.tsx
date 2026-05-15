import React from 'react';
import { Sword, Gamepad2, Trophy, User, Menu, Search, Home, Bell, Bookmark, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: any) => void;
  userStats: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, userStats }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Bookmark }, // Mock link
    { id: 'quizzes', label: 'Quizzes', icon: Sword },
    { id: 'games', label: 'Mini-Games', icon: Gamepad2 },
    { id: 'rankings', label: 'Rankings', icon: Trophy },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-akatsuki-bg overflow-x-hidden">
      {/* Sidebar / Desktop Navigation */}
      <aside className="hidden md:flex w-24 hover:w-64 transition-all duration-500 glass border-r border-white/5 z-50 flex-col group overflow-hidden">
        <div className="p-6 flex justify-center group-hover:justify-start items-center transition-all">
          <div className="w-12 h-12 bg-akatsuki-red rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-[0_0_20px_rgba(255,0,51,0.6)] shrink-0">A</div>
          <span className="ml-4 font-black text-2xl opacity-0 group-hover:opacity-100 transition-opacity neon-text-red whitespace-nowrap">ANIVERSE</span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-4 py-4 rounded-2xl transition-all duration-300 relative group/item ${
                activeView === item.id 
                ? 'bg-akatsuki-red/10 text-white' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-6 h-6 shrink-0 ${activeView === item.id ? 'text-akatsuki-red' : 'group-hover:text-akatsuki-red'}`} />
              <span className="ml-6 font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">{item.label}</span>
              {activeView === item.id && (
                <motion.div layoutId="nav-active" className="absolute left-[-4px] top-4 bottom-4 w-1 bg-akatsuki-red rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-4">
          <button className="w-full flex items-center px-4 py-4 text-gray-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
            <Bell className="w-6 h-6" />
            <span className="ml-6 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Notifications</span>
          </button>
          <button 
            onClick={() => setActiveView('profile')}
            className="w-full flex items-center px-2 py-2 rounded-2xl hover:bg-white/5 transition-all group/profile"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover/profile:border-akatsuki-red transition-colors">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anime" alt="Avatar" />
            </div>
            <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <p className="text-xs font-black text-white">{userStats.title}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Level {userStats.level}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-screen overflow-y-auto overflow-x-hidden">
        {/* Header / Search */}
        <header className="sticky top-0 z-40 px-8 py-6 flex items-center justify-between pointer-events-none">
          <div className="flex-1 max-w-xl group pointer-events-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-akatsuki-red transition-colors" />
              <input 
                type="text" 
                placeholder="Search for anime, characters, or studios..."
                className="w-full h-16 bg-akatsuki-card/30 backdrop-blur-3xl border border-white/5 rounded-[1.5rem] pl-16 pr-8 text-white focus:outline-none focus:border-akatsuki-red focus:bg-akatsuki-card/80 transition-all font-bold placeholder:text-gray-600 shadow-2xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            <button className="hidden md:flex items-center gap-2 glass px-6 py-3 rounded-2xl border border-white/10 text-white font-black hover:neon-border-red transition-all group">
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              Settings
            </button>
          </div>
        </header>

        {/* Dynamic Mobile Nav (Floating) */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm glass backdrop-blur-3xl border border-white/10 rounded-full h-20 px-4 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
           {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`p-4 rounded-full transition-all ${activeView === item.id ? 'text-akatsuki-red scale-125' : 'text-gray-500'}`}
            >
              <item.icon className="w-6 h-6" />
            </button>
          ))}
        </div>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
