import { DaySchedule, SubjectStat, TimetableSlot, ChecklistItem } from '../types';

export const SUBJECT_STATS: SubjectStat[] = [
  {
    name: 'Mathematics',
    pages: 292,
    priority: 'HIGH',
    timeAllocation: '5 days',
    daysCount: '5 days',
    bgColor: 'bg-blue-100 dark:bg-blue-950/60',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-700 dark:text-blue-300',
    gradient: 'from-blue-600 to-indigo-600',
    hexColor: '3B82F6',
    iconName: 'Calculator'
  },
  {
    name: 'Chemistry',
    pages: 258,
    priority: 'HIGH',
    timeAllocation: '4 days',
    daysCount: '4 days',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/60',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    gradient: 'from-emerald-600 to-teal-600',
    hexColor: '10B981',
    iconName: 'FlaskConical'
  },
  {
    name: 'Physics',
    pages: 221,
    priority: 'HIGH',
    timeAllocation: '4 days',
    daysCount: '4 days',
    bgColor: 'bg-purple-100 dark:bg-purple-950/60',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-700 dark:text-purple-300',
    gradient: 'from-purple-600 to-pink-600',
    hexColor: '8B5CF6',
    iconName: 'Zap'
  },
  {
    name: 'Computer Science',
    pages: 194,
    priority: 'MEDIUM',
    timeAllocation: '3 days',
    daysCount: '3 days',
    bgColor: 'bg-amber-100 dark:bg-amber-950/60',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-700 dark:text-amber-300',
    gradient: 'from-amber-500 to-orange-600',
    hexColor: 'F59E0B',
    iconName: 'Laptop'
  },
  {
    name: 'English',
    pages: 168,
    priority: 'MEDIUM',
    timeAllocation: '2.5 days',
    daysCount: '2.5 days',
    bgColor: 'bg-pink-100 dark:bg-pink-950/60',
    borderColor: 'border-pink-500',
    textColor: 'text-pink-700 dark:text-pink-300',
    gradient: 'from-pink-500 to-rose-600',
    hexColor: 'EC4899',
    iconName: 'BookOpen'
  },
  {
    name: 'Urdu',
    pages: 130,
    priority: 'MEDIUM',
    timeAllocation: '2 days',
    daysCount: '2 days',
    bgColor: 'bg-teal-100 dark:bg-teal-950/60',
    borderColor: 'border-teal-500',
    textColor: 'text-teal-700 dark:text-teal-300',
    gradient: 'from-teal-600 to-cyan-600',
    hexColor: '14B8A6',
    iconName: 'PenTool'
  },
  {
    name: 'All Subjects',
    pages: 200,
    priority: 'CRITICAL',
    timeAllocation: '4 days',
    daysCount: '4 days (Revision & Mocks)',
    bgColor: 'bg-rose-100 dark:bg-rose-950/60',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-700 dark:text-rose-300',
    gradient: 'from-rose-600 to-red-600',
    hexColor: 'EF4444',
    iconName: 'Award'
  }
];

