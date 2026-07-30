import React from 'react';
import { SUBJECT_STATS } from '../data/scheduleData';
import { Calculator, FlaskConical, Zap, Laptop, BookOpen, PenTool, Award, CheckCircle, BarChart, Clock, Target } from 'lucide-react';

export const SubjectBreakdown: React.FC = () => {
  const totalPagesSum = 1263;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-6 h-6" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Laptop': return <Laptop className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'Award': default: return <Award className="w-6 h-6" />;
    }
  };

  const subjectTips: Record<string, { chapters: string; doList: string[]; dontList: string[] }> = {
    'Mathematics': {
      chapters: 'Chapters 1-8 (Numbers, Algebra, Sets, Functions, Trigonometry, Logarithms, Sequences)',
      doList: ['Understand concepts & proofs', 'Solve EVERY practice problem step-by-step', 'Build formula cheat-sheet'],
      dontList: ['Do NOT skip worked examples', 'Do NOT jump topics without understanding why']
    },
    'Chemistry': {
      chapters: 'Chapters 1-8 (Atomic Structure, Periodic Table, Bonding, Equations, Electrochemistry, Organic)',
      doList: ['Draw & memorize atomic structures', 'Balance chemical equations daily', 'Memorize periodic trends'],
      dontList: ['Do NOT memorize without understanding bonding', 'Do NOT skip industrial chemical processes']
    },
    'Physics': {
      chapters: 'Chapters 1-8 (Kinematics, Dynamics, Energy, Thermodynamics, Waves, Optics, Nuclear)',
      doList: ['Draw force & ray diagrams', 'Understand physical derivations', 'Solve numerical problems repeatedly'],
      dontList: ['Do NOT skip theory for only problems', 'Do NOT forget SI units in answers']
    },
    'Computer Science': {
      chapters: 'Chapters 1-4 (Hardware, Software, Programming Basics, OS, Algorithms)',
      doList: ['Practice algorithm flowcharts', 'Learn basic code logic & definitions', 'Understand computer components deeply'],
      dontList: ['Do NOT memorize flowcharts blindly', 'Do NOT skip practical examples']
    },
    'English': {
      chapters: 'Grammar, Vocabulary, Sentence Structure, Reading Comprehension & Essays',
      doList: ['Master grammar rules with examples', 'Practice essay & letter writing', 'Read passages carefully'],
      dontList: ['Do NOT overlook punctuation rules', 'Do NOT write essays without planning paragraphs']
    },
    'Urdu': {
      chapters: 'Grammar, Tashreeh, Verb Tenses, Literature & Essay Writing',
      doList: ['Memorize verb tenses & grammar rules', 'Write practice essays', 'Learn common difficult vocabulary'],
      dontList: ['Do NOT rely on pure memorization', 'Do NOT skip handwriting practice']
    },
    'All Subjects': {
      chapters: 'Full Board Exam Syllabus - Revision & Past Papers',
      doList: ['Solve past 5 years board papers', 'Time yourself strictly in mock tests', 'Analyze every mistake'],
      dontList: ['Do NOT panic during full test', 'Do NOT leave weak topics unreviewed']
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title & Page Distribution Visual */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart className="w-6 h-6 text-amber-500" />
            Subject Breakdown & Page Distribution
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Total Syllabus Volume: <strong className="text-amber-600 dark:text-amber-400">1,263 Pages</strong> across 22 Days (Daily Avg: <strong className="text-blue-600 dark:text-blue-400">57 pages/day</strong>)
          </p>
        </div>

        {/* Multi-colored Visual Page Bar */}
        <div className="space-y-2">
          <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex shadow-inner">
            {SUBJECT_STATS.map(sub => {
              const percent = Math.round((sub.pages / totalPagesSum) * 100);
              return (
                <div
                  key={sub.name}
                  style={{ width: `${percent}%` }}
                  className={`h-full bg-gradient-to-r ${sub.gradient} hover:opacity-90 transition-opacity relative group cursor-pointer`}
                  title={`${sub.name}: ${sub.pages} pages (${percent}%)`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            {SUBJECT_STATS.map(sub => (
              <span key={sub.name} className="flex items-center gap-1.5">
                <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${sub.gradient}`} />
                <span>{sub.name}: {sub.pages} p.</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBJECT_STATS.map(sub => {
          const tips = subjectTips[sub.name] || subjectTips['Mathematics'];
          const percent = Math.round((sub.pages / totalPagesSum) * 100);

          return (
            <div
              key={sub.name}
              className={`bg-white dark:bg-slate-900 rounded-2xl border ${sub.borderColor} p-5 space-y-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden`}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${sub.gradient}`} />

              {/* Subject Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${sub.bgColor} ${sub.textColor}`}>
                    {getIcon(sub.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {sub.name}
                    </h3>
                    <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded-md ${sub.bgColor} ${sub.textColor}`}>
                      {sub.priority} PRIORITY
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    {sub.pages}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">pages ({percent}%)</p>
                </div>
              </div>

              {/* Time Allocation Badge */}
              <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Allocated Duration:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{sub.timeAllocation}</span>
              </div>

              {/* Chapters Cover */}
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-blue-500" /> Syllabus Coverage:
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {tips.chapters}
                </p>
              </div>

              {/* What to Do */}
              <div className="text-xs space-y-1 bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Key Strategies:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                  {tips.doList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
