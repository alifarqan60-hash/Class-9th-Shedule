import pptxgen from 'pptxgenjs';
import { SCHEDULE_DAYS, SUBJECT_STATS, TIMETABLES, DOS_AND_DONTS, SUCCESS_PRINCIPLES } from '../data/scheduleData';

export async function exportToPowerPoint() {
  const pptx = new pptxgen();

  // Define Layout
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Federal Board Class 9 Study Assistant';
  pptx.company = 'Federal Board Class 9 Intensive Prep';
  pptx.title = 'Class 9 Federal Board - 22 Day Study Schedule';

  // Master Slide Definition - Dark Premium Theme
  const DARK_BG = '0F172A'; // Slate 900
  const CARD_BG = '1E293B'; // Slate 800
  const TEXT_WHITE = 'F8FAFC';
  const TEXT_MUTED = '94A3B8';
  const GOLD = 'F59E0B';
  const CYAN = '06B6D4';

  // -------------------------------------------------------------
  // SLIDE 1: Title Slide
  // -------------------------------------------------------------
  const slide1 = pptx.addSlide();
  slide1.background = { color: DARK_BG };

  // Decorative Accent Bar
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 0.8, w: 0.2, h: 5.6, fill: { color: GOLD }
  });

  slide1.addText('FEDERAL BOARD CLASS 9', {
    x: 1.3, y: 1.2, w: 10, h: 0.5,
    fontSize: 20, bold: true, color: GOLD, fontFace: 'Arial'
  });

  slide1.addText('22-Days Intensive Study Schedule', {
    x: 1.3, y: 1.8, w: 11, h: 1.2,
    fontSize: 38, bold: true, color: TEXT_WHITE, fontFace: 'Arial'
  });

  slide1.addText('Complete Syllabus Preparation Guide | 29 July - 22 August 2026', {
    x: 1.3, y: 3.1, w: 10, h: 0.5,
    fontSize: 18, color: CYAN, fontFace: 'Arial'
  });

  // Stat badges on Title Slide
  const statBoxes = [
    { title: 'Total Syllabus', val: '1,263 Pages', color: '2563EB' },
    { title: 'Daily Target', val: '57 Pages/Day', color: '059669' },
    { title: 'Daily Hours', val: '8-10 Hours', color: '7C3AED' },
    { title: 'Duration', val: '22 Days', color: 'D97706' },
  ];

  statBoxes.forEach((stat, idx) => {
    const xPos = 1.3 + idx * 2.7;
    slide1.addShape(pptx.ShapeType.roundRect, {
      x: xPos, y: 4.2, w: 2.5, h: 1.8,
      fill: { color: CARD_BG }, line: { color: stat.color, width: 2 }, rectRadius: 0.1
    });

    slide1.addText(stat.val, {
      x: xPos, y: 4.5, w: 2.5, h: 0.6,
      fontSize: 22, bold: true, color: TEXT_WHITE, align: 'center', fontFace: 'Arial'
    });

    slide1.addText(stat.title, {
      x: xPos, y: 5.1, w: 2.5, h: 0.4,
      fontSize: 13, color: TEXT_MUTED, align: 'center', fontFace: 'Arial'
    });
  });

  // -------------------------------------------------------------
  // SLIDE 2: Subject Statistics & Allocation
  // -------------------------------------------------------------
  const slide2 = pptx.addSlide();
  slide2.background = { color: DARK_BG };

  slide2.addText('📊 SUBJECT STATISTICAL OVERVIEW', {
    x: 0.8, y: 0.5, w: 10, h: 0.6,
    fontSize: 24, bold: true, color: GOLD, fontFace: 'Arial'
  });

  // Build Table
  const tableRows: any[] = [
    [
      { text: 'Subject', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 14 } },
      { text: 'Pages', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 14, align: 'center' } },
      { text: 'Priority', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 14, align: 'center' } },
      { text: 'Time Allocation', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 14, align: 'center' } },
    ]
  ];

  SUBJECT_STATS.forEach(sub => {
    tableRows.push([
      { text: sub.name, options: { fill: { color: CARD_BG }, color: TEXT_WHITE, bold: true, fontSize: 13 } },
      { text: `${sub.pages} pages`, options: { fill: { color: CARD_BG }, color: TEXT_WHITE, fontSize: 13, align: 'center' } },
      { text: sub.priority, options: { fill: { color: CARD_BG }, color: sub.hexColor, bold: true, fontSize: 13, align: 'center' } },
      { text: sub.daysCount, options: { fill: { color: CARD_BG }, color: TEXT_MUTED, fontSize: 13, align: 'center' } },
    ]);
  });

  slide2.addTable(tableRows, {
    x: 0.8, y: 1.3, w: 11.5, h: 4.8,
    border: { pt: 1, color: '475569' }
  });

  // -------------------------------------------------------------
  // SLIDE 3: Recommended Daily Schedule (Regular Study Day)
  // -------------------------------------------------------------
  const slide3 = pptx.addSlide();
  slide3.background = { color: DARK_BG };

  slide3.addText('⏰ RECOMMENDED DAILY TIMETABLE (REGULAR DAYS)', {
    x: 0.8, y: 0.5, w: 11, h: 0.6,
    fontSize: 22, bold: true, color: CYAN, fontFace: 'Arial'
  });

  const timetableRows: any[] = [
    [
      { text: 'Time Block', options: { fill: { color: '1E293B' }, color: GOLD, bold: true, fontSize: 13 } },
      { text: 'Activity & Focus', options: { fill: { color: '1E293B' }, color: GOLD, bold: true, fontSize: 13 } },
      { text: 'Type', options: { fill: { color: '1E293B' }, color: GOLD, bold: true, fontSize: 13, align: 'center' } },
    ]
  ];

  TIMETABLES.regular.forEach(slot => {
    let typeColor = TEXT_WHITE;
    if (slot.type === 'study') typeColor = '3B82F6';
    if (slot.type === 'revision') typeColor = 'F59E0B';
    if (slot.type === 'meal' || slot.type === 'break') typeColor = '10B981';
    if (slot.type === 'rest') typeColor = '94A3B8';

    timetableRows.push([
      { text: slot.time, options: { fill: { color: CARD_BG }, color: TEXT_WHITE, bold: true, fontSize: 11 } },
      { text: slot.activity, options: { fill: { color: CARD_BG }, color: TEXT_WHITE, fontSize: 11 } },
      { text: slot.type.toUpperCase(), options: { fill: { color: CARD_BG }, color: typeColor, bold: true, fontSize: 11, align: 'center' } },
    ]);
  });

  slide3.addTable(timetableRows, {
    x: 0.8, y: 1.2, w: 11.5, h: 5.5,
    border: { pt: 0.5, color: '334155' }
  });

  // -------------------------------------------------------------
  // SLIDE 4: WEEK 1 (Days 1 - 7) Schedule
  // -------------------------------------------------------------
  const slide4 = pptx.addSlide();
  slide4.background = { color: DARK_BG };

  slide4.addText('📅 WEEK 1: FOUNDATION BUILDING (Days 1 - 7)', {
    x: 0.8, y: 0.5, w: 11, h: 0.6,
    fontSize: 22, bold: true, color: GOLD, fontFace: 'Arial'
  });

  const week1Days = SCHEDULE_DAYS.filter(d => d.week === 1);
  const w1Rows: any[] = [
    [
      { text: 'Day & Date', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Subject', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Chapters & Content', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Focus & Tasks', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
    ]
  ];

  week1Days.forEach(d => {
    const subText = d.subjects.map(s => s.subject).join(' + ');
    const contentText = d.subjects.map(s => `${s.content} (${s.pages})`).join(' | ');
    const taskText = d.subjects.map(s => s.task).join(' | ');

    w1Rows.push([
      { text: `Day ${d.dayNumber}\n${d.date} (${d.dayOfWeek.slice(0,3)})`, options: { fill: { color: CARD_BG }, color: TEXT_WHITE, bold: true, fontSize: 10 } },
      { text: subText, options: { fill: { color: CARD_BG }, color: '38BDF8', bold: true, fontSize: 10 } },
      { text: contentText, options: { fill: { color: CARD_BG }, color: TEXT_WHITE, fontSize: 10 } },
      { text: taskText, options: { fill: { color: CARD_BG }, color: TEXT_MUTED, fontSize: 10 } },
    ]);
  });

  slide4.addTable(w1Rows, {
    x: 0.8, y: 1.2, w: 11.5, h: 5.5,
    border: { pt: 0.5, color: '334155' }
  });

  // -------------------------------------------------------------
  // SLIDE 5: WEEK 2 (Days 8 - 14) Schedule
  // -------------------------------------------------------------
  const slide5 = pptx.addSlide();
  slide5.background = { color: DARK_BG };

  slide5.addText('📅 WEEK 2: ADVANCED TOPICS (Days 8 - 14)', {
    x: 0.8, y: 0.5, w: 11, h: 0.6,
    fontSize: 22, bold: true, color: GOLD, fontFace: 'Arial'
  });

  const week2Days = SCHEDULE_DAYS.filter(d => d.week === 2);
  const w2Rows: any[] = [
    [
      { text: 'Day & Date', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Subject', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Chapters & Content', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Focus & Tasks', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
    ]
  ];

  week2Days.forEach(d => {
    const subText = d.subjects.map(s => s.subject).join(' + ');
    const contentText = d.subjects.map(s => `${s.content} (${s.pages})`).join(' | ');
    const taskText = d.subjects.map(s => s.task).join(' | ');
    const isRev = d.type === 'revision';

    w2Rows.push([
      { text: `Day ${d.dayNumber}\n${d.date} (${d.dayOfWeek.slice(0,3)})`, options: { fill: { color: isRev ? '451A03' : CARD_BG }, color: isRev ? GOLD : TEXT_WHITE, bold: true, fontSize: 10 } },
      { text: subText, options: { fill: { color: isRev ? '451A03' : CARD_BG }, color: isRev ? GOLD : '38BDF8', bold: true, fontSize: 10 } },
      { text: contentText, options: { fill: { color: isRev ? '451A03' : CARD_BG }, color: TEXT_WHITE, fontSize: 10 } },
      { text: taskText, options: { fill: { color: isRev ? '451A03' : CARD_BG }, color: TEXT_MUTED, fontSize: 10 } },
    ]);
  });

  slide5.addTable(w2Rows, {
    x: 0.8, y: 1.2, w: 11.5, h: 5.5,
    border: { pt: 0.5, color: '334155' }
  });

  // -------------------------------------------------------------
  // SLIDE 6: WEEK 3 (Days 15 - 22) Final Push & Mock Exams
  // -------------------------------------------------------------
  const slide6 = pptx.addSlide();
  slide6.background = { color: DARK_BG };

  slide6.addText('📅 WEEK 3: MOCK EXAMS & FINAL PUSH (Days 15 - 22)', {
    x: 0.8, y: 0.5, w: 11, h: 0.6,
    fontSize: 22, bold: true, color: GOLD, fontFace: 'Arial'
  });

  const week3Days = SCHEDULE_DAYS.filter(d => d.week === 3);
  const w3Rows: any[] = [
    [
      { text: 'Day & Date', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Subject', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Chapters & Content', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
      { text: 'Focus & Tasks', options: { fill: { color: '334155' }, color: GOLD, bold: true, fontSize: 12 } },
    ]
  ];

  week3Days.forEach(d => {
    const subText = d.subjects.map(s => s.subject).join(' + ');
    const contentText = d.subjects.map(s => `${s.content} (${s.pages})`).join(' | ');
    const taskText = d.subjects.map(s => s.task).join(' | ');

    let bg = CARD_BG;
    let txtCol = TEXT_WHITE;
    if (d.type === 'mock') { bg = '7F1D1D'; txtCol = 'FCA5A5'; }
    if (d.type === 'revision') { bg = '451A03'; txtCol = GOLD; }
    if (d.type === 'final') { bg = '064E3B'; txtCol = '6EE7B7'; }

    w3Rows.push([
      { text: `Day ${d.dayNumber}\n${d.date}`, options: { fill: { color: bg }, color: txtCol, bold: true, fontSize: 9.5 } },
      { text: subText, options: { fill: { color: bg }, color: txtCol, bold: true, fontSize: 9.5 } },
      { text: contentText, options: { fill: { color: bg }, color: TEXT_WHITE, fontSize: 9.5 } },
      { text: taskText, options: { fill: { color: bg }, color: TEXT_MUTED, fontSize: 9.5 } },
    ]);
  });

  slide6.addTable(w3Rows, {
    x: 0.8, y: 1.2, w: 11.5, h: 5.6,
    border: { pt: 0.5, color: '334155' }
  });

  // -------------------------------------------------------------
  // SLIDE 7: SUCCESS PRINCIPLES
  // -------------------------------------------------------------
  const slide7 = pptx.addSlide();
  slide7.background = { color: DARK_BG };

  slide7.addText('💪 5 CORE SUCCESS PRINCIPLES', {
    x: 0.8, y: 0.5, w: 10, h: 0.6,
    fontSize: 24, bold: true, color: CYAN, fontFace: 'Arial'
  });

  SUCCESS_PRINCIPLES.forEach((principle, idx) => {
    const yPos = 1.2 + idx * 1.1;

    slide7.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: yPos, w: 11.5, h: 0.95,
      fill: { color: CARD_BG }, line: { color: '334155', width: 1 }, rectRadius: 0.08
    });

    slide7.addText(principle.title, {
      x: 1.0, y: yPos + 0.1, w: 11, h: 0.35,
      fontSize: 16, bold: true, color: GOLD, fontFace: 'Arial'
    });

    slide7.addText(principle.desc, {
      x: 1.0, y: yPos + 0.45, w: 11, h: 0.45,
      fontSize: 12, color: TEXT_WHITE, fontFace: 'Arial'
    });
  });

  // -------------------------------------------------------------
  // SLIDE 8: DO'S AND DON'TS
  // -------------------------------------------------------------
  const slide8 = pptx.addSlide();
  slide8.background = { color: DARK_BG };

  slide8.addText('📝 IMPORTANT DO\'S AND DON\'TS', {
    x: 0.8, y: 0.5, w: 10, h: 0.6,
    fontSize: 24, bold: true, color: GOLD, fontFace: 'Arial'
  });

  // DO'S Box
  slide8.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.2, w: 5.5, h: 5.5,
    fill: { color: '064E3B' }, line: { color: '10B981', width: 2 }, rectRadius: 0.1
  });

  slide8.addText('✅ CRITICAL DO\'S', {
    x: 1.0, y: 1.4, w: 5.1, h: 0.4,
    fontSize: 18, bold: true, color: '34D399', fontFace: 'Arial'
  });

  const dosText = DOS_AND_DONTS.dos.map(d => `• ${d}`).join('\n');
  slide8.addText(dosText, {
    x: 1.0, y: 1.9, w: 5.1, h: 4.6,
    fontSize: 11, color: TEXT_WHITE, fontFace: 'Arial', lineSpacing: 18
  });

  // DON'TS Box
  slide8.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 1.2, w: 5.5, h: 5.5,
    fill: { color: '7F1D1D' }, line: { color: 'EF4444', width: 2 }, rectRadius: 0.1
  });

  slide8.addText('❌ CRITICAL DON\'TS', {
    x: 7.0, y: 1.4, w: 5.1, h: 0.4,
    fontSize: 18, bold: true, color: 'FCA5A5', fontFace: 'Arial'
  });

  const dontsText = DOS_AND_DONTS.donts.map(d => `• ${d}`).join('\n');
  slide8.addText(dontsText, {
    x: 7.0, y: 1.9, w: 5.1, h: 4.6,
    fontSize: 11, color: TEXT_WHITE, fontFace: 'Arial', lineSpacing: 18
  });

  // -------------------------------------------------------------
  // SLIDE 9: Final Motivational Slide
  // -------------------------------------------------------------
  const slide9 = pptx.addSlide();
  slide9.background = { color: DARK_BG };

  slide9.addText('🏆 YOU HAVE GOT THIS!', {
    x: 1.0, y: 1.5, w: 11, h: 0.8,
    fontSize: 36, bold: true, color: GOLD, align: 'center', fontFace: 'Arial'
  });

  slide9.addText('"Success is not final, failure is not fatal: it is the courage to continue that counts."\n- Winston Churchill', {
    x: 1.5, y: 2.5, w: 10, h: 1.2,
    fontSize: 18, italic: true, color: CYAN, align: 'center', fontFace: 'Arial'
  });

  slide9.addShape(pptx.ShapeType.roundRect, {
    x: 2.5, y: 4.0, w: 8.0, h: 2.2,
    fill: { color: CARD_BG }, line: { color: GOLD, width: 2 }, rectRadius: 0.1
  });

  slide9.addText('✨ START DATE: 29 July 2026   |   END DATE: 22 August 2026 ✨\nGOAL: 100% Complete Class 9 Federal Board Preparation', {
    x: 2.7, y: 4.5, w: 7.6, h: 1.2,
    fontSize: 18, bold: true, color: TEXT_WHITE, align: 'center', fontFace: 'Arial'
  });

  // Save the presentation
  await pptx.writeFile({ fileName: 'Class_9_Federal_Board_22_Day_Study_Schedule.pptx' });
}
