import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as cn, n as Input, r as Label } from "./label-De8mfdsI.mjs";
import { a as SelectTrigger, i as SelectItem, l as useStore, n as Select, o as SelectValue, r as SelectContent, t as AppLayout } from "./AppLayout-DfKgQ1vv.mjs";
import { n as CardContent, t as Card } from "./card-BzZ8bDzf.mjs";
import { t as Badge } from "./badge-CbvQSsVW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assignments-B9zW2jZ4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssignmentsPage() {
	const { assignments, classes, subjects, teachers, updateAssignment } = useStore();
	const [filterClass, setFilterClass] = (0, import_react.useState)(classes[0]?.id || "all");
	const filtered = (0, import_react.useMemo)(() => filterClass === "all" ? assignments : assignments.filter((a) => a.classId === filterClass), [assignments, filterClass]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Cấu hình Số tiết"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"Giáo viên được phân công tự động từ mục ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Giáo viên" }),
					". Tại đây, bạn tuỳ chỉnh chính xác số tiết ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Sáng" }),
					" và ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Chiều" }),
					" cho từng môn."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-sm font-medium",
					children: "Chọn lớp:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filterClass,
					onValueChange: setFilterClass,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-48 bg-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "Tất cả các lớp"
					}), classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
						value: c.id,
						children: ["Lớp ", c.name]
					}, c.id))] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted-foreground",
					children: [filtered.length, " phân công"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-muted/50 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								filterClass === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 font-medium text-left",
									children: "Lớp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 font-medium text-left",
									children: "Môn học"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 font-medium text-left",
									children: "Giáo viên phụ trách"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 font-medium text-center w-[120px]",
									children: "Tiết Sáng"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 font-medium text-center w-[120px]",
									children: "Tiết Chiều"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 font-medium text-center w-[120px]",
									children: "Tổng"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y",
							children: [filtered.map((a) => {
								const cls = classes.find((c) => c.id === a.classId);
								const sub = subjects.find((s) => s.id === a.subjectId);
								const teacher = teachers.find((t) => t.id === a.teacherId);
								const morning = a.morningPeriods || 0;
								const afternoon = a.afternoonPeriods || 0;
								const total = morning + afternoon;
								const subTotal = filtered.filter((x) => x.classId === a.classId && x.subjectId === a.subjectId).reduce((acc, curr) => acc + (curr.morningPeriods || 0) + (curr.afternoonPeriods || 0), 0);
								const expectedTotal = sub?.defaultPeriods || 0;
								const isMismatch = subTotal !== expectedTotal;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/20",
									children: [
										filterClass === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 font-medium",
											children: cls?.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: sub?.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: teacher ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "font-normal bg-blue-50/50 text-blue-700 border-blue-200",
												children: teacher.name
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "Chưa phân công"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												min: 0,
												className: "h-8 text-center",
												value: morning === 0 ? "" : morning,
												onChange: (e) => updateAssignment(a.id, { morningPeriods: Number(e.target.value) })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												min: 0,
												className: "h-8 text-center",
												value: afternoon === 0 ? "" : afternoon,
												onChange: (e) => updateAssignment(a.id, { afternoonPeriods: Number(e.target.value) })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: cn("p-3 text-center font-mono", isMismatch ? "text-red-600 font-bold" : "text-muted-foreground"),
											children: [total, isMismatch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-xs font-sans font-normal opacity-80 mt-1",
												children: [
													"(Tổng môn: ",
													subTotal,
													"/",
													expectedTotal,
													")"
												]
											})]
										})
									]
								}, a.id);
							}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								colSpan: 6,
								className: "p-8 text-center text-muted-foreground",
								children: [
									"Lớp này chưa được phân công giáo viên nào.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Vui lòng sang mục ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Giáo viên" }),
									" để đánh dấu lớp dạy."
								]
							}) })]
						})]
					})
				})
			})
		})
	] });
}
//#endregion
export { AssignmentsPage as component };
