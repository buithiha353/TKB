import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Assignment,
  ID,
  School,
  SchoolClass,
  Settings,
  Subject,
  Teacher,
  Timetable,
} from "./types";
import { seedAssignments, seedClasses, seedSchools, seedSubjects, seedTeachers } from "./seed";

interface State {
  settings: Settings;
  schools: School[];
  classes: SchoolClass[];
  subjects: Subject[];
  teachers: Teacher[];
  assignments: Assignment[];
  timetable: Timetable;
  onboarded: boolean;

  setSettings: (s: Partial<Settings>) => void;
  setOnboarded: (v: boolean) => void;
  startFresh: () => void;

  addSchool: (s: Omit<School, "id">) => void;
  updateSchool: (id: ID, patch: Partial<School>) => void;
  removeSchool: (id: ID) => void;

  addClass: (c: Omit<SchoolClass, "id">) => void;
  updateClass: (id: ID, patch: Partial<SchoolClass>) => void;
  removeClass: (id: ID) => void;

  addSubject: (s: Omit<Subject, "id">) => void;
  updateSubject: (id: ID, patch: Partial<Subject>) => void;
  removeSubject: (id: ID) => void;

  addTeacher: (t: Omit<Teacher, "id">) => void;
  updateTeacher: (id: ID, patch: Partial<Teacher>) => void;
  removeTeacher: (id: ID) => void;
  syncTeacherClasses: (teacherId: ID, classIds: ID[]) => void;

  addAssignment: (a: Omit<Assignment, "id">) => void;
  updateAssignment: (id: ID, patch: Partial<Assignment>) => void;
  removeAssignment: (id: ID) => void;

  setTimetable: (t: Timetable) => void;
  clearTimetable: () => void;

  exportData: () => string;
  importData: (json: string) => boolean;
  resetAll: () => void;
}

const rid = () => Math.random().toString(36).slice(2, 10);

const defaultSettings: Settings = {
  schoolName: "Trường THCS Demo",
  morningPeriods: 5,
  afternoonPeriods: 3,
  days: 5,
  sites: 2,
  ruleTeacherMorningOff: true,
  ruleSingleSitePerSession: true,
  ruleAllowDouble: true,
  ruleMaxSameSubjectPerDay: 2,
  targetMorningPeriods: 4,
  fillMorningFirst: true,
  maxMondayMorningPeriods: 4,
};

type LegacyAssignment = Assignment & { periods?: number };

interface ImportedData {
  settings?: Settings;
  schools?: School[];
  classes?: SchoolClass[];
  subjects?: Subject[];
  teachers?: Teacher[];
  assignments?: LegacyAssignment[];
  timetable?: Timetable;
}

function normalizeAssignment(assignment: LegacyAssignment): Assignment {
  if (assignment.periods === undefined) {
    return assignment;
  }

  const { periods, ...nextAssignment } = assignment;
  return {
    ...nextAssignment,
    morningPeriods: periods,
    afternoonPeriods: 0,
  };
}

function initial() {
  return {
    settings: defaultSettings,
    schools: seedSchools,
    classes: seedClasses,
    subjects: seedSubjects,
    teachers: seedTeachers,
    assignments: seedAssignments(),
    timetable: {} as Timetable,
    onboarded: false,
  };
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      ...initial(),

      setSettings: (s) => set((st) => ({ settings: { ...st.settings, ...s } })),
      setOnboarded: (v) => set({ onboarded: v }),
      startFresh: () =>
        set({
          schools: [],
          classes: [],
          teachers: [],
          assignments: [],
          timetable: {},
        }),

      addSchool: (s) => set((st) => ({ schools: [...st.schools, { ...s, id: rid() }] })),
      updateSchool: (id, patch) =>
        set((st) => ({
          schools: st.schools.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeSchool: (id) => set((st) => ({ schools: st.schools.filter((x) => x.id !== id) })),

      addClass: (c) => set((st) => ({ classes: [...st.classes, { ...c, id: rid() }] })),
      updateClass: (id, patch) =>
        set((st) => ({
          classes: st.classes.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeClass: (id) =>
        set((st) => ({
          classes: st.classes.filter((x) => x.id !== id),
          assignments: st.assignments.filter((a) => a.classId !== id),
        })),

      addSubject: (s) => set((st) => ({ subjects: [...st.subjects, { ...s, id: rid() }] })),
      updateSubject: (id, patch) =>
        set((st) => ({
          subjects: st.subjects.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeSubject: (id) =>
        set((st) => ({
          subjects: st.subjects.filter((x) => x.id !== id),
          assignments: st.assignments.filter((a) => a.subjectId !== id),
        })),

      addTeacher: (t) => set((st) => ({ teachers: [...st.teachers, { ...t, id: rid() }] })),
      updateTeacher: (id, patch) =>
        set((st) => ({
          teachers: st.teachers.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeTeacher: (id) =>
        set((st) => ({
          teachers: st.teachers.filter((x) => x.id !== id),
          assignments: st.assignments.filter((a) => a.teacherId !== id),
        })),
      syncTeacherClasses: (teacherId, classIds) =>
        set((st) => {
          const teacher = st.teachers.find((t) => t.id === teacherId);
          if (!teacher) return st;
          // Lấy danh sách classId hiện tại của giáo viên này
          const currentClassIds = Array.from(
            new Set(st.assignments.filter((a) => a.teacherId === teacherId).map((a) => a.classId)),
          );

          const toRemove = currentClassIds.filter((cid) => !classIds.includes(cid));
          const toAdd = classIds.filter((cid) => !currentClassIds.includes(cid));

          const nextAss = st.assignments.filter(
            (a) => !(a.teacherId === teacherId && toRemove.includes(a.classId)),
          );

          for (const cid of toAdd) {
            for (const sid of teacher.subjectIds) {
              const sub = st.subjects.find((s) => s.id === sid);
              if (sub) {
                nextAss.push({
                  id: rid(),
                  teacherId,
                  classId: cid,
                  subjectId: sid,
                  morningPeriods: sub.defaultPeriods,
                  afternoonPeriods: 0,
                });
              }
            }
          }
          return { assignments: nextAss };
        }),

      addAssignment: (a) =>
        set((st) => ({
          assignments: [...st.assignments, { ...a, id: rid() }],
        })),
      updateAssignment: (id, patch) =>
        set((st) => ({
          assignments: st.assignments.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        })),
      removeAssignment: (id) =>
        set((st) => ({
          assignments: st.assignments.filter((x) => x.id !== id),
        })),

      setTimetable: (t) => set({ timetable: t }),
      clearTimetable: () => set({ timetable: {} }),

      exportData: () => JSON.stringify(get(), null, 2),
      importData: (json) => {
        try {
          const data = JSON.parse(json) as ImportedData;
          set({
            settings: data.settings || defaultSettings,
            schools: data.schools || [],
            classes: data.classes || [],
            subjects: data.subjects || [],
            teachers: data.teachers || [],
            assignments: (data.assignments || []).map(normalizeAssignment),
            timetable: data.timetable || {},
          });
          return true;
        } catch {
          return false;
        }
      },
      resetAll: () => set(initial()),
    }),
    {
      name: "tkb-thcs-v1",
      version: 3,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as ImportedData;
        if (version < 3 && state.assignments) {
          state.assignments = state.assignments.map(normalizeAssignment);
        }
        return state;
      },
    },
  ),
);
