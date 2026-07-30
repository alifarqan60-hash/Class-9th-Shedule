import React from 'react';
import { SUCCESS_PRINCIPLES, DOS_AND_DONTS } from '../data/scheduleData';
import { ChecklistItem } from '../types';
import { BookOpen, CheckCircle, XCircle, Flame, Award, CheckCircle2, Circle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StrategiesViewProps {
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
}

export const StrategiesView: React.FC<StrategiesViewProps> = ({
  checklist,
  toggleChecklistItem
}) => {
  const completedChecklistCount = checklist.filter(c => c.completed).length;

  const handleChecklistToggle = (id: string, isCurrentlyCompleted: boolean) => {
    if (!isCurrentlyCompleted) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 }
      });
    }
    toggleChecklistItem(id);
  };

  return (
    <div className="space-y-8">
      
      {/* Confidence Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              Confidence Building Milestones Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Tick off key milestones as you progress through the 22-day schedule to build unshakeable exam readiness!
            </p>
          </div>

          <div className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
            {completedChecklistCount}/{checklist.length} Milestones Achieved
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => handleChecklistToggle(item.id, item.completed)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                item.completed
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-700 dark:text-slate-300'
              }`}
            >
              <button className="mt-0.5 cursor-pointer">
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </button>

              <div className="text-xs sm:text-sm font-semibold">
                <span className={`block ${item.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                  {item.label}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-0.5 block">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 Core Principles */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Flame className="w-6 h-6 text-amber-500" />
          5 High-Efficiency Study Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUCCESS_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 relative overflow-hidden"
            >
              <div className={`h-1.5 absolute top-0 left-0 right-0 bg-gradient-to-r ${principle.color}`} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white pt-1">
                {principle.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* DO's */}
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900/60 space-y-4">
          <h3 className="text-lg font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Essential Do's (Class 9 Exam Mastery)
          </h3>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            {DOS_AND_DONTS.dos.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DON'Ts */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl p-6 border border-rose-200 dark:border-rose-900/60 space-y-4">
          <h3 className="text-lg font-black text-rose-800 dark:text-rose-300 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" />
            Critical Don'ts (Avoid Loss of Marks)
          </h3>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            {DOS_AND_DONTS.donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
