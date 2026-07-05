import { n as slotKey } from "./types-CyutgW7l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scheduler-Bl9nhuKq.js
function allSlots(settings) {
	const out = [];
	for (let d = 1; d <= settings.days; d++) {
		for (let p = 1; p <= settings.morningPeriods; p++) out.push({
			day: d,
			session: "AM",
			period: p
		});
		for (let p = 1; p <= settings.afternoonPeriods; p++) out.push({
			day: d,
			session: "PM",
			period: p
		});
	}
	return out;
}
function shuffle(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function generateScheduleSingle(ctx) {
	const { settings, assignments, subjects, teachers, classes } = ctx;
	const subjectMap = new Map(subjects.map((s) => [s.id, s]));
	const teacherMap = new Map(teachers.map((t) => [t.id, t]));
	const classMap = new Map(classes.map((c) => [c.id, c]));
	const slots = allSlots(settings);
	const requests = [];
	for (const a of assignments) {
		for (let i = 0; i < (a.morningPeriods || 0); i++) requests.push({
			aid: a.id,
			classId: a.classId,
			subjectId: a.subjectId,
			teacherId: a.teacherId,
			requiredSession: "AM"
		});
		for (let i = 0; i < (a.afternoonPeriods || 0); i++) requests.push({
			aid: a.id,
			classId: a.classId,
			subjectId: a.subjectId,
			teacherId: a.teacherId,
			requiredSession: "PM"
		});
	}
	requests.sort((a, b) => {
		const sa = subjectMap.get(a.subjectId);
		return subjectMap.get(b.subjectId).defaultPeriods - sa.defaultPeriods;
	});
	const timetable = {};
	const teacherBusy = /* @__PURE__ */ new Map();
	const classBusy = /* @__PURE__ */ new Map();
	const teacherSession = /* @__PURE__ */ new Map();
	const countPerDay = /* @__PURE__ */ new Map();
	const isValid = (req, slot) => {
		const teacher = teacherMap.get(req.teacherId);
		const cls = classMap.get(req.classId);
		const sub = subjectMap.get(req.subjectId);
		if (req.requiredSession !== slot.session) return "bad";
		if (ctx.settings.ruleTeacherMorningOff && slot.day === teacher.offDay) {
			if (slot.session === "AM") return "bad";
			if (slot.session === "PM" && teacher.isOffFullDay) return "bad";
		}
		if (settings.maxMondayMorningPeriods && slot.day === 1 && slot.session === "AM" && slot.period > settings.maxMondayMorningPeriods) return "bad";
		const slotK = `${slot.day}-${slot.session}-${slot.period}`;
		if (teacherBusy.get(slotK)?.has(req.teacherId)) return "bad";
		if (classBusy.get(slotK)?.has(req.classId)) return "bad";
		const sessK = `${req.teacherId}-${slot.day}-${slot.session}`;
		const existing = teacherSession.get(sessK);
		if (existing && existing !== cls.schoolId) return "bad";
		if (!sub.canDouble) {
			const prevK = slotKey(slot.day, slot.session, slot.period - 1, req.classId);
			const nextK = slotKey(slot.day, slot.session, slot.period + 1, req.classId);
			if (timetable[prevK]?.subjectId === req.subjectId) return "bad";
			if (timetable[nextK]?.subjectId === req.subjectId) return "bad";
		} else {
			const prevK = slotKey(slot.day, slot.session, slot.period - 1, req.classId);
			const prev2K = slotKey(slot.day, slot.session, slot.period - 2, req.classId);
			const nextK = slotKey(slot.day, slot.session, slot.period + 1, req.classId);
			const next2K = slotKey(slot.day, slot.session, slot.period + 2, req.classId);
			if (timetable[prevK]?.subjectId === req.subjectId && timetable[prev2K]?.subjectId === req.subjectId) return "bad";
			if (timetable[nextK]?.subjectId === req.subjectId && timetable[next2K]?.subjectId === req.subjectId) return "bad";
		}
		const cntK = `${req.classId}-${slot.day}-${req.subjectId}`;
		if ((countPerDay.get(cntK) || 0) >= (sub.canDouble ? 2 : 1)) return "soft";
		if (slot.period > 1) {
			const prevSameClass = slotKey(slot.day, slot.session, slot.period - 1, req.classId);
			if (!timetable[prevSameClass]) return "bad";
		}
		if (!teacher.schoolIds.includes(cls.schoolId)) return "soft";
		return "ok";
	};
	const place = (req, slot) => {
		const cls = classMap.get(req.classId);
		const k = slotKey(slot.day, slot.session, slot.period, req.classId);
		timetable[k] = {
			...slot,
			...req
		};
		const slotK = `${slot.day}-${slot.session}-${slot.period}`;
		(teacherBusy.get(slotK) || teacherBusy.set(slotK, /* @__PURE__ */ new Set()).get(slotK)).add(req.teacherId);
		(classBusy.get(slotK) || classBusy.set(slotK, /* @__PURE__ */ new Set()).get(slotK)).add(req.classId);
		teacherSession.set(`${req.teacherId}-${slot.day}-${slot.session}`, cls.schoolId);
		const cntK = `${req.classId}-${slot.day}-${req.subjectId}`;
		countPerDay.set(cntK, (countPerDay.get(cntK) || 0) + 1);
	};
	const unplacedMap = /* @__PURE__ */ new Map();
	for (const req of requests) {
		let prioritizedSlots = shuffle(slots);
		if (settings.fillMorningFirst && settings.targetMorningPeriods) {
			const target = settings.targetMorningPeriods;
			prioritizedSlots.sort((a, b) => {
				const priorityA = a.session === "AM" && a.period <= target ? 1 : a.session === "PM" ? 2 : 3;
				const priorityB = b.session === "AM" && b.period <= target ? 1 : b.session === "PM" ? 2 : 3;
				if (priorityA !== priorityB) return priorityA - priorityB;
				return a.period - b.period;
			});
		} else prioritizedSlots.sort((a, b) => a.period - b.period);
		let placed = false;
		const okSlots = [];
		const softSlots = [];
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
		if (!placed) unplacedMap.set(req.aid, (unplacedMap.get(req.aid) || 0) + 1);
	}
	const unplaced = Array.from(unplacedMap.entries()).map(([aid, n]) => ({
		assignmentId: aid,
		remaining: n
	}));
	const totalNeeded = assignments.reduce((a, b) => a + (b.morningPeriods || 0) + (b.afternoonPeriods || 0), 0);
	return {
		timetable,
		unplaced,
		totalPlaced: totalNeeded - unplaced.reduce((s, x) => s + x.remaining, 0),
		totalNeeded
	};
}
function generateSchedule(ctx, iterations = 50) {
	let best = null;
	for (let i = 0; i < iterations; i++) {
		const res = generateScheduleSingle(ctx);
		if (!best || res.totalPlaced > best.totalPlaced) best = res;
		if (best.totalPlaced === best.totalNeeded) break;
	}
	return best;
}
function checkConflict(timetable, ctx, lesson, target) {
	const teacher = ctx.teachers.find((t) => t.id === lesson.teacherId);
	const cls = ctx.classes.find((c) => c.id === target.classId);
	if (!teacher || !cls) return "Dữ liệu không hợp lệ";
	if (target.day === teacher.offDay && (target.session === "AM" || teacher.isOffFullDay)) return `GV ${teacher.name} nghỉ buổi sáng thứ ${target.day + 1}`;
	const assignment = ctx.assignments.find((a) => a.classId === target.classId && a.subjectId === lesson.subjectId && a.teacherId === lesson.teacherId);
	if (assignment) {
		if (target.session === "AM" && (assignment.morningPeriods || 0) === 0) return `Môn này chỉ được học buổi Chiều (theo cấu hình số tiết)`;
		if (target.session === "PM" && (assignment.afternoonPeriods || 0) === 0) return `Môn này chỉ được học buổi Sáng (theo cấu hình số tiết)`;
	}
	const subject = ctx.subjects.find((s) => s.id === lesson.subjectId);
	if (subject) {
		let countOnDay = 0;
		const sourceK = slotKey(lesson.day, lesson.session, lesson.period, lesson.classId);
		for (const [k, l] of Object.entries(timetable)) {
			if (k === sourceK) continue;
			if (l.classId === target.classId && l.day === target.day && l.subjectId === lesson.subjectId) countOnDay++;
		}
		const cap = subject.canDouble ? 2 : 1;
		if (countOnDay + 1 > cap) return `Môn ${subject.name} vượt quá mức tối đa ${cap} tiết/ngày`;
	}
	if (target.period > 1) {
		const prevK = slotKey(target.day, target.session, target.period - 1, target.classId);
		const sourceK = slotKey(lesson.day, lesson.session, lesson.period, lesson.classId);
		if (!timetable[prevK] && prevK !== sourceK) return "Không được để trống tiết xen giữa trong buổi";
	}
	for (const [k, l] of Object.entries(timetable)) {
		if (k === slotKey(lesson.day, lesson.session, lesson.period, lesson.classId)) continue;
		if (l.day === target.day && l.session === target.session && l.period === target.period && l.teacherId === lesson.teacherId) return `GV ${teacher.name} đã có tiết khác cùng lúc`;
	}
	for (const [, l] of Object.entries(timetable)) if (l.day === target.day && l.session === target.session && l.teacherId === lesson.teacherId) {
		const otherCls = ctx.classes.find((c) => c.id === l.classId);
		if (otherCls && otherCls.schoolId !== cls.schoolId) return `GV đang ở điểm trường khác trong buổi này`;
	}
	return null;
}
function getAllConflicts(timetable, ctx) {
	const errors = /* @__PURE__ */ new Set();
	for (const [k, l] of Object.entries(timetable)) {
		const teacher = ctx.teachers.find((t) => t.id === l.teacherId);
		const cls = ctx.classes.find((c) => c.id === l.classId);
		const subject = ctx.subjects.find((s) => s.id === l.subjectId);
		if (!teacher || !cls || !subject) continue;
		if (l.day === teacher.offDay && (l.session === "AM" || teacher.isOffFullDay)) errors.add(`Lớp ${cls.name}: GV ${teacher.name} đang dạy vào ngày nghỉ (Sáng Thứ ${l.day + 1})`);
		const assignment = ctx.assignments.find((a) => a.classId === l.classId && a.subjectId === l.subjectId && a.teacherId === l.teacherId);
		if (assignment) {
			if (l.session === "AM" && (assignment.morningPeriods || 0) === 0) errors.add(`Lớp ${cls.name}: Môn ${subject.name} bị xếp vào Sáng nhưng cấu hình chỉ có tiết Chiều`);
			if (l.session === "PM" && (assignment.afternoonPeriods || 0) === 0) errors.add(`Lớp ${cls.name}: Môn ${subject.name} bị xếp vào Chiều nhưng cấu hình chỉ có tiết Sáng`);
		}
		let countOnDay = 0;
		for (const l2 of Object.values(timetable)) if (l2.classId === l.classId && l2.day === l.day && l2.subjectId === l.subjectId) countOnDay++;
		const cap = subject.canDouble ? 2 : 1;
		if (countOnDay > cap) errors.add(`Lớp ${cls.name}: Môn ${subject.name} đang có ${countOnDay} tiết trong Thứ ${l.day + 1} (vượt mức ${cap})`);
		if (l.period > 1) {
			if (!timetable[slotKey(l.day, l.session, l.period - 1, l.classId)]) errors.add(`Lớp ${cls.name}: Có khoảng trống trước tiết ${l.period} buổi ${l.session === "AM" ? "Sáng" : "Chiều"} Thứ ${l.day + 1}`);
		}
		for (const [k2, l2] of Object.entries(timetable)) {
			if (k === k2) continue;
			if (l2.day === l.day && l2.session === l.session && l2.period === l.period && l2.teacherId === l.teacherId) {
				const otherCls = ctx.classes.find((c) => c.id === l2.classId);
				errors.add(`Trùng lịch GV ${teacher.name}: dạy cùng lúc lớp ${cls.name} và ${otherCls?.name} (Tiết ${l.period} ${l.session === "AM" ? "Sáng" : "Chiều"} Thứ ${l.day + 1})`);
			}
		}
		for (const [k2, l2] of Object.entries(timetable)) if (l2.day === l.day && l2.session === l.session && l2.teacherId === l.teacherId) {
			const otherCls = ctx.classes.find((c) => c.id === l2.classId);
			if (otherCls && otherCls.schoolId !== cls.schoolId) errors.add(`Di chuyển GV ${teacher.name}: phải dạy ở 2 điểm trường khác nhau trong cùng buổi ${l.session === "AM" ? "Sáng" : "Chiều"} Thứ ${l.day + 1}`);
		}
	}
	return Array.from(errors).sort();
}
//#endregion
export { generateSchedule as n, getAllConflicts as r, checkConflict as t };
