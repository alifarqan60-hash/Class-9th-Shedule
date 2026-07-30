import React, { useState } from 'react';
import { DaySchedule, SubjectName } from '../types';
import { SUBJECT_STATS } from '../data/scheduleData';
import { X, FileText, CheckCircle2, Clock, BookOpen, Save, Check } from 'lucide-react';

interface DayDetailModalProps {
  day: DaySchedule | null;
  onClose: () => void;
  onSaveNotes: (dayNumber: number, notes: string) => void;
  onLaunchTimer: (subject: SubjectName) => void;
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  day,
  onClose,
  onSaveNotes,
  onLaunchTimer
}) => {
  if (!day) return null;

  const [notesText, setNotesText] = useState(day.notes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSaveNotes(day.dayNumber, notesText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const getSubjectMeta = (subjectName: SubjectName) => {
    return SUBJECT_STATS.find(s => s.name === subjectName) || SUBJECT_STATS[0];
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-black uppercase bg-amber-500 text-slate-900">
                Day {day.dayNumber}
              </span>
              <span className="text-xs font-semibold text-slate-300">
                Week {day.week} ({day.dayOfWeek})
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1 text-white">
              {day.date}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Day Subject Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Assigned Syllabus & Study Tasks
            </h3>

            {day.subjects.map((sub, idx) => {
              const meta = getSubjectMeta(sub.subject);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${meta.bgColor} ${meta.borderColor} space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black uppercase tracking-wider ${meta.textColor}`}>
                      {sub.subject}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onLaunchTimer(sub.subject);
                      }}
                      className="px-3 py-1 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5 text-slate-900 dark:text-white"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Start 50m Timer</span>
                    </button>
                  </div>

                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    {sub.content} ({sub.pages})
                  </p>

                  <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 pt-1">
                    <p><strong className="text-slate-900 dark:text-white">Key Focus:</strong> {sub.focus}</p>
                    <p><strong className="text-slate-900 dark:text-white">Action Task:</strong> {sub.task}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Personal Study Notes Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-500" /> Personal Study Notes & Formula Checklist
              </label>
              {isSaved && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Notes Saved!
                </span>
              )}
            </div>

            <textarea
              value={notesText}
              onChange={e => setNotesText(e.target.value)}
              placeholder="Write your personal notes, formulas to memorize, or doubts for this day..."
              rows={4}
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-black text-white bg-amber-500 hover:bg-amber-600 shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Personal Notes</span>
          </button>
        </div>

      </div>
    </div>
  );
};
