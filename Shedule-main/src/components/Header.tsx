import React from 'react';
import { Calendar, BarChart3, Clock, BookOpen, Presentation, Download, Printer, Moon, Sun, CheckCircle2, Sparkles } from 'lucide-react';
import { exportToPowerPoint } from '../utils/pptxExport';

interface HeaderProps {
  activeTab: 'schedule' | 'subjects' | 'routine' | 'strategies' | 'timer' | 'presentation';
  setActiveTab: (tab: 'schedule' | 'subjects' | 'routine' | 'strategies' | 'timer' | 'presentation') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  completedDaysCount: number;
  totalDays: number;
  totalPages: number;
  completedPages: number;
  isExporting: boolean;
  setIsExporting: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  completedDaysCount,
  totalDays,
  totalPages,
  completedPages,
  isExporting,
  setIsExporting
}) => {
  const percentComplete = Math.round((completedDaysCount / totalDays) * 100);

  const handleExportPPT = async () => {
    try {
      setIsExporting(true);
      await exportToPowerPoint();
    } catch (err) {
      console.error('PPT Export Error:', err);
      alert('Failed to generate PowerPoint file. Please check console.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Logo & Main Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                  Federal Board Class 9
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                  29 July - 22 Aug 2026
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                22 Days Intensive Study Schedule
              </h1>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div className="bg-slate-100 dark:bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Progress:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{completedDaysCount}/{totalDays} Days ({percentComplete}%)</span>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Pages:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{completedPages}/{totalPages} (57/day)</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              <button
                onClick={handleExportPPT}
                disabled={isExporting}
                title="Download PowerPoint Presentation (.pptx)"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Exporting...' : 'Export PPT (.pptx)'}</span>
              </button>

              <button
                onClick={handlePrint}
                title="Print or Save as PDF"
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDarkMode(prev => !prev)}
                title="Toggle Dark/Light Mode"
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
            </div>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="mt-3 w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-3 flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>22-Day Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('presentation')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'presentation'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50'
            }`}
          >
            <Presentation className="w-4 h-4 animate-bounce" />
            <span>PowerPoint Deck Mode</span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'subjects'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Subject Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('routine')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'routine'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Daily Routines</span>
          </button>

          <button
            onClick={() => setActiveTab('strategies')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'strategies'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Strategies & Do's/Don'ts</span>
          </button>

          <button
            onClick={() => setActiveTab('timer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'timer'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pomodoro Study Timer</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
