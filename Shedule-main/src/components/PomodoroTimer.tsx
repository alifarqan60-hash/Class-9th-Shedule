import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Flame, BookOpen, CheckCircle } from 'lucide-react';
import { SUBJECT_STATS } from '../data/scheduleData';
import { SubjectName } from '../types';
import confetti from 'canvas-confetti';

interface PomodoroTimerProps {
  initialSubject?: SubjectName;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ initialSubject }) => {
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(initialSubject || 'Mathematics');
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 mins default
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound generator using Web Audio API
  const playBellSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5); // A5 note

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsRunning(false);
            playBellSound();

            if (mode === 'study') {
              confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
              setCompletedSessions(c => c + 1);
              setMode('break');
              return 10 * 60; // 10 min break
            } else {
              setMode('study');
              return 50 * 60; // 50 min study
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, soundEnabled]);

  const handleModeSwitch = (newMode: 'study' | 'break') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'study' ? 50 * 60 : 10 * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'study' ? 50 * 60 : 10 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const totalDuration = mode === 'study' ? 50 * 60 : 10 * 60;
  const progressPercent = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Main Timer Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg text-center space-y-6 relative overflow-hidden">
        
        {/* Top Mode Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              mode === 'study'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            }`}>
              {mode === 'study' ? '🔥 50-Min Focus Session' : '☕ 10-Min Recharge Break'}
            </span>
          </div>

          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Toggle Sound Bell"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        {/* Subject Selector Pills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Target Subject:</span>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {SUBJECT_STATS.map(s => (
              <button
                key={s.name}
                onClick={() => setSelectedSubject(s.name)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold cursor-pointer transition-all border ${
                  selectedSubject === s.name
                    ? `${s.bgColor} ${s.textColor} ${s.borderColor} shadow-xs font-black ring-2 ring-amber-500`
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Large Timer Countdown Display */}
        <div className="py-4">
          <div className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
            {formattedTime}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden max-w-md mx-auto">
            <div
              className={`h-full transition-all duration-1000 rounded-full ${
                mode === 'study' ? 'bg-gradient-to-r from-amber-500 to-rose-600' : 'bg-gradient-to-r from-emerald-500 to-teal-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsRunning(prev => !prev)}
            className={`px-8 py-3.5 rounded-2xl text-base font-black text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 ${
              isRunning
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" /> Pause Session
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" /> Start Study Timer
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Buttons */}
        <div className="flex justify-center gap-2 pt-2">
          <button
            onClick={() => handleModeSwitch('study')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              mode === 'study' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Study (50m)
          </button>
          <button
            onClick={() => handleModeSwitch('break')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              mode === 'break' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            Break (10m)
          </button>
        </div>

        {/* Completed Blocks Stats */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
          <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
          <span>Completed Today: <strong className="text-slate-900 dark:text-white font-black">{completedSessions} Focus Blocks</strong> ({completedSessions * 50} mins)</span>
        </div>

      </div>

    </div>
  );
};
