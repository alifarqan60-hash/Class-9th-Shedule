export type DayType = 'regular' | 'revision' | 'mock' | 'final';

export type SubjectName = 
  | 'Mathematics' 
  | 'Chemistry' 
  | 'Physics' 
  | 'Computer Science' 
  | 'English' 
  | 'Urdu' 
  | 'All Subjects';

export interface SubjectTask {
  subject: SubjectName;
  content: string;
  pages: string;
  focus: string;
  task: string;
}

export interface DaySchedule {
  dayNumber: number;
  date: string;
  dayOfWeek: string;
  type: DayType;
  title?: string;
  subTitle?: string;
  week: 1 | 2 | 3;
  subjects: SubjectTask[];
  isStarRevision?: boolean;
  isMockTest?: boolean;
  pagesEstimate: number;
  completed?: boolean;
  notes?: string;
}

export interface SubjectStat {
  name: SubjectName;
  pages: number;
  priority: 'HIGH' | 'MEDIUM' | 'CRITICAL';
  timeAllocation: string;
  daysCount: string;
  bgColor: string;       // Tailwind bg class for badge
  borderColor: string;   // Tailwind border class
  textColor: string;     // Tailwind text class
  gradient: string;      // Tailwind gradient class
  hexColor: string;      // For PPTX generation
  iconName: string;
}

export interface TimetableSlot {
  time: string;
  activity: string;
  type: 'study' | 'break' | 'meal' | 'revision' | 'test' | 'rest';
  subjectSlot?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  category: string;
}
