import React, { useState, useEffect } from 'react';
import { SCHEDULE_DAYS, SUBJECT_STATS, TIMETABLES, SUCCESS_PRINCIPLES, DOS_AND_DONTS } from '../data/scheduleData';
import { exportToPowerPoint } from '../utils/pptxExport';
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, Sparkles, Presentation, BookOpen, Clock, Award, ShieldCheck } from 'lucide-react';

interface SlideDeckViewProps {
  isExporting: boolean;
  setIsExporting: (val: boolean) => void;
}

export const SlideDeckView: React.FC<SlideDeckViewProps> = ({ isExporting, setIsExporting }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 11;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNext = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  const handlePrev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      await exportToPowerPoint();
    } catch (err) {
      console.error(err);
      alert('Failed to export PowerPoint.');
    } finally {
      setIsExporting(false);
    }
  };

  const slideTitles = [
    '1. Title & Executive Overview',
    '2. Key Statistics & Allocation',
    '3. Subject Breakdown & Priority',
    '4. Regular Day Timetable',
    '5. Revision & Mock Test Schedule',
    '6. Week 1: Foundation (Days 1-7)',
    '7. Week 2: Advanced Topics (Days 8-14)',
    '8. Week 3: Mock Exams (Days 15-22)',
    '9. 5 Core Success Principles',
    '10. Important Do\'s & Don\'ts',
    '11. Final Exam Confidence Deck'
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Slide Presentation Control Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Presentation className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              POWERPOINT SLIDE DECK VIEWER
            </span>
            <h2 className="text-lg font-black text-white">
              Slide {currentSlide + 1} of {totalSlides}: {slideTitles[currentSlide]}
            </h2>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-800 rounded-lg text-slate-300">
            {currentSlide + 1} / {totalSlides}
          </span>

          <button
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
            title="Next Slide (Right Arrow / Space)"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : 'Download .PPTX File'}</span>
          </button>
        </div>
      </div>

      {/* Slide Thumbnails Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {slideTitles.map((title, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              currentSlide === idx
                ? 'bg-amber-500 text-slate-900 font-extrabold border-amber-400 shadow-md scale-105'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Slide Canvas Stage */}
      <div className="bg-slate-950 text-white rounded-3xl border-2 border-slate-800 p-6 sm:p-10 shadow-2xl min-h-[500px] flex flex-col justify-between relative overflow-hidden transition-all duration-300">
        
        {/* Background Subtle Gradient Accents */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* --- SLIDE CONTENT SWITCH --- */}
        <div className="relative z-10 space-y-6">

          {/* SLIDE 0: Title Slide */}
          {currentSlide === 0 && (
            <div className="py-8 space-y-8 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
                <Sparkles className="w-4 h-4 text-amber-400" /> Federal Board Class 9
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
                22-DAY INTENSIVE STUDY SCHEDULE
              </h1>

              <p className="text-lg sm:text-xl text-cyan-400 font-medium">
                Complete Syllabus Preparation Guide | 29 July - 22 August 2026
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-blue-500/40 text-center">
                  <span className="text-2xl font-black text-blue-400 block">1,263</span>
                  <span className="text-xs text-slate-400">Total Pages</span>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/40 text-center">
                  <span className="text-2xl font-black text-emerald-400 block">57 P.</span>
                  <span className="text-xs text-slate-400">Daily Average</span>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-purple-500/40 text-center">
                  <span className="text-2xl font-black text-purple-400 block">8-10 Hrs</span>
                  <span className="text-xs text-slate-400">Daily Target</span>
                </div>
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/40 text-center">
                  <span className="text-2xl font-black text-amber-400 block">22 Days</span>
                  <span className="text-xs text-slate-400">Total Duration</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: Key Statistics */}
          {currentSlide === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-amber-400 tracking-wide flex items-center gap-2">
                📊 QUICK STATISTICS & PAGE BREAKDOWN
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Syllabus Density</h3>
                  <div className="space-y-2 text-sm text-slate-200">
                    <p>• <strong>Mathematics:</strong> 292 pages (5 days)</p>
                    <p>• <strong>Chemistry:</strong> 258 pages (4 days)</p>
                    <p>• <strong>Physics:</strong> 221 pages (4 days)</p>
                    <p>• <strong>Computer Science:</strong> 194 pages (3 days)</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Languages & Revision</h3>
                  <div className="space-y-2 text-sm text-slate-200">
                    <p>• <strong>English:</strong> 168 pages (2.5 days)</p>
                    <p>• <strong>Urdu:</strong> 130 pages (2 days)</p>
                    <p>• <strong>Revision & Mock Tests:</strong> 200+ pages (4 days)</p>
                    <p>• <strong>Total Volume:</strong> 1,263 Pages</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: Subject Breakdown Table */}
          {currentSlide === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-amber-400 tracking-wide">
                📚 SUBJECT-WISE TIME ALLOCATION
              </h2>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-sm text-slate-200">
                  <thead className="bg-slate-900 text-amber-400 font-bold uppercase text-xs">
                    <tr>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Pages</th>
                      <th className="p-3">Priority</th>
                      <th className="p-3">Allocated Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    {SUBJECT_STATS.map(s => (
                      <tr key={s.name}>
                        <td className="p-3 font-bold text-white">{s.name}</td>
                        <td className="p-3">{s.pages} p.</td>
                        <td className="p-3 font-bold" style={{ color: `#${s.hexColor}` }}>{s.priority}</td>
                        <td className="p-3 text-slate-400">{s.daysCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SLIDE 3: Regular Timetable */}
          {currentSlide === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-cyan-400 tracking-wide">
                ⏰ RECOMMENDED REGULAR DAY TIMETABLE
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                {TIMETABLES.regular.map((slot, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-amber-400 font-bold block">{slot.time}</span>
                      <span className="text-slate-200">{slot.activity}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                      {slot.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 4: Revision & Mock Timetable */}
          {currentSlide === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-rose-400 tracking-wide">
                ✍️ REVISION & MOCK TEST STRATEGY
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-2xl border border-amber-500/40 space-y-2">
                  <h3 className="font-bold text-amber-400">REVISION DAYS (Days 9, 14, 17-18, 21-22)</h3>
                  <p className="text-xs text-slate-300">• 7:30 AM - 12:00 PM: Revision Round 1 (4.5 hrs)</p>
                  <p className="text-xs text-slate-300">• 1:00 PM - 5:30 PM: Revision Round 2 (4.5 hrs)</p>
                  <p className="text-xs text-slate-300">• Evening: Formula & definition flashcards</p>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-rose-500/40 space-y-2">
                  <h3 className="font-bold text-rose-400">MOCK TEST DAYS (Days 19-20)</h3>
                  <p className="text-xs text-slate-300">• 7:00 AM - 1:00 PM: Full 6-hour Board Mock Exam</p>
                  <p className="text-xs text-slate-300">• 2:00 PM - 5:00 PM: Deep answer & error analysis</p>
                  <p className="text-xs text-slate-300">• Evening: Rest & weak area target practice</p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: Week 1 */}
          {currentSlide === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-amber-400 tracking-wide">
                📅 WEEK 1: FOUNDATION BUILDING (Days 1 - 7)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {SCHEDULE_DAYS.filter(d => d.week === 1).map(d => (
                  <div key={d.dayNumber} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between font-bold text-amber-400">
                      <span>Day {d.dayNumber}: {d.date} ({d.dayOfWeek.slice(0,3)})</span>
                      <span className="text-cyan-400">{d.subjects.map(s => s.subject).join(' + ')}</span>
                    </div>
                    <p className="text-slate-200">{d.subjects.map(s => s.content).join(' | ')}</p>
                    <p className="text-slate-400 italic">Task: {d.subjects.map(s => s.task).join(' | ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 6: Week 2 */}
          {currentSlide === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-amber-400 tracking-wide">
                📅 WEEK 2: ADVANCED TOPICS (Days 8 - 14)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {SCHEDULE_DAYS.filter(d => d.week === 2).map(d => (
                  <div key={d.dayNumber} className={`p-3 rounded-xl border space-y-1 ${d.type === 'revision' ? 'bg-amber-950/40 border-amber-500' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="flex justify-between font-bold text-amber-400">
                      <span>Day {d.dayNumber}: {d.date}</span>
                      <span className="text-cyan-400">{d.subjects.map(s => s.subject).join(' + ')}</span>
                    </div>
                    <p className="text-slate-200">{d.subjects.map(s => s.content).join(' | ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 7: Week 3 */}
          {currentSlide === 7 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-rose-400 tracking-wide">
                📅 WEEK 3: MOCK EXAMS & FINAL REVIEW (Days 15 - 22)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {SCHEDULE_DAYS.filter(d => d.week === 3).map(d => (
                  <div key={d.dayNumber} className={`p-3 rounded-xl border space-y-1 ${d.type === 'mock' ? 'bg-rose-950/50 border-rose-500' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="flex justify-between font-bold text-rose-400">
                      <span>Day {d.dayNumber}: {d.date}</span>
                      <span className="text-cyan-400">{d.subjects.map(s => s.subject).join(' + ')}</span>
                    </div>
                    <p className="text-slate-200">{d.subjects.map(s => s.content).join(' | ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 8: 5 Core Success Principles */}
          {currentSlide === 8 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-amber-400 tracking-wide">
                💪 5 CORE SUCCESS PRINCIPLES
              </h2>

              <div className="space-y-2 text-xs sm:text-sm">
                {SUCCESS_PRINCIPLES.map((p, i) => (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 block">{p.title}</span>
                    <p className="text-slate-300">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 9: Do's and Don'ts */}
          {currentSlide === 9 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-emerald-400 tracking-wide">
                📝 DO'S AND DON'TS
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40 space-y-2">
                  <h3 className="font-bold text-emerald-400">✅ CRITICAL DO'S</h3>
                  {DOS_AND_DONTS.dos.slice(0, 6).map((d, i) => (
                    <p key={i} className="text-slate-200">• {d}</p>
                  ))}
                </div>

                <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-500/40 space-y-2">
                  <h3 className="font-bold text-rose-400">❌ CRITICAL DON'TS</h3>
                  {DOS_AND_DONTS.donts.slice(0, 6).map((d, i) => (
                    <p key={i} className="text-slate-200">• {d}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 10: Final Confidence Deck */}
          {currentSlide === 10 && (
            <div className="py-8 space-y-6 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-black text-amber-400">
                🏆 YOU'RE FULLY PREPARED FOR CLASS 9 EXAMS!
              </h2>

              <p className="text-base text-cyan-300 italic">
                "Success is not final, failure is not fatal: it is the courage to continue that counts."
              </p>

              <div className="p-6 bg-slate-900 rounded-2xl border border-amber-500/50 space-y-2">
                <p className="text-lg font-bold text-white">22 DAYS OF DEDICATED EFFORT = MAXIMUM RESULTS ✨</p>
                <p className="text-xs text-slate-400">Follow this color-coded schedule religiously and watch your confidence skyrocket!</p>
              </div>
            </div>
          )}

        </div>

        {/* Slide Footer Controls */}
        <div className="relative z-10 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Federal Board Class 9 Presentation Deck</span>
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} disabled={currentSlide === 0} className="hover:text-white cursor-pointer disabled:opacity-30">Prev</button>
            <span>{currentSlide + 1} / {totalSlides}</span>
            <button onClick={handleNext} disabled={currentSlide === totalSlides - 1} className="hover:text-white cursor-pointer disabled:opacity-30">Next</button>
          </div>
        </div>

      </div>

    </div>
  );
};
