import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as useSensor, i as useDroppable, n as PointerSensor, o as useSensors, r as useDraggable, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { i as cn, t as Button } from "./label-De8mfdsI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Trash2, d as Printer, i as TriangleAlert, o as Sparkles, y as CircleCheckBig } from "../_libs/lucide-react.mjs";
import { a as SelectTrigger, i as SelectItem, l as useStore, n as Select, o as SelectValue, r as SelectContent, t as AppLayout } from "./AppLayout-DfKgQ1vv.mjs";
import { n as CardContent, t as Card } from "./card-BzZ8bDzf.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./alert-Y_myOMcV.mjs";
import { n as slotKey, t as DAY_NAMES } from "./types-CyutgW7l.mjs";
import { n as generateSchedule, r as getAllConflicts, t as checkConflict } from "./scheduler-Bl9nhuKq.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/timetable-CFLRefC8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function TimetablePage() {
	const { settings, classes, subjects, teachers, assignments, timetable, setTimetable, clearTimetable } = useStore();
	const [mode, setMode] = (0, import_react.useState)("class");
	const [selectedClass, setSelectedClass] = (0, import_react.useState)(classes[0]?.id || "");
	const [selectedTeacher, setSelectedTeacher] = (0, import_react.useState)(teachers[0]?.id || "");
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
	const handleGenerate = () => {
		const res = generateSchedule({
			settings,
			classes,
			subjects,
			teachers,
			assignments
		});
		setTimetable(res.timetable);
		toast.success("Đã hoàn tất quá trình sinh TKB!");
	};
	const periodsList = (0, import_react.useMemo)(() => {
		const list = [];
		for (let p = 1; p <= settings.morningPeriods; p++) list.push({
			session: "AM",
			period: p,
			label: `Sáng ${p}`
		});
		for (let p = 1; p <= settings.afternoonPeriods; p++) list.push({
			session: "PM",
			period: p,
			label: `Chiều ${p}`
		});
		return list;
	}, [settings]);
	const subjectMap = (0, import_react.useMemo)(() => new Map(subjects.map((s) => [s.id, s])), [subjects]);
	const teacherMap = (0, import_react.useMemo)(() => new Map(teachers.map((t) => [t.id, t])), [teachers]);
	const classMap = (0, import_react.useMemo)(() => new Map(classes.map((c) => [c.id, c])), [classes]);
	const cells = (0, import_react.useMemo)(() => {
		const out = [];
		for (const p of periodsList) {
			const row = [];
			for (let d = 1; d <= settings.days; d++) {
				let lesson = null;
				let droppableId = "";
				if (mode === "class") {
					const k = slotKey(d, p.session, p.period, selectedClass);
					lesson = timetable[k] || null;
					droppableId = `cls|${selectedClass}|${d}|${p.session}|${p.period}`;
				} else {
					for (const l of Object.values(timetable)) if (l.teacherId === selectedTeacher && l.day === d && l.session === p.session && l.period === p.period) {
						lesson = l;
						break;
					}
					droppableId = `tch|${selectedTeacher}|${d}|${p.session}|${p.period}`;
				}
				row.push({
					day: d,
					session: p.session,
					period: p.period,
					lesson,
					droppableId
				});
			}
			out.push(row);
		}
		return out;
	}, [
		mode,
		selectedClass,
		selectedTeacher,
		periodsList,
		timetable,
		settings.days
	]);
	const handleDragEnd = (e) => {
		if (mode !== "class") return;
		const from = e.active.id;
		const to = e.over?.id;
		if (!to || from === to) return;
		const [, fClass, fD, fS, fP] = from.split("|");
		const [, tClass, tD, tS, tP] = to.split("|");
		if (fClass !== tClass) return;
		const fromKey = slotKey(Number(fD), fS, Number(fP), fClass);
		const toKey = slotKey(Number(tD), tS, Number(tP), tClass);
		const src = timetable[fromKey];
		const dst = timetable[toKey];
		if (!src) return;
		const ctx = {
			settings,
			classes,
			subjects,
			teachers,
			assignments
		};
		const target = {
			day: Number(tD),
			session: tS,
			period: Number(tP),
			classId: tClass
		};
		checkConflict(timetable, ctx, src, target);
		dst && checkConflict(timetable, ctx, dst, {
			day: Number(fD),
			session: fS,
			period: Number(fP),
			classId: fClass
		});
		const next = { ...timetable };
		delete next[fromKey];
		delete next[toKey];
		next[toKey] = {
			...src,
			day: Number(tD),
			session: tS,
			period: Number(tP),
			classId: tClass
		};
		if (dst) next[fromKey] = {
			...dst,
			day: Number(fD),
			session: fS,
			period: Number(fP),
			classId: fClass
		};
		setTimetable(next);
	};
	const classSummary = (0, import_react.useMemo)(() => {
		if (mode !== "class") return null;
		return assignments.filter((a) => a.classId === selectedClass).map((a) => {
			const placedMorning = Object.values(timetable).filter((l) => l.classId === selectedClass && l.subjectId === a.subjectId && l.teacherId === a.teacherId && l.session === "AM").length;
			const placedAfternoon = Object.values(timetable).filter((l) => l.classId === selectedClass && l.subjectId === a.subjectId && l.teacherId === a.teacherId && l.session === "PM").length;
			return {
				subject: subjectMap.get(a.subjectId),
				teacher: teacherMap.get(a.teacherId),
				needMorning: a.morningPeriods || 0,
				needAfternoon: a.afternoonPeriods || 0,
				placedMorning,
				placedAfternoon
			};
		});
	}, [
		mode,
		selectedClass,
		assignments,
		timetable,
		subjectMap,
		teacherMap
	]);
	const globalSummary = (0, import_react.useMemo)(() => {
		let totalNeeded = 0;
		const missingByClass = /* @__PURE__ */ new Map();
		for (const a of assignments) {
			const needMorning = a.morningPeriods || 0;
			const needAfternoon = a.afternoonPeriods || 0;
			totalNeeded += needMorning + needAfternoon;
			const placedMorning = Object.values(timetable).filter((l) => l.classId === a.classId && l.subjectId === a.subjectId && l.teacherId === a.teacherId && l.session === "AM").length;
			const placedAfternoon = Object.values(timetable).filter((l) => l.classId === a.classId && l.subjectId === a.subjectId && l.teacherId === a.teacherId && l.session === "PM").length;
			const missingMorning = Math.max(0, needMorning - placedMorning);
			const missingAfternoon = Math.max(0, needAfternoon - placedAfternoon);
			if (missingMorning > 0 || missingAfternoon > 0) {
				if (!missingByClass.has(a.classId)) missingByClass.set(a.classId, []);
				missingByClass.get(a.classId).push({
					subject: subjectMap.get(a.subjectId)?.name || "",
					teacher: teacherMap.get(a.teacherId)?.name || "",
					missingMorning,
					missingAfternoon
				});
			}
		}
		let totalMissing = 0;
		for (const list of missingByClass.values()) for (const item of list) totalMissing += item.missingMorning + item.missingAfternoon;
		return {
			totalNeeded,
			totalPlaced: totalNeeded - totalMissing,
			totalMissing,
			missingByClass: Array.from(missingByClass.entries()).map(([classId, items]) => ({
				className: classMap.get(classId)?.name || "",
				items
			})).sort((a, b) => a.className.localeCompare(b.className))
		};
	}, [
		assignments,
		timetable,
		classMap,
		subjectMap,
		teacherMap
	]);
	const globalConflicts = (0, import_react.useMemo)(() => {
		return getAllConflicts(timetable, {
			settings,
			classes,
			subjects,
			teachers,
			assignments
		});
	}, [
		timetable,
		settings,
		classes,
		subjects,
		teachers,
		assignments
	]);
	const currentTitle = mode === "class" ? `Lớp ${classMap.get(selectedClass)?.name || ""}` : `GV ${teacherMap.get(selectedTeacher)?.name || ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Thời khóa biểu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Kéo-thả ô để hoán đổi tiết (chỉ ở chế độ xem theo lớp)."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleGenerate,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-2 h-4 w-4" }), " Sinh TKB tự động"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "mr-2 h-4 w-4" }), " In"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => {
							if (confirm("Xóa toàn bộ TKB?")) clearTimetable();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Xóa TKB"]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-3 print:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: mode,
				onValueChange: (v) => setMode(v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "class",
					children: "Theo lớp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "teacher",
					children: "Theo GV"
				})] })
			}), mode === "class" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: selectedClass,
				onValueChange: setSelectedClass,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Chọn lớp" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: c.id,
					children: c.name
				}, c.id)) })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: selectedTeacher,
				onValueChange: setSelectedTeacher,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Chọn GV" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: teachers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: t.id,
					children: t.name
				}, t.id)) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden print:mb-3 print:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-lg font-bold",
				children: [
					settings.schoolName,
					" — TKB ",
					currentTitle
				]
			})
		}),
		Object.keys(timetable).length > 0 && globalConflicts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
			variant: "destructive",
			className: "mb-4 print:hidden border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 !text-red-600 dark:!text-red-500" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertTitle, {
					className: "font-semibold text-red-800 dark:text-red-300",
					children: [
						"Phát hiện ",
						globalConflicts.length,
						" lỗi vi phạm quy tắc (do xếp thủ công):"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
					className: "mt-2 text-sm text-red-800 dark:text-red-300 max-h-48 overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "list-disc pl-5 space-y-1",
						children: globalConflicts.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, i))
					})
				})
			]
		}),
		Object.keys(timetable).length > 0 && globalSummary.totalMissing > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
			variant: "destructive",
			className: "mb-4 print:hidden border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 !text-amber-600 dark:!text-amber-500" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertTitle, {
					className: "font-semibold text-amber-800 dark:text-amber-300",
					children: [
						"Hệ thống không thể xếp đủ tiết (",
						globalSummary.totalPlaced,
						"/",
						globalSummary.totalNeeded,
						"). Còn thiếu ",
						globalSummary.totalMissing,
						" tiết:"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
					className: "mt-2 text-sm text-amber-800 dark:text-amber-300 max-h-48 overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "list-disc pl-5 space-y-1",
						children: globalSummary.missingByClass.map((cls) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								className: "font-semibold",
								children: [
									"Lớp ",
									cls.className,
									":"
								]
							}),
							" ",
							cls.items.map((item) => {
								const parts = [];
								if (item.missingMorning > 0) parts.push(`${item.missingMorning} Sáng`);
								if (item.missingAfternoon > 0) parts.push(`${item.missingAfternoon} Chiều`);
								return `${item.subject} (Thiếu ${parts.join(", ")})`;
							}).join(" • ")
						] }, cls.className))
					})
				})
			]
		}),
		Object.keys(timetable).length > 0 && globalSummary.totalMissing === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
			className: "mb-4 print:hidden border-green-500 bg-green-50 dark:bg-green-950/40 text-green-900 dark:text-green-200",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 !text-green-600 dark:!text-green-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertTitle, {
				className: "font-semibold text-green-800 dark:text-green-300",
				children: [
					"Thành công! Đã xếp đủ ",
					globalSummary.totalPlaced,
					"/",
					globalSummary.totalNeeded,
					" tiết."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
				sensors,
				onDragEnd: handleDragEnd,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full border-collapse text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-muted/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-24 border-b border-r p-2 text-left text-xs font-medium uppercase text-muted-foreground",
								children: "Tiết"
							}), DAY_NAMES.slice(0, settings.days).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-r p-2 text-xs font-medium uppercase text-muted-foreground",
								children: d
							}, d))]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: cells.map((row, ri) => {
							const p = periodsList[ri];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: cn(p.session === "PM" && p.period === 1 && "border-t-4 border-t-primary/30"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("border-b border-r p-2 text-xs font-medium", p.session === "AM" ? "bg-amber-50 dark:bg-amber-950/20" : "bg-sky-50 dark:bg-sky-950/20"),
									children: p.label
								}), row.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimetableCell, {
									cell,
									mode,
									subjectMap,
									teacherMap,
									classMap
								}, `${cell.day}-${cell.session}-${cell.period}`))]
							}, ri);
						}) })]
					})
				})
			})
		}) }),
		classSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-4 print:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-3 text-sm font-semibold",
					children: ["Tiến độ xếp môn cho lớp ", classMap.get(selectedClass)?.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 md:grid-cols-2 lg:grid-cols-3",
					children: classSummary.map((r) => {
						const okMorning = r.placedMorning === r.needMorning;
						const okAfternoon = r.placedAfternoon === r.needAfternoon;
						const ok = okMorning && okAfternoon;
						const overMorning = r.placedMorning > r.needMorning;
						const overAfternoon = r.placedAfternoon > r.needAfternoon;
						const over = overMorning || overAfternoon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex flex-col gap-1 rounded-md border p-2 text-sm", !ok && "border-amber-400 bg-amber-50 dark:bg-amber-950/20"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-medium",
									children: r.subject.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: r.teacher?.name || "—"
								})] }), !ok && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									title: over ? "Thừa tiết (đã xếp vượt quá số tiết được phân công)" : "Thiếu tiết (chưa xếp đủ số tiết được phân công)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-amber-600" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs mt-1 border-t pt-1 border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between w-1/2 pr-2 border-r border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Sáng:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("font-mono", overMorning ? "text-destructive" : !okMorning && "text-amber-600 font-bold"),
										children: [
											r.placedMorning,
											"/",
											r.needMorning
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between w-1/2 pl-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Chiều:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("font-mono", overAfternoon ? "text-destructive" : !okAfternoon && "text-amber-600 font-bold"),
										children: [
											r.placedAfternoon,
											"/",
											r.needAfternoon
										]
									})]
								})]
							})]
						}, r.subject.id);
					})
				})]
			})
		})
	] });
}
function TimetableCell({ cell, mode, subjectMap, teacherMap, classMap }) {
	const { setNodeRef: dropRef, isOver } = useDroppable({ id: cell.droppableId });
	const { attributes, listeners, setNodeRef: dragRef, isDragging } = useDraggable({
		id: (cell.lesson ? `cell|${cell.lesson.classId}|${cell.day}|${cell.session}|${cell.period}` : "") || `empty-${cell.droppableId}`,
		disabled: !cell.lesson || mode !== "class"
	});
	const l = cell.lesson;
	const sub = l ? subjectMap.get(l.subjectId) : null;
	const teacher = l ? teacherMap.get(l.teacherId) : null;
	const cls = l ? classMap.get(l.classId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		ref: dropRef,
		className: cn("border-b border-r p-1 align-top transition-colors", isOver && "bg-primary/10"),
		style: { minWidth: 110 },
		children: l ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: dragRef,
			...attributes,
			...listeners,
			className: cn("rounded-md border bg-card px-2 py-1.5 text-xs shadow-sm", mode === "class" && "cursor-grab active:cursor-grabbing", isDragging && "opacity-40", "hover:border-primary"),
			style: {
				borderLeftWidth: 3,
				borderLeftColor: subjectColor(l.subjectId)
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-semibold leading-tight",
				children: sub?.shortName
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 truncate text-[10px] text-muted-foreground",
				children: mode === "class" ? teacher?.name : cls?.name
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full min-h-[46px]" })
	});
}
function subjectColor(id) {
	let h = 0;
	for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
	return `hsl(${h}, 65%, 55%)`;
}
//#endregion
export { TimetablePage as component };
