import type {
  Assignment,
  School,
  SchoolClass,
  Subject,
  Teacher,
} from "./types";

const uid = (p: string, i: number | string) => `${p}_${i}`;

export const seedSchools: School[] = [
  { id: "sch_a", name: "Điểm trường A (Chính)" },
  { id: "sch_b", name: "Điểm trường B (Lẻ)" },
];

export const seedClasses: SchoolClass[] = [
  { id: "cls_6a", name: "6A", grade: 6, schoolId: "sch_a" },
  { id: "cls_6b", name: "6B", grade: 6, schoolId: "sch_b" },
  { id: "cls_7a", name: "7A", grade: 7, schoolId: "sch_a" },
  { id: "cls_7b", name: "7B", grade: 7, schoolId: "sch_b" },
  { id: "cls_8a", name: "8A", grade: 8, schoolId: "sch_a" },
  { id: "cls_8b", name: "8B", grade: 8, schoolId: "sch_a" },
  { id: "cls_9a", name: "9A", grade: 9, schoolId: "sch_a" },
  { id: "cls_9b", name: "9B", grade: 9, schoolId: "sch_b" },
];

// Theo Thông tư 32/2018 – chương trình GDPT 2018 cấp THCS
export const seedSubjects: Subject[] = [
  { id: "sub_van", name: "Ngữ văn", shortName: "Văn", defaultPeriods: 4, canDouble: true },
  { id: "sub_toan", name: "Toán", shortName: "Toán", defaultPeriods: 4, canDouble: true },
  { id: "sub_anh", name: "Tiếng Anh", shortName: "Anh", defaultPeriods: 3, canDouble: false },
  { id: "sub_khtn", name: "Khoa học tự nhiên", shortName: "KHTN", defaultPeriods: 4, canDouble: false },
  { id: "sub_lsdl", name: "Lịch sử và Địa lí", shortName: "LS&ĐL", defaultPeriods: 3, canDouble: false },
  { id: "sub_gdcd", name: "Giáo dục công dân", shortName: "GDCD", defaultPeriods: 1, canDouble: false },
  { id: "sub_cn", name: "Công nghệ", shortName: "CN", defaultPeriods: 1, canDouble: false },
  { id: "sub_th", name: "Tin học", shortName: "Tin", defaultPeriods: 1, canDouble: false },
  { id: "sub_gdtc", name: "Giáo dục thể chất", shortName: "GDTC", defaultPeriods: 2, canDouble: false },
  { id: "sub_nt", name: "Nghệ thuật", shortName: "NT", defaultPeriods: 2, canDouble: false },
  { id: "sub_htn", name: "HĐTN - HN", shortName: "HĐTN", defaultPeriods: 3, canDouble: false },
  { id: "sub_ddp", name: "Nội dung địa phương", shortName: "GDĐP", defaultPeriods: 1, canDouble: false },
];

export const seedTeachers: Teacher[] = [
  { id: "t_van1", name: "Nguyễn Thị An", subjectIds: ["sub_van"], primarySchoolId: "sch_a", morningOffDay: 4 },
  { id: "t_van2", name: "Trần Thị Bình", subjectIds: ["sub_van"], primarySchoolId: "sch_b", secondarySchoolId: "sch_a", morningOffDay: 5 },
  { id: "t_toan1", name: "Lê Văn Cường", subjectIds: ["sub_toan"], primarySchoolId: "sch_a", morningOffDay: 3 },
  { id: "t_toan2", name: "Phạm Thị Dung", subjectIds: ["sub_toan"], primarySchoolId: "sch_a", secondarySchoolId: "sch_b", morningOffDay: 2 },
  { id: "t_anh1", name: "Hoàng Văn Em", subjectIds: ["sub_anh"], primarySchoolId: "sch_a", morningOffDay: 5 },
  { id: "t_anh2", name: "Vũ Thị Phương", subjectIds: ["sub_anh"], primarySchoolId: "sch_b", secondarySchoolId: "sch_a", morningOffDay: 4 },
  { id: "t_khtn1", name: "Đặng Văn Giang", subjectIds: ["sub_khtn"], primarySchoolId: "sch_a", morningOffDay: 2 },
  { id: "t_khtn2", name: "Bùi Thị Hà", subjectIds: ["sub_khtn"], primarySchoolId: "sch_a", secondarySchoolId: "sch_b", morningOffDay: 3 },
  { id: "t_lsdl1", name: "Ngô Thị Inh", subjectIds: ["sub_lsdl", "sub_gdcd"], primarySchoolId: "sch_a", morningOffDay: 5 },
  { id: "t_lsdl2", name: "Đỗ Văn Khoa", subjectIds: ["sub_lsdl", "sub_ddp"], primarySchoolId: "sch_b", secondarySchoolId: "sch_a", morningOffDay: 3 },
  { id: "t_cn", name: "Lý Thị Lan", subjectIds: ["sub_cn", "sub_th"], primarySchoolId: "sch_a", secondarySchoolId: "sch_b", morningOffDay: 4 },
  { id: "t_gdtc", name: "Trịnh Văn Minh", subjectIds: ["sub_gdtc"], primarySchoolId: "sch_a", secondarySchoolId: "sch_b", morningOffDay: 2 },
  { id: "t_nt", name: "Phan Thị Nga", subjectIds: ["sub_nt"], primarySchoolId: "sch_a", secondarySchoolId: "sch_b", morningOffDay: 5 },
  { id: "t_htn", name: "Mai Văn Oanh", subjectIds: ["sub_htn"], primarySchoolId: "sch_a", secondarySchoolId: "sch_b", morningOffDay: 3 },
  { id: "t_htn2", name: "Cao Thị Phúc", subjectIds: ["sub_htn", "sub_gdcd"], primarySchoolId: "sch_b", morningOffDay: 4 },
];

// Phân công dạy: mỗi (lớp × môn) → 1 GV. Sinh tự động theo seed.
export function seedAssignments(): Assignment[] {
  const assignments: Assignment[] = [];
  const teachersBySubject: Record<string, string[]> = {};
  for (const t of seedTeachers) {
    for (const s of t.subjectIds) {
      (teachersBySubject[s] ||= []).push(t.id);
    }
  }
  let counter = 0;
  for (const cls of seedClasses) {
    for (const sub of seedSubjects) {
      const pool = teachersBySubject[sub.id] || [];
      if (!pool.length) continue;
      // ưu tiên GV có điểm trường trùng
      const preferred =
        pool.find((tid) => {
          const t = seedTeachers.find((x) => x.id === tid)!;
          return t.primarySchoolId === cls.schoolId;
        }) ||
        pool.find((tid) => {
          const t = seedTeachers.find((x) => x.id === tid)!;
          return t.secondarySchoolId === cls.schoolId;
        }) ||
        pool[counter % pool.length];
      assignments.push({
        id: uid("a", counter++),
        classId: cls.id,
        subjectId: sub.id,
        teacherId: preferred,
        periods: sub.defaultPeriods,
      });
    }
  }
  return assignments;
}