export const SCHEDULE_DAYS: DaySchedule[] = [
  // --- WEEK 1 ---
  {
    dayNumber: 1,
    date: '29 July 2026',
    dayOfWeek: 'Wednesday',
    type: 'regular',
    week: 1,
    pagesEstimate: 45,
    subjects: [
      {
        subject: 'Mathematics',
        content: 'Chapters 1-2 (Numbers, Algebra Basics)',
        pages: '40-45 pages',
        focus: 'Understand number systems, basic operations, algebraic expressions',
        task: 'Make concept notes, solve 20 practice problems'
      }
    ]
  },
  {
    dayNumber: 2,
    date: '30 July 2026',
    dayOfWeek: 'Thursday',
    type: 'regular',
    week: 1,
    pagesEstimate: 45,
    subjects: [
      {
        subject: 'Mathematics',
        content: 'Chapters 3-4 (Sets, Functions)',
        pages: '40-45 pages',
        focus: 'Set theory, types of sets, function concepts',
        task: 'Create Venn diagram notes, solve function problems'
      }
    ]
  },
  {
    dayNumber: 3,
    date: '31 July 2026',
    dayOfWeek: 'Friday',
    type: 'regular',
    week: 1,
    pagesEstimate: 55,
    subjects: [
      {
        subject: 'Chemistry',
        content: 'Chapters 1-2 (Atomic Structure, Periodic Table)',
        pages: '50-55 pages',
        focus: 'Atomic models, electron configuration, periodic trends',
        task: 'Draw atomic structure diagrams, memorize periodic table trends'
      }
    ]
  },
  {
    dayNumber: 4,
    date: '1 August 2026',
    dayOfWeek: 'Saturday',
    type: 'regular',
    week: 1,
    pagesEstimate: 55,
    subjects: [
      {
        subject: 'Chemistry',
        content: 'Chapters 3-4 (Bonding, Chemical Equations)',
        pages: '50-55 pages',
        focus: 'Ionic and covalent bonding, balancing equations',
        task: 'Practice balancing 30 equations, create bonding concept maps'
      }
    ]
  },
  {
    dayNumber: 5,
    date: '2 August 2026',
    dayOfWeek: 'Sunday',
    type: 'regular',
    week: 1,
    pagesEstimate: 75,
    subjects: [
      {
        subject: 'Physics',
        content: 'Chapters 1-2 (Physical Quantities, Kinematics)',
        pages: '45-50 pages',
        focus: 'Units, measurements, motion concepts',
        task: 'Solve kinematics problems'
      },
      {
        subject: 'Urdu',
        content: 'Basic Grammar, Literature Introduction',
        pages: '20-25 pages',
        focus: 'Verb forms, tenses, comprehension',
        task: 'Write short essays'
      }
    ]
  },
  {
    dayNumber: 6,
    date: '3 August 2026',
    dayOfWeek: 'Monday',
    type: 'regular',
    week: 1,
    pagesEstimate: 50,
    subjects: [
      {
        subject: 'Physics',
        content: 'Chapters 3-4 (Dynamics, Energy)',
        pages: '45-50 pages',
        focus: 'Forces, Newton\'s laws, work-energy theorem',
        task: 'Force diagram problems, energy calculations'
      }
    ]
  },
  {
    dayNumber: 7,
    date: '4 August 2026',
    dayOfWeek: 'Tuesday',
    type: 'regular',
    week: 1,
    pagesEstimate: 80,
    subjects: [
      {
        subject: 'Computer Science',
        content: 'Chapters 1-2 (Introduction, Hardware)',
        pages: '50-55 pages',
        focus: 'Computer components, number systems',
        task: 'Hardware identification'
      },
      {
        subject: 'Urdu',
        content: 'Reading Comprehension, Literature',
        pages: '25-30 pages',
        focus: 'Reading skills, essay structure',
        task: 'Reading practice'
      }
    ]
  },

  // --- WEEK 2 ---
  {
    dayNumber: 8,
    date: '5 August 2026',
    dayOfWeek: 'Wednesday',
    type: 'regular',
    week: 2,
    pagesEstimate: 55,
    subjects: [
      {
        subject: 'Computer Science',
        content: 'Chapters 3-4 (Software, Programming Basics)',
        pages: '50-55 pages',
        focus: 'OS concepts, programming languages, algorithms',
        task: 'Code simple programs, algorithm flowcharts'
      }
    ]
  },
  {
    dayNumber: 9,
    date: '6 August 2026',
    dayOfWeek: 'Thursday',
    type: 'revision',
    week: 2,
    isStarRevision: true,
    title: '⭐ WEEK 1 REVISION DAY',
    pagesEstimate: 60,
    subjects: [
      {
        subject: 'All Subjects',
        content: 'Quick review of Days 1-8 content',
        pages: 'Summary Sheets & Past Papers',
        focus: 'Weak topics from previous days, key formulas',
        task: 'Solve past paper questions, create summary sheets for each subject, identify difficult concepts'
      }
    ]
  },
  {
    dayNumber: 10,
    date: '7 August 2026',
    dayOfWeek: 'Friday',
    type: 'regular',
    week: 2,
    pagesEstimate: 100,
    subjects: [
      {
        subject: 'Mathematics',
        content: 'Chapters 5-6 (Trigonometry Basics)',
        pages: '50-60 pages',
        focus: 'Trigonometric ratios, basic identities',
        task: 'Trigonometry problem solving'
      },
      {
        subject: 'English',
        content: 'Grammar, Vocabulary',
        pages: '40-45 pages',
        focus: 'Parts of speech, sentence structures',
        task: 'Vocabulary building & sentence practice'
      }
    ]
  },
  {
    dayNumber: 11,
    date: '8 August 2026',
    dayOfWeek: 'Saturday',
    type: 'regular',
    week: 2,
    pagesEstimate: 60,
    subjects: [
      {
        subject: 'Mathematics',
        content: 'Chapters 7-8 (Logarithms, Sequences)',
        pages: '50-60 pages',
        focus: 'Log properties, arithmetic/geometric sequences',
        task: 'Solve 40 logarithm and sequence problems'
      }
    ]
  },
  {
    dayNumber: 12,
    date: '9 August 2026',
    dayOfWeek: 'Sunday',
    type: 'regular',
    week: 2,
    pagesEstimate: 60,
    subjects: [
      {
        subject: 'Physics',
        content: 'Chapters 5-6 (Thermodynamics, Waves)',
        pages: '50-60 pages',
        focus: 'Heat, temperature, wave properties, sound',
        task: 'Thermodynamics calculations, wave problems'
      }
    ]
  },
  {
    dayNumber: 13,
    date: '10 August 2026',
    dayOfWeek: 'Monday',
    type: 'regular',
    week: 2,
    pagesEstimate: 85,
    subjects: [
      {
        subject: 'Chemistry',
        content: 'Chapters 5-6 (Reactions, Electrolysis)',
        pages: '50-55 pages',
        focus: 'Reaction types, electrochemistry',
        task: 'Reaction prediction'
      },
      {
        subject: 'Computer Science',
        content: 'Advanced Topics, Databases Intro',
        pages: '30-35 pages',
        focus: 'Data structures, basic database concepts',
        task: 'Database structure diagrams'
      }
    ]
  },
  {
    dayNumber: 14,
    date: '11 August 2026',
    dayOfWeek: 'Tuesday',
    type: 'revision',
    week: 2,
    isStarRevision: true,
    title: '⭐ MID-SCHEDULE REVISION DAY',
    pagesEstimate: 60,
    subjects: [
      {
        subject: 'All Subjects',
        content: 'Focus on Days 10-13 content',
        pages: 'Past Papers (3-4 sets)',
        focus: 'Trigonometry, Logarithms, Electrochemistry, Thermodynamics',
        task: 'Complete past paper questions, review weak areas with formula sheets, group difficult topics'
      }
    ]
  },

  // --- WEEK 3 ---
  {
    dayNumber: 15,
    date: '12 August 2026',
    dayOfWeek: 'Wednesday',
    type: 'regular',
    week: 3,
    pagesEstimate: 60,
    subjects: [
      {
        subject: 'Physics',
        content: 'Chapters 7-8 (Modern Physics, Optics)',
        pages: '50-60 pages',
        focus: 'Light, optics, quantum concepts, nuclear physics',
        task: 'Ray diagrams, optics calculations, nuclear problems'
      }
    ]
  },
  {
    dayNumber: 16,
    date: '13 August 2026',
    dayOfWeek: 'Thursday',
    type: 'regular',
    week: 3,
    pagesEstimate: 100,
    subjects: [
      {
        subject: 'Chemistry',
        content: 'Chapters 7-8 (Organic, Industrial Chemistry)',
        pages: '50-55 pages',
        focus: 'Organic compounds, industrial processes',
        task: 'Organic chemistry structures'
      },
      {
        subject: 'Mathematics',
        content: 'Mixed Revision - Key Topics',
        pages: '40-50 pages',
        focus: 'Problem areas from previous days',
        task: 'Mixed problem solving'
      }
    ]
  },
  {
    dayNumber: 17,
    date: '14 August 2026',
    dayOfWeek: 'Friday',
    type: 'revision',
    week: 3,
    isStarRevision: true,
    title: '⭐ COMPREHENSIVE REVISION ROUND 1',
    pagesEstimate: 70,
    subjects: [
      {
        subject: 'All Subjects',
        content: 'Comprehensive Revision Round 1',
        pages: 'Full Syllabus',
        focus: 'Most important and high-frequency exam topics',
        task: 'Complete 2-3 past papers under timed conditions, make final summary sheets'
      }
    ]
  },
  {
    dayNumber: 18,
    date: '15 August 2026',
    dayOfWeek: 'Saturday',
    type: 'revision',
    week: 3,
    isStarRevision: true,
    title: '⭐ COMPREHENSIVE REVISION ROUND 2',
    pagesEstimate: 70,
    subjects: [
      {
        subject: 'All Subjects',
        content: 'Comprehensive Revision Round 2',
        pages: 'Full Syllabus',
        focus: 'Common mistakes, difficult topics, formula precision',
        task: 'Solve tricky problems again, review all key formulas, practice writing answers clearly'
      }
    ]
  },
  {
    dayNumber: 19,
    date: '16 August 2026',
    dayOfWeek: 'Sunday',
    type: 'mock',
    week: 3,
    isMockTest: true,
    title: '✍️ FULL LENGTH MOCK TEST 1',
    pagesEstimate: 80,
    subjects: [
      {
        subject: 'Mathematics',
        content: 'Full Course Board Pattern Mock Exam',
        pages: 'Mock Exam Paper',
        focus: 'Time management, accuracy, step-by-step presentation',
        task: 'Take 6-hour full mock exam in real conditions, answer analysis'
      },
      {
        subject: 'Chemistry',
        content: 'Full Course Board Pattern Mock Exam',
        pages: 'Mock Exam Paper',
        focus: 'Equations, definitions, reasoning questions',
        task: 'Timed solving + weak area analysis'
      },
      {
        subject: 'Physics',
        content: 'Full Course Board Pattern Mock Exam',
        pages: 'Mock Exam Paper',
        focus: 'Numerical problems, diagrams, laws',
        task: 'Timed solving + weak area analysis'
      }
    ]
  },
  {
    dayNumber: 20,
    date: '17 August 2026',
    dayOfWeek: 'Monday',
    type: 'mock',
    week: 3,
    isMockTest: true,
    title: '✍️ FULL LENGTH MOCK TEST 2',
    pagesEstimate: 80,
    subjects: [
      {
        subject: 'Computer Science',
        content: 'Full Course Board Pattern Mock Exam',
        pages: 'Mock Exam Paper',
        focus: 'Hardware, flowcharts, algorithms',
        task: 'Take second full mock exam, answer analysis'
      },
      {
        subject: 'English',
        content: 'Full Course Board Pattern Mock Exam',
        pages: 'Mock Exam Paper',
        focus: 'Comprehension, essays, grammar accuracy',
        task: 'Timed essay and grammar test'
      },
      {
        subject: 'Urdu',
        content: 'Full Course Board Pattern Mock Exam',
        pages: 'Mock Exam Paper',
        focus: 'Grammar, Tashreeh, essay writing',
        task: 'Timed writing practice & grading'
      }
    ]
  },
  {
    dayNumber: 21,
    date: '18 August 2026',
    dayOfWeek: 'Tuesday',
    type: 'revision',
    week: 3,
    isStarRevision: true,
    title: '⭐ FINAL TARGETED REVISION',
    pagesEstimate: 80,
    subjects: [
      {
        subject: 'All Subjects',
        content: 'Targeted Revision of Weak Areas Identified in Mocks',
        pages: '60-80 pages (Concentrated)',
        focus: 'Clear all remaining doubts, formula perfection',
        task: 'Solve weak-type problems again, finalize exam strategy'
      }
    ]
  },
  {
    dayNumber: 22,
    date: '19 August 2026',
    dayOfWeek: 'Wednesday',
    type: 'final',
    week: 3,
    title: '⚡ LAST MINUTE QUICK REVIEW & CONFIDENCE BUILD',
    pagesEstimate: 50,
    subjects: [
      {
        subject: 'All Subjects',
        content: 'Formula Sheets, Flashcards, Key Definitions',
        pages: '40-50 pages (Quick Review)',
        focus: 'Mental clarity, positive mindset, exam readiness',
        task: 'Quick flashcard review, read key points one last time, rest & pack stationery!'
      }
    ]
  }
];

