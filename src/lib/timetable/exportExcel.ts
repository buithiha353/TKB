import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { DAY_NAMES, Session, SchoolClass, Subject, Teacher, Timetable, School, Settings } from "./types";

export async function exportTimetableToExcel({
  schools,
  classes,
  subjects,
  teachers,
  timetable,
  settings,
}: {
  schools: School[];
  classes: SchoolClass[];
  subjects: Subject[];
  teachers: Teacher[];
  timetable: Timetable;
  settings: Settings;
}) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("TKB Toàn Trường", {
    pageSetup: {
      paperSize: 9, // A4
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: {
        left: 0.2,
        right: 0.2,
        top: 0.5,
        bottom: 0.5,
        header: 0.2,
        footer: 0.2,
      },
    },
  });

  const subjectMap = new Map(subjects.map((s) => [s.id, s]));
  const teacherMap = new Map(teachers.map((t) => [t.id, t]));

  // Find branches
  const branch2Id = schools.length > 1 ? schools[1].id : null;

  // Split classes
  const group1 = classes.filter((c) => c.grade === 6 || c.grade === 7).sort((a, b) => a.name.localeCompare(b.name));
  const group2 = classes.filter((c) => c.grade === 8 || c.grade === 9).sort((a, b) => a.name.localeCompare(b.name));

  // Determine columns
  // Group 1: Thứ (1), Buổi (2), Tiết (3), ... Classes (4 to 3 + group1.length)
  // Group 2: Thứ (gap + 1), Buổi (gap + 2), Tiết (gap + 3), ... Classes (gap + 4 to gap + 3 + group2.length)
  
  const colGroup2Start = 3 + group1.length + 1; // 1 column gap or just next to it? Let's just put them next to each other
  // In the CSV it was: Thứ,Buổi, Tiết, 6A... 7G, Thứ,Buổi, Tiết, 8A... 9I
  
  // Row 1 & 2: Header
  ws.mergeCells(1, 1, 1, 3 + group1.length);
  ws.getCell(1, 1).value = settings.schoolName;
  ws.getCell(1, 1).font = { bold: true, size: 14 };
  ws.getCell(1, 1).alignment = { horizontal: "center", vertical: "middle" };

  ws.mergeCells(1, colGroup2Start, 1, colGroup2Start + 2 + group2.length);
  ws.getCell(1, colGroup2Start).value = settings.schoolName;
  ws.getCell(1, colGroup2Start).font = { bold: true, size: 14 };
  ws.getCell(1, colGroup2Start).alignment = { horizontal: "center", vertical: "middle" };

  ws.mergeCells(2, 1, 2, 3 + group1.length);
  ws.getCell(2, 1).value = "THỜI KHÓA BIỂU TOÀN TRƯỜNG";
  ws.getCell(2, 1).font = { bold: true, size: 16 };
  ws.getCell(2, 1).alignment = { horizontal: "center", vertical: "middle" };

  ws.mergeCells(2, colGroup2Start, 2, colGroup2Start + 2 + group2.length);
  ws.getCell(2, colGroup2Start).value = "THỜI KHÓA BIỂU TOÀN TRƯỜNG";
  ws.getCell(2, colGroup2Start).font = { bold: true, size: 16 };
  ws.getCell(2, colGroup2Start).alignment = { horizontal: "center", vertical: "middle" };

  // Row 4: Column Headers
  const headerRow = ws.getRow(4);
  headerRow.getCell(1).value = "Thứ";
  headerRow.getCell(2).value = "Buổi";
  headerRow.getCell(3).value = "Tiết";
  group1.forEach((c, i) => {
    headerRow.getCell(4 + i).value = c.name;
  });

  headerRow.getCell(colGroup2Start).value = "Thứ";
  headerRow.getCell(colGroup2Start + 1).value = "Buổi";
  headerRow.getCell(colGroup2Start + 2).value = "Tiết";
  group2.forEach((c, i) => {
    headerRow.getCell(colGroup2Start + 3 + i).value = c.name;
  });

  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };

  // Generate rows
  const periodsList: { session: Session; period: number; label: string }[] = [];
  for (let p = 1; p <= settings.morningPeriods; p++)
    periodsList.push({ session: "AM", period: p, label: `Sáng ${p}` });
  for (let p = 1; p <= settings.afternoonPeriods; p++)
    periodsList.push({ session: "PM", period: p, label: `Chiều ${p}` });

  let currentRowIdx = 5;

  const totalPeriodsPerDay = settings.morningPeriods + settings.afternoonPeriods;

  for (let d = 0; d < settings.days; d++) {
    const dayName = DAY_NAMES[d];
    const startRowDay = currentRowIdx;

    for (let pIdx = 0; pIdx < periodsList.length; pIdx++) {
      const row = ws.getRow(currentRowIdx);
      const periodDef = periodsList[pIdx];

      // Fill Group 1 (Grade 6,7)
      if (pIdx === 0) { // start of day
        // Merge "Thứ" cell for Group 1
        ws.mergeCells(currentRowIdx, 1, currentRowIdx + totalPeriodsPerDay - 1, 1);
        const dayCell1 = ws.getCell(currentRowIdx, 1);
        dayCell1.value = dayName;
        dayCell1.alignment = { vertical: "middle", horizontal: "center" };
        dayCell1.font = { bold: true };
      }

      if (periodDef.period === 1) { // start of session
        const sessionLen = periodDef.session === "AM" ? settings.morningPeriods : settings.afternoonPeriods;
        ws.mergeCells(currentRowIdx, 2, currentRowIdx + sessionLen - 1, 2);
        const sessionCell1 = ws.getCell(currentRowIdx, 2);
        sessionCell1.value = periodDef.session === "AM" ? "Sáng" : "Chiều";
        sessionCell1.alignment = { vertical: "middle", horizontal: "center", textRotation: 90 };
        sessionCell1.font = { bold: true };
      }

      row.getCell(3).value = periodDef.period;
      row.getCell(3).alignment = { horizontal: "center" };

      // Fill Classes Group 1
      group1.forEach((c, i) => {
        const lesson = timetable[c.id]?.[d]?.[periodDef.session]?.[periodDef.period];
        const cell = row.getCell(4 + i);
        if (lesson) {
          const sub = subjectMap.get(lesson.subjectId);
          const teacher = teacherMap.get(lesson.teacherId);
          cell.value = `${sub?.shortName || ""} - ${teacher?.name || ""}`;
        }
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      });


      // Fill Group 2 (Grade 8,9)
      if (pIdx === 0) { // start of day
        // Merge "Thứ" cell for Group 2
        ws.mergeCells(currentRowIdx, colGroup2Start, currentRowIdx + totalPeriodsPerDay - 1, colGroup2Start);
        const dayCell2 = ws.getCell(currentRowIdx, colGroup2Start);
        dayCell2.value = dayName;
        dayCell2.alignment = { vertical: "middle", horizontal: "center" };
        dayCell2.font = { bold: true };
      }

      if (periodDef.period === 1) { // start of session
        const sessionLen = periodDef.session === "AM" ? settings.morningPeriods : settings.afternoonPeriods;
        ws.mergeCells(currentRowIdx, colGroup2Start + 1, currentRowIdx + sessionLen - 1, colGroup2Start + 1);
        const sessionCell2 = ws.getCell(currentRowIdx, colGroup2Start + 1);
        sessionCell2.value = periodDef.session === "AM" ? "Sáng" : "Chiều";
        sessionCell2.alignment = { vertical: "middle", horizontal: "center", textRotation: 90 };
        sessionCell2.font = { bold: true };
      }

      row.getCell(colGroup2Start + 2).value = periodDef.period;
      row.getCell(colGroup2Start + 2).alignment = { horizontal: "center" };

      // Fill Classes Group 2
      group2.forEach((c, i) => {
        const lesson = timetable[c.id]?.[d]?.[periodDef.session]?.[periodDef.period];
        const cell = row.getCell(colGroup2Start + 3 + i);
        if (lesson) {
          const sub = subjectMap.get(lesson.subjectId);
          const teacher = teacherMap.get(lesson.teacherId);
          cell.value = `${sub?.shortName || ""} - ${teacher?.name || ""}`;
        }
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      });

      currentRowIdx++;
    }
  }

  // Styling & Borders
  // 1. Group 1 borders
  for (let r = 4; r < currentRowIdx; r++) {
    for (let c = 1; c <= 3 + group1.length; c++) {
      ws.getCell(r, c).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }
  }

  // 2. Group 2 borders
  for (let r = 4; r < currentRowIdx; r++) {
    for (let c = colGroup2Start; c <= colGroup2Start + 2 + group2.length; c++) {
      ws.getCell(r, c).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }
  }

  // 3. Highlight Branch 2
  if (branch2Id) {
    const branch2Fill: ExcelJS.Fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFF2CC" }, // Light yellow
    };

    group1.forEach((c, i) => {
      if (c.schoolId === branch2Id) {
        for (let r = 4; r < currentRowIdx; r++) {
          ws.getCell(r, 4 + i).fill = branch2Fill;
        }
      }
    });

    group2.forEach((c, i) => {
      if (c.schoolId === branch2Id) {
        for (let r = 4; r < currentRowIdx; r++) {
          ws.getCell(r, colGroup2Start + 3 + i).fill = branch2Fill;
        }
      }
    });
  }

  // Set column widths
  ws.getColumn(1).width = 5;
  ws.getColumn(2).width = 5;
  ws.getColumn(3).width = 5;
  for (let i = 0; i < group1.length; i++) {
    ws.getColumn(4 + i).width = 15;
  }

  ws.getColumn(colGroup2Start).width = 5;
  ws.getColumn(colGroup2Start + 1).width = 5;
  ws.getColumn(colGroup2Start + 2).width = 5;
  for (let i = 0; i < group2.length; i++) {
    ws.getColumn(colGroup2Start + 3 + i).width = 15;
  }

  const buffer = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "TKB_Toan_Truong.xlsx");
}
