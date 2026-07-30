import React, { useState } from 'react';
import { DaySchedule, SubjectName, DayType } from '../types';
import { SUBJECT_STATS } from '../data/scheduleData';
import { CheckCircle2, Circle, Star, Award, Zap, Search, Filter, Calendar, BookOpen, ChevronDown, ChevronUp, FileText, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScheduleViewProps {
  days: DaySchedule[];
  toggleDayCompletion: (dayNumber: number) => void;
  openDayModal: (day: DaySchedule) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  days,
  toggleDayCompletion,
  openDayModal
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'all'>('all');
  const [selectedType, setSelectedType] = useState<DayType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Filter logic
  const filteredDays = days.filter(day => {
    if (selectedWeek !== 'all' && day.week !== selectedWeek) return false;
    if (selectedType !== 'all' && day.type !== selectedType) return false;

    if (selectedSubject !== 'all') {
      const hasSubject = day.subjects.some(s => s.subject === selectedSubject);
      if (!hasSubject) return false;
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchDate = day.date.toLowerCase().includes(q);
      const matchDayNum = `day ${day.dayNumber}`.includes(q);
      const matchDayOfWeek = day.dayOfWeek.toLowerCase().includes(q);
      const matchSubjectContent = day.subjects.some(
        s => s.subject.toLowerCase().includes(q) || s.content.toLowerCase().includes(q) || s.focus.toLowerCase().includes(q) || s.task.toLowerCase().includes(q)
      );
      return matchDate || matchDayNum || matchDayOfWeek || matchSubjectContent;
    }

    return true;
  });

  const handleToggle = (e: React.MouseEvent, dayNumber: number, isCurrentlyCompleted: boolean) => {
    e.stopPropagation();
    if (!isCurrentlyCompleted) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
    toggleDayCompletion(dayNumber);
  };

  const getSubjectMeta = (subjectName: SubjectName) => {
    return SUBJECT_STATS.find(s => s.name === subjectName) || SUBJECT_STATS[0];
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search dates, chapters, topics (e.g. Trigonometry, Kinematics, 5 August)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          
          {/* Week Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <span className="text-xs font-semibold px-2 text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Week:
            </span>
            <button
              onClick={() => setSelectedWeek('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                selectedWeek === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (22 Days)
            </button>
            <button
              onClick={() => setSelectedWeek(1)}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                selectedWeek === 1
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Week 1 (Days 1-7)
            </button>
            <button
              onClick={() => setSelectedWeek(2)}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                selectedWeek === 2
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Week 2 (Days 8-14)
            </button>
            <button
              onClick={() => setSelectedWeek(3)}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                selectedWeek === 3
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Week 3 (Days 15-22)
            </button>
          </div>

          {/* Day Type Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                selectedType === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType('regular')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                selectedType === 'regular'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Study Days
            </button>
            <button
              onClick={() => setSelectedType('revision')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                selectedType === 'revision'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              ⭐ Revision
            </button>
            <button
              onClick={() => setSelectedType('mock')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                selectedType === 'mock'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              ✍️ Mock Test
            </button>
          </div>

        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Subject:</span>
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer border transition-all ${
              selectedSubject === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900'
                : 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            All Subjects
          </button>
          {SUBJECT_STATS.map(s => (
            <button
              key={s.name}
              onClick={() => setSelectedSubject(s.name)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer border transition-all ${
                selectedSubject === s.name
                  ? `${s.bgColor} ${s.textColor} ${s.borderColor} shadow-xs font-extrabold ring-2 ring-amber-500`
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 px-1">
        <span>Showing {filteredDays.length} of {days.length} Days</span>
        {searchQuery && <span>Filter: "{searchQuery}"</span>}
      </div>

      {/* Days List Cards */}
      <div className="space-y-4">
        {filteredDays.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-base font-semibold">No days match your current filter.</p>
            <button
              onClick={() => {
                setSelectedWeek('all');
                setSelectedSubject('all');
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredDays.map(day => {
            const isCompleted = !!day.completed;
            const isExpanded = expandedDay === day.dayNumber;

            // Determine day container border/bg styling
            let cardBg = 'bg-white dark:bg-slate-900';
            let borderStyle = 'border-slate-200 dark:border-slate-800';
            let badgeBg = 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
            let badgeLabel = `Day ${day.dayNumber}`;

            if (day.type === 'revision') {
              borderStyle = 'border-amber-400 dark:border-amber-600 shadow-amber-500/10 shadow-md';
              badgeBg = 'bg-amber-500 text-white font-black';
              badgeLabel = `Day ${day.dayNumber} ⭐ REVISION`;
            } else if (day.type === 'mock') {
              borderStyle = 'border-rose-500 dark:border-rose-600 shadow-rose-500/10 shadow-md';
              badgeBg = 'bg-rose-600 text-white font-black';
              badgeLabel = `Day ${day.dayNumber} ✍️ MOCK EXAM`;
            } else if (day.type === 'final') {
              borderStyle = 'border-emerald-500 dark:border-emerald-600 shadow-emerald-500/10 shadow-md';
              badgeBg = 'bg-emerald-600 text-white font-black';
              badgeLabel = `Day ${day.dayNumber} ⚡ FINAL REVIEW`;
            }

            if (isCompleted) {
              cardBg = 'bg-slate-50/80 dark:bg-slate-900/40 opacity-85';
            }

            return (
              <div
                key={day.dayNumber}
                className={`rounded-2xl border ${borderStyle} ${cardBg} transition-all duration-200 hover:shadow-md overflow-hidden`}
              >
                {/* Main Card Header */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left: Date & Checkbox */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    
                    {/* Checkbox */}
                    <button
                      onClick={(e) => handleToggle(e, day.dayNumber, isCompleted)}
                      title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                      className="mt-1 transition-transform active:scale-90 cursor-pointer flex-shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-7 h-7 text-emerald-500 fill-emerald-100 dark:fill-emerald-950/60" />
                      ) : (
                        <Circle className="w-7 h-7 text-slate-300 dark:text-slate-600 hover:text-amber-500 dark:hover:text-amber-400" />
                      )}
                    </button>

                    {/* Day Number & Date */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs ${badgeBg}`}>
                          {badgeLabel}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {day.dayOfWeek}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          Week {day.week}
                        </span>
                      </div>

                      <h3 className={`text-lg sm:text-xl font-bold mt-1 ${isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {day.date}
                      </h3>

                      {day.title && (
                        <p className="text-xs font-extrabold text-amber-600 dark:text-amber-400 mt-0.5 uppercase tracking-wide">
                          {day.title}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Right: Subject Badges & Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    
                    {/* Subject Tags */}
                    {day.subjects.map((sub, idx) => {
                      const meta = getSubjectMeta(sub.subject);
                      return (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${meta.bgColor} ${meta.textColor} ${meta.borderColor}`}
                        >
                          {sub.subject}
                        </span>
                      );
                    })}

                    {/* Open Modal Button */}
                    <button
                      onClick={() => openDayModal(day)}
                      title="Open Full Details & Notes"
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Details & Notes</span>
                    </button>

                    {/* Toggle Expand */}
                    <button
                      onClick={() => setExpandedDay(isExpanded ? null : day.dayNumber)}
                      className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                  </div>

                </div>

                {/* Subject Tasks Summary */}
                <div className="px-4 sm:px-5 pb-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  {day.subjects.map((sub, idx) => {
                    const meta = getSubjectMeta(sub.subject);
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border ${meta.bgColor} ${meta.borderColor} space-y-1.5`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-black uppercase tracking-wider ${meta.textColor}`}>
                            {sub.subject}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 shadow-2xs">
                            {sub.pages}
                          </span>
                        </div>

                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {sub.content}
                        </p>

                        <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-1">
                          <p><strong className="text-slate-800 dark:text-slate-200">Focus:</strong> {sub.focus}</p>
                          <p><strong className="text-slate-800 dark:text-slate-200">Task:</strong> {sub.task}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Expanded Notes & Details section */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-3">
                    <div className="flex items-center justify-between font-bold text-amber-600 dark:text-amber-400">
                      <span>Detailed Execution Guidelines & Study Note</span>
                      <button
                        onClick={() => openDayModal(day)}
                        className="underline cursor-pointer hover:text-amber-500"
                      >
                        Edit Personal Notes
                      </button>
                    </div>

                    <p className="italic text-slate-600 dark:text-slate-400">
                      {day.notes || "No personal study notes added yet for this day. Click 'Details & Notes' above to add formula reminders or doubt lists!"}
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span className="font-semibold text-slate-500">Estimated Reading Volume:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{day.pagesEstimate} Pages</span>
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
