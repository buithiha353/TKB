import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as cn, n as Input, t as Button } from "./label-De8mfdsI.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { T as Check, a as Trash2, f as Plus } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { a as SelectTrigger, i as SelectItem, l as useStore, n as Select, o as SelectValue, r as SelectContent, t as AppLayout } from "./AppLayout-DfKgQ1vv.mjs";
import { t as Badge } from "./badge-CbvQSsVW.mjs";
import { t as DAY_NAMES } from "./types-CyutgW7l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachers-BqWoRHhs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
function TeachersPage() {
	const { teachers, subjects, classes, schools, assignments, addTeacher, updateTeacher, removeTeacher, syncTeacherClasses } = useStore();
	const handleAddRow = () => {
		addTeacher({
			name: "",
			subjectIds: [],
			schoolIds: schools.length > 0 ? [schools[0].id] : [],
			offDay: 5,
			isOffFullDay: false
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-6 flex items-start justify-between gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: "Giáo viên"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Quản lý giáo viên, môn dạy, lớp dạy, điểm trường và ngày nghỉ. Dữ liệu tự động lưu khi chỉnh sửa."
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border bg-card overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b bg-muted/50 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 font-medium w-[200px]",
						children: "Họ và tên"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 font-medium w-[200px]",
						children: "Môn dạy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 font-medium w-[250px]",
						children: "Lớp dạy"
					}),
					schools.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 font-medium w-[180px]",
						children: "Điểm trường"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 font-medium w-[200px]",
						children: "Ngày nghỉ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3 font-medium w-[50px]" })
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [teachers.map((t) => {
				const currentClassIds = Array.from(new Set(assignments.filter((a) => a.teacherId === t.id).map((a) => a.classId)));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b last:border-0 hover:bg-muted/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-2 align-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "h-auto py-1.5 shadow-none bg-transparent border-transparent hover:border-input focus:border-input focus:bg-background",
								value: t.name,
								onChange: (e) => updateTeacher(t.id, { name: e.target.value }),
								placeholder: "Nhập tên..."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-2 align-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words",
									children: t.subjectIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: t.subjectIds.map((sid) => {
											const sub = subjects.find((s) => s.id === sid);
											return sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "secondary",
												className: "px-1.5 py-0 font-normal",
												children: sub.shortName
											}, sid) : null;
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Chọn môn..."
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								className: "w-[300px] p-2",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: t.subjectIds.includes(s.id),
											onCheckedChange: (checked) => {
												const next = checked ? [...t.subjectIds, s.id] : t.subjectIds.filter((x) => x !== s.id);
												updateTeacher(t.id, { subjectIds: next });
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: s.shortName
										})]
									}, s.id))
								})
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-2 align-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words",
									children: currentClassIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: currentClassIds.map((cid) => {
											const cls = classes.find((c) => c.id === cid);
											return cls ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "secondary",
												className: "px-1.5 py-0 font-normal",
												children: cls.name
											}, cid) : null;
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Chọn lớp..."
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								className: "w-[300px] p-2 max-h-[300px] overflow-y-auto",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									children: classes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: currentClassIds.includes(c.id),
											onCheckedChange: (checked) => {
												const next = checked ? [...currentClassIds, c.id] : currentClassIds.filter((x) => x !== c.id);
												syncTeacherClasses(t.id, next);
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: c.name
										})]
									}, c.id))
								})
							})] })
						}),
						schools.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-2 align-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words",
									children: t.schoolIds?.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: t.schoolIds.map((sid) => {
											const school = schools.find((s) => s.id === sid);
											return school ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "secondary",
												className: "px-1.5 py-0 font-normal",
												children: school.name
											}, sid) : null;
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Chọn..."
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
								className: "w-[200px] p-2",
								align: "start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1",
									children: schools.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: t.schoolIds?.includes(s.id),
											onCheckedChange: (checked) => {
												const currentIds = t.schoolIds || [];
												const next = checked ? [...currentIds, s.id] : currentIds.filter((x) => x !== s.id);
												updateTeacher(t.id, { schoolIds: next });
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: s.name
										})]
									}, s.id))
								})
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-2 align-top",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 h-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: String(t.offDay),
									onValueChange: (v) => updateTeacher(t.id, { offDay: Number(v) }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-8 shadow-none flex-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DAY_NAMES.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: String(i + 1),
										children: ["Thứ ", i + 2]
									}, i)) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-1.5 text-xs whitespace-nowrap cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: t.isOffFullDay,
										onCheckedChange: (c) => updateTeacher(t.id, { isOffFullDay: !!c })
									}), "Cả ngày"]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-2 align-top text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-8 w-8 text-muted-foreground hover:text-destructive",
								onClick: () => removeTeacher(t.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						})
					]
				}, t.id);
			}), teachers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: 6,
				className: "p-8 text-center text-muted-foreground",
				children: "Chưa có dữ liệu giáo viên."
			}) })] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-2 border-t",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: handleAddRow,
				className: "w-full justify-start text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Thêm dòng mới"]
			})
		})]
	})] });
}
//#endregion
export { TeachersPage as component };
