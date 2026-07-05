import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./label-De8mfdsI.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Calendar, O as BookOpen, h as GraduationCap, l as School, n as Users, o as Sparkles } from "../_libs/lucide-react.mjs";
import { l as useStore, t as AppLayout } from "./AppLayout-DfKgQ1vv.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BzZ8bDzf.mjs";
import { n as generateSchedule } from "./scheduler-Bl9nhuKq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B5pFeDb5.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { schools, classes, subjects, teachers, assignments, timetable, settings, setTimetable } = useStore();
	const totalLessons = Object.keys(timetable).length;
	const totalNeeded = assignments.reduce((s, a) => s + (a.morningPeriods || 0) + (a.afternoonPeriods || 0), 0);
	const handleGenerate = () => {
		const t0 = performance.now();
		const res = generateSchedule({
			settings,
			classes,
			subjects,
			teachers,
			assignments
		});
		setTimetable(res.timetable);
		const ms = Math.round(performance.now() - t0);
		if (res.unplaced.length === 0) toast.success(`Đã xếp ${res.totalPlaced}/${res.totalNeeded} tiết trong ${ms}ms`);
		else toast.warning(`Xếp được ${res.totalPlaced}/${res.totalNeeded} tiết. Còn ${res.totalNeeded - res.totalPlaced} tiết chưa xếp – hãy chỉnh thủ công.`);
	};
	const stats = [
		{
			label: "Điểm trường",
			value: schools.length,
			icon: School,
			color: "bg-blue-500/10 text-blue-600"
		},
		{
			label: "Lớp học",
			value: classes.length,
			icon: GraduationCap,
			color: "bg-emerald-500/10 text-emerald-600"
		},
		{
			label: "Môn học",
			value: subjects.length,
			icon: BookOpen,
			color: "bg-amber-500/10 text-amber-600"
		},
		{
			label: "Giáo viên",
			value: teachers.length,
			icon: Users,
			color: "bg-violet-500/10 text-violet-600"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Tổng quan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: settings.schoolName
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4",
			children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mb-2 grid h-9 w-9 place-items-center rounded-lg ${s.color}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold",
						children: s.value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: s.label
					})
				]
			}) }, s.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 md:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "md:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), "Tạo thời khóa biểu tự động"]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-4 text-sm text-muted-foreground",
					children: [
						"Thuật toán sẽ xếp ",
						totalNeeded,
						" tiết cho ",
						classes.length,
						" lớp theo các ràng buộc: mỗi GV nghỉ 1 buổi sáng/tuần, không di chuyển giữa 2 điểm trường trong cùng buổi, không xếp 2 tiết liên tiếp cùng môn (trừ Toán/Văn), ưu tiên điểm trường chính."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleGenerate,
						size: "lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-2 h-4 w-4" }), "Sinh TKB tự động"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/timetable",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mr-2 h-4 w-4" }), "Xem thời khóa biểu"]
						})
					})]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Trạng thái" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Đã xếp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [totalLessons, " tiết"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Cần xếp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [totalNeeded, " tiết"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Phân công"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: assignments.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-2 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-primary transition-all",
							style: { width: totalNeeded ? `${Math.min(100, totalLessons / totalNeeded * 100)}%` : "0%" }
						})
					})
				]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Bắt đầu nhanh"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"1. Kiểm tra",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/schools",
							className: "text-primary underline",
							children: "điểm trường & lớp học"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"2. Xem",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/subjects",
							className: "text-primary underline",
							children: "môn học"
						}),
						" ",
						"và số tiết/tuần"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"3. Cập nhật",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/teachers",
							className: "text-primary underline",
							children: "danh sách giáo viên"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"4. Kiểm tra",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/assignments",
							className: "text-primary underline",
							children: "phân công dạy"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"5. Bấm \"Sinh TKB tự động\" và",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/timetable",
							className: "text-primary underline",
							children: "tinh chỉnh"
						})
					] })
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Cấu hình hiện tại"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-1 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Số ngày/tuần:"
						}),
						" ",
						settings.days
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Tiết buổi sáng:"
						}),
						" ",
						settings.morningPeriods
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Tiết buổi chiều:"
						}),
						" ",
						settings.afternoonPeriods
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Tổng slot/tuần:"
						}),
						" ",
						(settings.morningPeriods + settings.afternoonPeriods) * settings.days
					] })
				]
			})] })]
		})
	] });
}
//#endregion
export { Dashboard as component };