export const TIMETABLES = {
  regular: [
    { time: '6:00 - 7:30 AM', activity: 'Wake up, Exercise (30 min), Shower, Breakfast', type: 'meal' },
    { time: '7:30 - 9:30 AM', activity: 'SUBJECT 1: Study + Learn Concept', type: 'study' },
    { time: '9:30 - 10:00 AM', activity: 'Tea/Coffee Break & Light Snack', type: 'break' },
    { time: '10:00 - 12:00 PM', activity: 'SUBJECT 1: Practice Problems + Note-taking', type: 'study' },
    { time: '12:00 - 1:00 PM', activity: 'LUNCH BREAK & Rest', type: 'meal' },
    { time: '1:00 - 3:00 PM', activity: 'SUBJECT 2: Study + Learn Concept', type: 'study' },
    { time: '3:00 - 3:30 PM', activity: 'Tea/Coffee Break & Light Snack', type: 'break' },
    { time: '3:30 - 5:30 PM', activity: 'SUBJECT 2: Practice + Revision', type: 'study' },
    { time: '5:30 - 6:00 PM', activity: 'DAILY REVISION: Previous Day\'s Topics (30 min)', type: 'revision' },
    { time: '6:00 - 10:00 PM', activity: 'Rest, Dinner, Light Activities, Sleep (6-7 hrs)', type: 'rest' },
  ],
  revision: [
    { time: '6:00 - 7:30 AM', activity: 'Wake up, Light Exercise, Healthy Breakfast', type: 'meal' },
    { time: '7:30 AM - 12:00 PM', activity: 'REVISION ROUND 1 (4.5 hours - High Frequency Topics & Formulas)', type: 'revision' },
    { time: '12:00 - 1:00 PM', activity: 'LUNCH BREAK & Relaxation', type: 'meal' },
    { time: '1:00 - 5:30 PM', activity: 'REVISION ROUND 2 (4.5 hours - Weak Areas & Past Papers)', type: 'revision' },
    { time: '5:30 - 10:00 PM', activity: 'Dinner, Rest, Mental Recovery', type: 'rest' },
  ],
  mock: [
    { time: '6:00 - 7:00 AM', activity: 'Wake up, Nutritious Breakfast, Prepare Exam Materials', type: 'meal' },
    { time: '7:00 AM - 1:00 PM', activity: 'FULL LENGTH MOCK EXAM (6 Hours in strict board exam conditions)', type: 'test' },
    { time: '1:00 - 2:00 PM', activity: 'LUNCH BREAK', type: 'meal' },
    { time: '2:00 - 5:00 PM', activity: 'ANSWER ANALYSIS & WEAK AREA IDENTIFICATION', type: 'study' },
    { time: '5:00 - 10:00 PM', activity: 'Rest, Dinner & Recovery', type: 'rest' },
  ]
};

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', label: 'Day 1: Started with positive mindset & Math Ch 1-2', completed: false, category: 'Milestones' },
  { id: 'c2', label: 'Day 5: Completed first 4 intensive days', completed: false, category: 'Milestones' },
  { id: 'c3', label: 'Day 9: Week 1 Revision completed', completed: false, category: 'Milestones' },
  { id: 'c4', label: 'Day 14: Mid-schedule checkpoint - Halfway done!', completed: false, category: 'Milestones' },
  { id: 'c5', label: 'Day 17: Started final comprehensive revision', completed: false, category: 'Milestones' },
  { id: 'c6', label: 'Day 19: Full Mock Test 1 completed', completed: false, category: 'Milestones' },
  { id: 'c7', label: 'Day 20: Full Mock Test 2 completed', completed: false, category: 'Milestones' },
  { id: 'c8', label: 'Day 22: Ready for final exam with total confidence! 💪', completed: false, category: 'Milestones' },
  
  { id: 's1', label: 'Mathematics formula sheet created', completed: false, category: 'Subject Prep' },
  { id: 's2', label: 'Chemistry periodic table trends & equations practiced', completed: false, category: 'Subject Prep' },
  { id: 's3', label: 'Physics kinematics & thermodynamics ray diagrams drawn', completed: false, category: 'Subject Prep' },
  { id: 's4', label: 'Computer Science hardware & algorithm flowcharts coded', completed: false, category: 'Subject Prep' },
  { id: 's5', label: 'English grammar rules & essay structures mastered', completed: false, category: 'Subject Prep' },
  { id: 's6', label: 'Urdu verb forms, tenses & comprehension essays written', completed: false, category: 'Subject Prep' }
];

