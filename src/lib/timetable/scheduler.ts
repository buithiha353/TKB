import type {
  Assignment,
  ID,
  Lesson,
  SchoolClass,
  Session,
  Settings,
  Subject,
  Teacher,
  Timetable,
} from "./types";
import { slotKey } from "./types";

interface Ctx {
  settings: Settings;
  classes: SchoolClass[];
  subjects: Subject[];
  teachers: Teacher[];
  assignments: Assignment[];
}

interface Slot {
  day: number;
  session: Session;
  period: number;
}

export interface ScheduleResult {
  timetable: Timetable;
  unplaced: { assignmentId: ID; remaining: number }[];
  totalPlaced: number;
  totalNeeded: number;
}

function allSlots(settings: Settings): Slot[] {
  const out: Slot[] = [];
  for (let d = 1; d <= settings.days; d++) {
    for (let p = 1; p <= settings.morningPeriods; p++)
      out.push({ day: d, session: "AM", period: p });
    for (let p = 1; p <= settings.afternoonPeriods; p++)
      out.push({ day: d, session: "PM", period: p });
  }
  return out;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateScheduleSingle(ctx: Ctx): ScheduleResult {
  const { settings, assignments, subjects, teachers, classes } = ctx;
  const subjectMap = new Map(subjects.map((s) => [s.id, s]));
  const teacherMap = new Map(teachers.map((t) => [t.id, t]));
  const classMap = new Map(classes.map((c) => [c.id, c]));
  const slots = allSlots(settings);

  // "lesson requests" — each assignment expanded to its `periods` copies
  interface Req {
    aid: ID;
    classId: ID;
    subjectId: ID;
    teacherId: ID;
  }
  const requests: Req[] = [];
  for (const a of assignments) {
    for (let i = 0; i < a.periods; i++) {
      requests.push({
        aid: a.id,
        classId: a.classId,
        subjectId: a.subjectId,
        teacherId: a.teacherId,
      });
    }
  }

  // Priority: subjects with more periods first + teachers with more constraints
  requests.sort((a, b) => {
    const sa = subjectMap.get(a.subjectId)!;
    const sb = subjectMap.get(b.subjectId)!;
    return sb.defaultPeriods - sa.defaultPeriods;
  });

  const timetable: Timetable = {};
  // teacher busy: `${day}-${session}-${period}` -> teacherId set
  const teacherBusy = new Map<string, Set<ID>>();
  const classBusy = new Map<string, Set<ID>>();
  // teacher session location: `${teacherId}-${day}-${session}` -> schoolId
  const teacherSession = new Map<string, ID>();
  // count subject per class per day (for balance)
  const countPerDay = new Map<string, number>(); // `${classId}-${day}-${subjectId}` -> n

  const isValid = (req: Req, slot: Slot): "ok" | "soft" | "bad" => {
    const teacher = teacherMap.get(req.teacherId)!;
    const cls = classMap.get(req.classId)!;
    const sub = subjectMap.get(req.subjectId)!;

    // GV nghỉ buổi sáng
    if (slot.session === "AM" && teacher.morningOffDay === slot.day) return "bad";

    // Giới hạn tiết sáng thứ 2
    if (settings.maxMondayMorningPeriods && slot.day === 1 && slot.session === "AM" && slot.period > settings.maxMondayMorningPeriods) {
      return "bad";
    }

    const slotK = `${slot.day}-${slot.session}-${slot.period}`;
    if (teacherBusy.get(slotK)?.has(req.teacherId)) return "bad";
    if (classBusy.get(slotK)?.has(req.classId)) return "bad";

    // Session-location: GV chỉ ở 1 điểm trường trong 1 buổi
    const sessK = `${req.teacherId}-${slot.day}-${slot.session}`;
    const existing = teacherSession.get(sessK);
    if (existing && existing !== cls.schoolId) return "bad";

    // Không xếp 2 tiết liên tiếp cùng môn (trừ canDouble)
    if (!sub.canDouble) {
      const prevK = slotKey(slot.day, slot.session, slot.period - 1, req.classId);
      const nextK = slotKey(slot.day, slot.session, slot.period + 1, req.classId);
      if (timetable[prevK]?.subjectId === req.subjectId) return "bad";
      if (timetable[nextK]?.subjectId === req.subjectId) return "bad";
    } else {
      // canDouble: cho phép 1 cặp, nhưng không nhiều hơn 2 liên tiếp
      const prevK = slotKey(slot.day, slot.session, slot.period - 1, req.classId);
      const prev2K = slotKey(slot.day, slot.session, slot.period - 2, req.classId);
      const nextK = slotKey(slot.day, slot.session, slot.period + 1, req.classId);
      const next2K = slotKey(slot.day, slot.session, slot.period + 2, req.classId);
      if (
        timetable[prevK]?.subjectId === req.subjectId &&
        timetable[prev2K]?.subjectId === req.subjectId
      )
        return "bad";
      if (
        timetable[nextK]?.subjectId === req.subjectId &&
        timetable[next2K]?.subjectId === req.subjectId
      )
        return "bad";
    }

    // Cân đối: tối đa 2 tiết cùng môn/ngày/lớp (canDouble cho 3)
    const cntK = `${req.classId}-${slot.day}-${req.subjectId}`;
    const cnt = countPerDay.get(cntK) || 0;
    const cap = sub.canDouble ? 2 : 1;
    if (cnt >= cap) return "soft";

    // Không để trống tiết xen giữa: tiết P chỉ được xếp khi P-1 đã có tiết
    if (slot.period > 1) {
      const prevSameClass = slotKey(slot.day, slot.session, slot.period - 1, req.classId);
      if (!timetable[prevSameClass]) return "bad";
    }

    // Ưu tiên điểm trường chính
    if (teacher.primarySchoolId !== cls.schoolId) return "soft";

    return "ok";
  };

  const place = (req: Req, slot: Slot) => {
    const cls = classMap.get(req.classId)!;
    const k = slotKey(slot.day, slot.session, slot.period, req.classId);
    timetable[k] = { ...slot, ...req };
    const slotK = `${slot.day}-${slot.session}-${slot.period}`;
    (teacherBusy.get(slotK) || teacherBusy.set(slotK, new Set()).get(slotK)!).add(req.teacherId);
    (classBusy.get(slotK) || classBusy.set(slotK, new Set()).get(slotK)!).add(req.classId);
    teacherSession.set(`${req.teacherId}-${slot.day}-${slot.session}`, cls.schoolId);
    const cntK = `${req.classId}-${slot.day}-${req.subjectId}`;
    countPerDay.set(cntK, (countPerDay.get(cntK) || 0) + 1);
  };

  const unplacedMap = new Map<ID, number>();

  for (const req of requests) {
    // Sắp xếp slot theo mức độ ưu tiên
    let prioritizedSlots = shuffle(slots);
    if (settings.fillMorningFirst && settings.targetMorningPeriods) {
      const target = settings.targetMorningPeriods;
      prioritizedSlots.sort((a, b) => {
        const priorityA = a.session === "AM" && a.period <= target ? 1 : a.session === "PM" ? 2 : 3;
        const priorityB = b.session === "AM" && b.period <= target ? 1 : b.session === "PM" ? 2 : 3;
        if (priorityA !== priorityB) return priorityA - priorityB;
        return a.period - b.period; // Cùng nhóm thì ưu tiên period thấp để tránh khoảng trống
      });
    } else {
      prioritizedSlots.sort((a, b) => a.period - b.period);
    }
    
    // pass 1: hard-ok only
    let placed = false;
    const okSlots: Slot[] = [];
    const softSlots: Slot[] = [];
    for (const s of prioritizedSlots) {
      const v = isValid(req, s);
      if (v === "ok") okSlots.push(s);
      else if (v === "soft") softSlots.push(s);
    }
    const target = okSlots[0] || softSlots[0];
    if (target) {
      place(req, target);
      placed = true;
    }
    if (!placed) {
      unplacedMap.set(req.aid, (unplacedMap.get(req.aid) || 0) + 1);
    }
  }

  const unplaced = Array.from(unplacedMap.entries()).map(([aid, n]) => ({
    assignmentId: aid,
    remaining: n,
  }));
  const totalNeeded = requests.length;
  const totalPlaced = totalNeeded - unplaced.reduce((s, x) => s + x.remaining, 0);
  return { timetable, unplaced, totalPlaced, totalNeeded };
}

export function generateSchedule(ctx: Ctx, iterations = 50): ScheduleResult {
  let best: ScheduleResult | null = null;
  for (let i = 0; i < iterations; i++) {
    const res = generateScheduleSingle(ctx);
    if (!best || res.totalPlaced > best.totalPlaced) {
      best = res;
    }
    // Nếu xếp được 100% thì dừng sớm luôn cho nhanh
    if (best.totalPlaced === best.totalNeeded) break;
  }
  return best!;
}

// Kiểm tra xung đột khi chỉnh tay (dời 1 lesson tới slot mới hoặc hoán đổi)
export function checkConflict(
  timetable: Timetable,
  ctx: Ctx,
  lesson: Lesson,
  target: { day: number; session: Session; period: number; classId: ID },
): string | null {
  const teacher = ctx.teachers.find((t) => t.id === lesson.teacherId);
  const cls = ctx.classes.find((c) => c.id === target.classId);
  if (!teacher || !cls) return "Dữ liệu không hợp lệ";
  if (target.session === "AM" && teacher.morningOffDay === target.day)
    return `GV ${teacher.name} nghỉ buổi sáng thứ ${target.day + 1}`;
  // Không tạo khoảng trống xen giữa: đích đến phải liền kề với các tiết đã có
  if (target.period > 1) {
    const prevK = slotKey(target.day, target.session, target.period - 1, target.classId);
    const sourceK = slotKey(lesson.day, lesson.session, lesson.period, lesson.classId);
    // nếu ô liền trước trống (và không phải là chính ô nguồn đang chuyển đi), thì cấm
    if (!timetable[prevK] && prevK !== sourceK) {
      return "Không được để trống tiết xen giữa trong buổi";
    }
  }
  // teacher elsewhere at same slot
  for (const [k, l] of Object.entries(timetable)) {
    if (k === slotKey(lesson.day, lesson.session, lesson.period, lesson.classId))
      continue;
    if (
      l.day === target.day &&
      l.session === target.session &&
      l.period === target.period &&
      l.teacherId === lesson.teacherId
    )
      return `GV ${teacher.name} đã có tiết khác cùng lúc`;
  }
  // session location
  for (const [, l] of Object.entries(timetable)) {
    if (
      l.day === target.day &&
      l.session === target.session &&
      l.teacherId === lesson.teacherId
    ) {
      const otherCls = ctx.classes.find((c) => c.id === l.classId);
      if (otherCls && otherCls.schoolId !== cls.schoolId)
        return `GV đang ở điểm trường khác trong buổi này`;
    }
  }
  return null;
}