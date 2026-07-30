import React, { useState } from 'react';
import { TIMETABLES } from '../data/scheduleData';
import { Clock, Sun, Coffee, Utensils, BookOpen, Award, CheckCircle, Flame } from 'lucide-react';

export const DailyRoutineView: React.FC = () => {
  const [activeRoutine, setActiveRoutine] = useState<'regular' | 'revision' | 'mock'>('regular');

  const slots = TIMETABLES[activeRoutine];

  const getSlotStyle = (type: string) => {
    switch (type) {
      case 'study':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/40',
          border: 'border-blue-200 dark:border-blue-900',
          badgeBg: 'bg-blue-500 text-white',
          text: 'text-blue-900 dark:text-blue-200',
          icon: <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        };
      case 'revision':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/40',
          border: 'border-amber-200 dark:border-amber-900',
          badgeBg: 'bg-amber-500 text-white',
          text: 'text-amber-900 dark:text-amber-200',
          icon: <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        };
      case 'test':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/40',
          border: 'border-rose-200 dark:border-rose-900',
          badgeBg: 'bg-rose-600 text-white',
          text: 'text-rose-900 dark:text-rose-200',
          icon: <Award className="w-4 h-4 text-rose-600 dark:text-rose-400" />
        };
      case 'break':
      case 'meal':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/40',
          border: 'border-emerald-200 dark:border-emerald-900',
          badgeBg: 'bg-emerald-600 text-white',
          text: 'text-emerald-900 dark:text-emerald-200',
          icon: <Coffee className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        };
      case 'rest':
      default:
        return {
          bg: 'bg-slate-50 dark:bg-slate-800/40',
          border: 'border-slate-200 dark:border-slate-700',
          badgeBg: 'bg-slate-600 text-white',
          text: 'text-slate-800 dark:text-slate-300',
          icon: <Sun className="w-4 h-4 text-slate-500" />
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Selector Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-500" />
            Recommended Daily Timetable & Time Blocks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select a routine schedule to view exact hourly study time blocks, breaks, and meal slots.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveRoutine('regular')}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
              activeRoutine === 'regular'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-sm">
              <span>REGULAR STUDY DAY</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/20">Days 1-8, 10-13, 15-16</span>
            </div>
            <p className="text-xs opacity-90 mt-1">8-10 Hours split into Subject 1, Subject 2 & Evening Revision</p>
          </button>

          <button
            onClick={() => setActiveRoutine('revision')}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
              activeRoutine === 'revision'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-sm">
              <span>⭐ REVISION DAY</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/20">Days 9, 14, 17-18, 21-22</span>
            </div>
            <p className="text-xs opacity-90 mt-1">9 Hours total: Round 1 (Morning) + Round 2 (Afternoon)</p>
          </button>

          <button
            onClick={() => setActiveRoutine('mock')}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
              activeRoutine === 'mock'
                ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-sm">
              <span>✍️ MOCK TEST DAY</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/20">Days 19-20</span>
            </div>
            <p className="text-xs opacity-90 mt-1">6-Hour Full Mock Exam + 3-Hour Answer & Mistake Analysis</p>
          </button>
        </div>
      </div>

      {/* Routine Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
          Hourly Routine Breakdown ({activeRoutine.toUpperCase()} SCHEDULE)
        </h3>

        <div className="space-y-3">
          {slots.map((slot, idx) => {
            const style = getSlotStyle(slot.type);

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${style.border} ${style.bg} flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-2xs flex-shrink-0">
                    {style.icon}
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                      {slot.time}
                    </span>
                    <p className={`text-sm sm:text-base font-bold ${style.text}`}>
                      {slot.activity}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${style.badgeBg}`}>
                    {slot.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