export const SUCCESS_PRINCIPLES = [
  {
    title: '1. The Pomodoro Technique',
    icon: 'Timer',
    color: 'from-red-500 to-rose-600',
    desc: 'Study for 50 minutes with 100% focus, followed by a 10-minute break. Takes 30-min long break after 3 cycles. Brain retention peaks during focused blocks.'
  },
  {
    title: '2. Spaced Repetition',
    icon: 'Repeat',
    color: 'from-blue-500 to-indigo-600',
    desc: 'Review previous day\'s topics for 30 minutes every evening. Weekly dedicated revision days seal knowledge into long-term memory.'
  },
  {
    title: '3. Active Recall & Note Taking',
    icon: 'Edit3',
    color: 'from-emerald-500 to-teal-600',
    desc: 'Write notes while studying rather than passive reading. Solve practice problems immediately without looking at solutions first.'
  },
  {
    title: '4. Sleep & Physical Health',
    icon: 'Moon',
    color: 'from-purple-500 to-pink-600',
    desc: 'Sleep 6-7 hours daily. Sleep consolidates memories! Exercise 20-30 minutes every morning to boost mental clarity.'
  },
  {
    title: '5. Mock Test Simulation',
    icon: 'Award',
    color: 'from-amber-500 to-orange-600',
    desc: 'Full mock exams on Days 19-20 in strict board exam conditions build stamina, time management, and eliminate exam anxiety.'
  }
];

export const DOS_AND_DONTS = {
  dos: [
    'Start early in the morning at 6:00 AM',
    'Take strict 10-min breaks every 50 minutes',
    'Make concise formula & concept summary sheets',
    'Solve ALL textbook practice problems',
    'Revise previous day\'s topics for 30 min daily',
    'Sleep 6-7 hours nightly for memory consolidation',
    'Keep stationery & study table clean and ready',
    'Test yourself regularly with past papers',
    'Stay hydrated and eat healthy meals',
    'Maintain unshakeable positive confidence'
  ],
  donts: [
    'Don\'t use phone or social media while studying',
    'Don\'t skip dedicated revision days',
    'Don\'t memorize blindly without understanding',
    'Don\'t study late into the night (destroys recall)',
    'Don\'t skip breakfast or meals',
    'Don\'t avoid difficult or scary topics',
    'Don\'t study without writing notes',
    'Don\'t compare your pace with others',
    'Don\'t skip the full-length mock exams',
    'Don\'t panic - follow the 22-day plan step by step'
  ]
};
