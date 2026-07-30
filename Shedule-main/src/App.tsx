import React, { useState, useEffect } from 'react';
import { SCHEDULE_DAYS, INITIAL_CHECKLIST } from './data/scheduleData';
import { DaySchedule, ChecklistItem, SubjectName } from './types';
import { Header } from './components/Header';
import { ScheduleView } from './components/ScheduleView';
import { SubjectBreakdown } from './components/SubjectBreakdown';
import { DailyRoutineView } from './components/DailyRoutineView';
import { StrategiesView } from './components/StrategiesView';
import { PomodoroTimer } from './components/PomodoroTimer';
import { SlideDeckView } from './components/SlideDeckView';
import { DayDetailModal } from './components/DayDetailModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'subjects' | 'routine' | 'strategies' | 'timer' | 'presentation'>('schedule');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Load saved schedule completion state & notes
  const [days, setDays] = useState<DaySchedule[]>(() => {
    try {
      const saved = localStorage.getItem('fb_class9_schedule_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return SCHEDULE_DAYS.map(d => ({
          ...d,
          completed: !!parsed[d.dayNumber]?.completed,
          notes: parsed[d.dayNumber]?.notes || ''
        }));
      }
    } catch (e) {
      console.error(e);
    }
    return SCHEDULE_DAYS;
  });

  // Load saved checklist
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('fb_class9_checklist_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return INITIAL_CHECKLIST.map(c => ({
          ...c,
          completed: !!parsed[c.id]
        }));
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_CHECKLIST;
  });

  const [selectedDayForModal, setSelectedDayForModal] = useState<DaySchedule | null>(null);
  const [timerInitialSubject, setTimerInitialSubject] = useState<SubjectName>('Mathematics');

  // Toggle Dark Mode Class on Root HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist days state
  const toggleDayCompletion = (dayNumber: number) => {
    setDays(prevDays => {
      const updated = prevDays.map(d => {
        if (d.dayNumber === dayNumber) {
          return { ...d, completed: !d.completed };
        }
        return d;
      });

      // Save to localStorage
      const storageObj: Record<number, { completed: boolean; notes: string }> = {};
      updated.forEach(d => {
        storageObj[d.dayNumber] = { completed: !!d.completed, notes: d.notes || '' };
      });
      localStorage.setItem('fb_class9_schedule_v2', JSON.stringify(storageObj));

      return updated;
    });
  };

  const handleSaveNotes = (dayNumber: number, notesText: string) => {
    setDays(prevDays => {
      const updated = prevDays.map(d => {
        if (d.dayNumber === dayNumber) {
          return { ...d, notes: notesText };
        }
        return d;
      });

      const storageObj: Record<number, { completed: boolean; notes: string }> = {};
      updated.forEach(d => {
        storageObj[d.dayNumber] = { completed: !!d.completed, notes: d.notes || '' };
      });
      localStorage.setItem('fb_class9_schedule_v2', JSON.stringify(storageObj));

      return updated;
    });
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(prevChecklist => {
      const updated = prevChecklist.map(c => {
        if (c.id === id) {
          return { ...c, completed: !c.completed };
        }
        return c;
      });

      const storageObj: Record<string, boolean> = {};
      updated.forEach(c => {
        storageObj[c.id] = c.completed;
      });
      localStorage.setItem('fb_class9_checklist_v2', JSON.stringify(storageObj));

      return updated;
    });
  };

  const handleLaunchTimerFromModal = (subject: SubjectName) => {
    setTimerInitialSubject(subject);
    setActiveTab('timer');
  };

  const completedDaysCount = days.filter(d => d.completed).length;
  const completedPagesSum = days
    .filter(d => d.completed)
    .reduce((acc, curr) => acc + curr.pagesEstimate, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        completedDaysCount={completedDaysCount}
        totalDays={22}
        totalPages={1263}
        completedPages={completedPagesSum}
        isExporting={isExporting}
        setIsExporting={setIsExporting}
      />

      {/* Main Content View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'schedule' && (
          <ScheduleView
            days={days}
            toggleDayCompletion={toggleDayCompletion}
            openDayModal={day => setSelectedDayForModal(day)}
          />
        )}

        {activeTab === 'presentation' && (
          <SlideDeckView
            isExporting={isExporting}
            setIsExporting={setIsExporting}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectBreakdown />
        )}

        {activeTab === 'routine' && (
          <DailyRoutineView />
        )}

        {activeTab === 'strategies' && (
          <StrategiesView
            checklist={checklist}
            toggleChecklistItem={toggleChecklistItem}
          />
        )}

        {activeTab === 'timer' && (
          <PomodoroTimer
            initialSubject={timerInitialSubject}
          />
        )}
      </main>

      {/* Day Detail Modal */}
      <DayDetailModal
        day={selectedDayForModal}
        onClose={() => setSelectedDayForModal(null)}
        onSaveNotes={handleSaveNotes}
        onLaunchTimer={handleLaunchTimerFromModal}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-8 mt-12 print:hidden text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p className="font-bold text-slate-700 dark:text-slate-300">
          Federal Board Class 9 Intensive Preparation Assistant
        </p>
        <p>
          29 July 2026 - 22 August 2026 | Total Syllabus: 1,263 Pages
        </p>
      </footer>

    </div>
  );
}
