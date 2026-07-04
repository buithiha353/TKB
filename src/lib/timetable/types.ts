export type ID = string;

export type Session = "AM" | "PM";

export interface School {
  id: ID;
  name: string;
}

export interface SchoolClass {
  id: ID;
  name: string;
  grade: 6 | 7 | 8 | 9;
  schoolId: ID;
}

export interface Subject {
  id: ID;
  name: string;
  shortName: string;
  defaultPeriods: number;
  canDouble: boolean; // được phép xếp 2 tiết liên tiếp
}

export interface Teacher {
  id: ID;
  name: string;
  subjectIds: ID[];
  primarySchoolId: ID;
  secondarySchoolId?: ID | null;
  morningOffDay: number; // 1..5, buổi sáng nghỉ trong tuần
}

export interface Assignment {
  id: ID;
  classId: ID;
  subjectId: ID;
  teacherId: ID;
  periods: number; // tiết/tuần
}

export interface Settings {
  schoolName: string;
  morningPeriods: number; // 4 hoặc 5
  afternoonPeriods: number; // 3 hoặc 4
  days: number; // 5
  sites?: 1 | 2; // số điểm trường
  ruleTeacherMorningOff?: boolean; // mỗi GV nghỉ 1 buổi sáng/tuần
  ruleSingleSitePerSession?: boolean; // GV chỉ ở 1 điểm trường/buổi
  ruleAllowDouble?: boolean; // cho phép 2 tiết cùng môn liên tiếp (Văn/Toán)
  ruleMaxSameSubjectPerDay?: 1 | 2; // tối đa tiết cùng môn/ngày/lớp
}

// key: `${day}-${session}-${period}-${classId}`
export interface Lesson {
  day: number; // 1..5
  session: Session;
  period: number; // 1..N
  classId: ID;
  subjectId: ID;
  teacherId: ID;
}

export type Timetable = Record<string, Lesson>;

export const DAY_NAMES = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];

export function slotKey(
  day: number,
  session: Session,
  period: number,
  classId: ID,
) {
  return `${day}-${session}-${period}-${classId}`;
}