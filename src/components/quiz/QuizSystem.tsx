import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Timer, Award, CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/animeData';
import { Question } from '../../types/anime';

interface QuizSystemProps {
  onComplete: (score: number) => void;
}

export const QuizSystem: React.FC<QuizSystemProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'active' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [sessionResults, setSessionResults] = useState<{questionId: string, correct: boolean, timeUsed: number}[]>([]);

  const questions = QUIZ_QUESTIONS;

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(15);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCurrentStep('results');
      onComplete(score);
    }
  }, [currentQuestionIndex, questions.length, score, onComplete]);

  useEffect(() => {
    let timer: any;
    if (currentStep === 'active' && !isAnswered && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1); // Timeout
    }
    return () => clearInterval(timer);
  }, [currentStep, timeLeft, isAnswered]);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctOption;
    
    if (isCorrect) {
      // Points based on time remaining
      const points = 100 + (timeLeft * 10);
      setScore(prev => prev + points);
    }

    setSessionResults(prev => [...prev, {
      questionId: currentQuestion.id,
      correct: isCorrect,
      timeUsed: 15 - timeLeft
    }]);

    setSelectedOption(optionIndex);
    setIsAnswered(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <AnimatePresence mode="wait">
        {currentStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass rounded-3xl p-12 border border-akatsuki-red/20 text-center"
          >
            <div className="w-20 h-20 bg-akatsuki-red/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-akatsuki-red shadow-[0_0_20px_rgba(255,0,51,0.2)]">
              <Brain className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">THE ULTIMATE <br /><span className="neon-text-red">TRIVIA CHALLENGE</span></h1>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-md mx-auto">
              Test your knowledge across Shonen, Seinen, and Classic anime. Fast answers mean more XP. Are you ready?
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm mx-auto">
              <div className="glass p-4 rounded-xl border border-white/5">
                <p className="text-white font-black">{questions.length}</p>
                <p className="text-[10px] text-gray-500 uppercase font-black">Questions</p>
              </div>
              <div className="glass p-4 rounded-xl border border-white/5">
                <p className="text-white font-black">15s</p>
                <p className="text-[10px] text-gray-500 uppercase font-black">Per Round</p>
              </div>
            </div>
            <button 
              onClick={() => setCurrentStep('active')}
              className="btn-primary w-full max-w-xs text-lg py-4 relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                I'm Ready! <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        )}

        {currentStep === 'active' && (
          <motion.div
            key="active"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Quiz Header */}
            <div className="flex items-center justify-between glass p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-akatsuki-red font-black">
                  {currentQuestionIndex + 1}/{questions.length}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">{currentQuestion.category}</p>
                  <p className={`text-xs font-black uppercase ${
                    currentQuestion.difficulty === 'Easy' ? 'text-green-400' :
                    currentQuestion.difficulty === 'Medium' ? 'text-yellow-400' : 'text-akatsuki-red'
                  }`}>{currentQuestion.difficulty}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Score</p>
                  <p className="text-xl font-black text-white px-3 py-1 bg-white/5 rounded-lg border border-white/5">{score}</p>
                </div>
                <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-black text-xl transition-colors ${
                  timeLeft <= 5 ? 'border-akatsuki-red text-akatsuki-red animate-pulse' : 'border-white/10 text-white'
                }`}>
                  {timeLeft}
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div 
                  initial={{ width: '100%' }}
                  animate={{ width: isAnswered ? '0%' : '0%' }}
                  transition={{ duration: 15, ease: 'linear' }}
                  key={currentQuestionIndex}
                  className="h-full bg-akatsuki-red shadow-[0_0_10px_rgba(255,0,51,0.8)]"
                />
              </div>

              <motion.h2 
                key={currentQuestion.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl md:text-3xl font-black text-white mb-12 leading-tight"
              >
                {currentQuestion.question}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx)}
                    className={`p-5 rounded-2xl border transition-all duration-300 text-left font-bold relative group ${
                      isAnswered 
                        ? idx === currentQuestion.correctOption 
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : idx === selectedOption 
                            ? 'bg-red-500/20 border-red-500 text-red-400'
                            : 'bg-white/5 border-white/10 text-gray-500'
                        : 'bg-white/5 border-white/10 hover:border-akatsuki-red hover:bg-akatsuki-red/5 text-white active:scale-95'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs group-hover:bg-akatsuki-red group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </div>
                    {isAnswered && idx === currentQuestion.correctOption && (
                      <CheckCircle2 className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQuestion.correctOption && (
                      <XCircle className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-red-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer Feedback / Next Button */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                    selectedOption === currentQuestion.correctOption ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {selectedOption === currentQuestion.correctOption ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-black text-white text-lg">
                      {selectedOption === currentQuestion.correctOption ? 'Excellent Work!' : 'Not Quite Right...'}
                    </h3>
                    <p className="text-gray-400 text-sm">{currentQuestion.explanation}</p>
                  </div>
                  <button 
                    onClick={handleNext}
                    className="btn-primary flex items-center gap-2 group whitespace-nowrap"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {currentStep === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-12 border border-akatsuki-red/20 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(250,204,21,0.3)] animate-bounce">
              <Award className="w-12 h-12 text-black" />
            </div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">QUIZ COMPLETE</h1>
            <p className="text-akatsuki-red font-black uppercase tracking-[0.2em] mb-12">New Rank Unlocked: Chūnin</p>

            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-12">
              <div className="glass p-6 rounded-3xl border border-white/5">
                <p className="text-3xl font-black text-white">{score}</p>
                <p className="text-[10px] text-gray-500 uppercase font-black">Total XP</p>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5">
                <p className="text-3xl font-black text-white">
                  {sessionResults.filter(r => r.correct).length}/{questions.length}
                </p>
                <p className="text-[10px] text-gray-500 uppercase font-black">Accuracy</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => {
                  setCurrentStep('intro');
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setSessionResults([]);
                }}
                className="btn-outline flex items-center gap-2 py-4 px-8"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary py-4 px-12"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
