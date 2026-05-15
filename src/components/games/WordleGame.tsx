import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, HelpCircle, CheckCircle2, XCircle, RotateCcw, ChevronRight } from 'lucide-react';
import { ANIME_CHARACTERS } from '../../data/animeData';
import { AnimeCharacter } from '../../types/anime';

export const WordleGame: React.FC = () => {
  const [targetCharacter, setTargetCharacter] = useState<AnimeCharacter | null>(null);
  const [guesses, setGuesses] = useState<AnimeCharacter[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const random = ANIME_CHARACTERS[Math.floor(Math.random() * ANIME_CHARACTERS.length)];
    setTargetCharacter(random);
    setGuesses([]);
    setSearchTerm('');
    setGameState('playing');
  };

  const handleGuess = (character: AnimeCharacter) => {
    if (gameState !== 'playing' || guesses.find(g => g.id === character.id)) return;

    const newGuesses = [character, ...guesses];
    setGuesses(newGuesses);
    setSearchTerm('');

    if (character.id === targetCharacter?.id) {
      setGameState('won');
    } else if (newGuesses.length >= 6) {
      setGameState('lost');
    }
  };

  const filteredCharacters = ANIME_CHARACTERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !guesses.find(g => g.id === c.id)
  );

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white mb-2 tracking-tighter">ANIME <span className="neon-text-red">GUESSER</span></h1>
        <p className="text-gray-400 text-sm">Find the mystery character in 6 tries.</p>
      </div>

      {/* Input Area */}
      {gameState === 'playing' && (
        <div className="relative mb-8 z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Type character name..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-akatsuki-red transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <AnimatePresence>
            {searchTerm.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute w-full mt-2 glass rounded-xl border border-white/10 overflow-hidden shadow-2xl max-h-60 overflow-y-auto"
              >
                {filteredCharacters.length > 0 ? (
                  filteredCharacters.map(char => (
                    <button 
                      key={char.id}
                      onClick={() => handleGuess(char)}
                      className="w-full p-4 text-left hover:bg-akatsuki-red/10 border-b border-white/5 last:border-0 flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-white font-bold">{char.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black">{char.anime}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-akatsuki-red transition-colors" />
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm italic">No characters found</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Guesses Board */}
      <div className="space-y-4">
        {guesses.map((guess, i) => (
          <motion.div 
            key={guess.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-5 gap-2"
          >
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center glass ${guess.name === targetCharacter?.name ? 'bg-green-500/20 border-green-500' : 'border-white/5'}`}>
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Name</p>
              <p className="text-xs font-bold text-center text-white">{guess.name}</p>
            </div>
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center glass ${guess.gender === targetCharacter?.gender ? 'bg-green-500/20 border-green-500' : 'bg-red-500/10 border-red-500/20'}`}>
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Gender</p>
              <p className="text-xs font-bold text-white">{guess.gender}</p>
            </div>
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center glass ${guess.anime === targetCharacter?.anime ? 'bg-green-500/20 border-green-500' : 'bg-red-500/10 border-red-500/20'}`}>
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Anime</p>
              <p className="text-xs font-bold text-center text-white truncate w-full">{guess.anime}</p>
            </div>
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center glass ${guess.hairColor === targetCharacter?.hairColor ? 'bg-green-500/20 border-green-500' : 'bg-red-500/10 border-red-500/20'}`}>
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Hair</p>
              <p className="text-xs font-bold text-white">{guess.hairColor}</p>
            </div>
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center glass ${guess.role === targetCharacter?.role ? 'bg-green-500/20 border-green-500' : 'bg-red-500/10 border-red-500/20'}`}>
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Role</p>
              <p className="text-xs font-bold text-white">{guess.role}</p>
            </div>
          </motion.div>
        ))}

        {/* Empty slots */}
        {gameState === 'playing' && Array.from({ length: 6 - guesses.length }).map((_, i) => (
          <div key={`empty-${i}`} className="grid grid-cols-5 gap-2 opacity-30">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="h-16 rounded-xl border border-white/10 glass flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-gray-600" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Game Over Modal */}
      {gameState !== 'playing' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 glass p-8 rounded-3xl border border-akatsuki-red/20 text-center"
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${gameState === 'won' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
            {gameState === 'won' ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>
          <h2 className="text-2xl font-black text-white mb-2">{gameState === 'won' ? 'PERFECT GUESS!' : 'MISSION FAILED'}</h2>
          <p className="text-gray-400 mb-6"> {gameState === 'won' ? `You identified ${targetCharacter?.name} in ${guesses.length} tries.` : `The character was ${targetCharacter?.name} from ${targetCharacter?.anime}`}</p>
          <button 
            onClick={startNewGame}
            className="btn-primary w-full max-w-xs flex items-center justify-center gap-2 py-4 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};
