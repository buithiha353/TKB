import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as Input, r as Label, t as Button } from "./label-De8mfdsI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Trash2, f as Plus } from "../_libs/lucide-react.mjs";
import { a as SelectTrigger, i as SelectItem, l as useStore, n as Select, o as SelectValue, r as SelectContent, t as AppLayout } from "./AppLayout-DfKgQ1vv.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BzZ8bDzf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schools-C7oXylWz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SchoolsPage() {
	const { schools, classes, addSchool, updateSchool, removeSchool, addClass, updateClass, removeClass } = useStore();
	const [newSchool, setNewSchool] = (0, import_react.useState)("");
	const [newClass, setNewClass] = (0, import_react.useState)({
		name: "",
		grade: 6,
		schoolId: schools[0]?.id || ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Điểm trường & Lớp học"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Quản lý các điểm trường và các lớp trực thuộc."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Điểm trường"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [schools.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: s.name,
						onChange: (e) => updateSchool(s.id, { name: e.target.value })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => {
							if (classes.some((c) => c.schoolId === s.id)) {
								toast.error("Điểm trường vẫn còn lớp, hãy xóa lớp trước");
								return;
							}
							removeSchool(s.id);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})]
				}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-t pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Tên điểm trường mới",
						value: newSchool,
						onChange: (e) => setNewSchool(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							if (!newSchool.trim()) return;
							addSchool({ name: newSchool.trim() });
							setNewSchool("");
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
					})]
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Thêm lớp mới"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tên lớp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "VD: 6A",
						value: newClass.name,
						onChange: (e) => setNewClass({
							...newClass,
							name: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Khối" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: String(newClass.grade),
							onValueChange: (v) => setNewClass({
								...newClass,
								grade: Number(v)
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								6,
								7,
								8,
								9
							].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: String(g),
								children: ["Khối ", g]
							}, g)) })]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Điểm trường" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: newClass.schoolId,
							onValueChange: (v) => setNewClass({
								...newClass,
								schoolId: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: schools.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s.id,
								children: s.name
							}, s.id)) })]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full",
						onClick: () => {
							if (!newClass.name.trim() || !newClass.schoolId) {
								toast.error("Điền đầy đủ thông tin");
								return;
							}
							addClass({
								name: newClass.name.trim(),
								grade: newClass.grade,
								schoolId: newClass.schoolId
							});
							setNewClass({
								...newClass,
								name: ""
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Thêm lớp"]
					})
				]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-base",
				children: [
					"Danh sách lớp (",
					classes.length,
					")"
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
				children: classes.map((c) => {
					const school = schools.find((s) => s.id === c.schoolId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border bg-card p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary",
									children: ["Khối ", c.grade]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: c.name,
									onChange: (e) => updateClass(c.id, { name: e.target.value }),
									className: "h-7 w-20"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 truncate text-xs text-muted-foreground",
								children: school?.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: c.schoolId,
								onValueChange: (v) => updateClass(c.id, { schoolId: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-8 w-24 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: schools.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s.id,
									children: s.name
								}, s.id)) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => removeClass(c.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})]
						})]
					}, c.id);
				})
			}) })]
		})
	] });
}
//#endregion
export { SchoolsPage as component };
