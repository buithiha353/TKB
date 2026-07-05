import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as Input, r as Label, t as Button } from "./label-De8mfdsI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Trash2, f as Plus } from "../_libs/lucide-react.mjs";
import { c as Switch, l as useStore, t as AppLayout } from "./AppLayout-DfKgQ1vv.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BzZ8bDzf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/subjects-8xGBw_1-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SubjectsPage() {
	const { subjects, addSubject, updateSubject, removeSubject } = useStore();
	const [nw, setNw] = (0, import_react.useState)({
		name: "",
		shortName: "",
		defaultPeriods: 2,
		canDouble: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Môn học"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Danh sách môn theo chương trình GDPT 2018 cấp THCS. Có thể chỉnh số tiết/tuần."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2 text-xs font-medium uppercase text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-4",
						children: "Tên môn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-3",
						children: "Viết tắt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-2",
						children: "Tiết/tuần"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-2",
						children: "2 tiết liền"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "col-span-1" })
				]
			}), subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-12 items-center gap-2 border-b px-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "col-span-4 h-8",
						value: s.name,
						onChange: (e) => updateSubject(s.id, { name: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "col-span-3 h-8",
						value: s.shortName,
						onChange: (e) => updateSubject(s.id, { shortName: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "col-span-2 h-8",
						type: "number",
						min: 0,
						max: 10,
						value: s.defaultPeriods === 0 ? "" : s.defaultPeriods,
						onChange: (e) => updateSubject(s.id, { defaultPeriods: Math.max(0, Number(e.target.value)) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: s.canDouble,
							onCheckedChange: (v) => updateSubject(s.id, { canDouble: v })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-1 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => removeSubject(s.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					})
				]
			}, s.id))]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Thêm môn mới"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-3 md:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tên môn" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: nw.name,
							onChange: (e) => setNw({
								...nw,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Viết tắt" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: nw.shortName,
						onChange: (e) => setNw({
							...nw,
							shortName: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tiết/tuần" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: nw.defaultPeriods === 0 ? "" : nw.defaultPeriods,
						onChange: (e) => setNw({
							...nw,
							defaultPeriods: Number(e.target.value)
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full",
							onClick: () => {
								if (!nw.name.trim()) {
									toast.error("Nhập tên môn");
									return;
								}
								addSubject({
									...nw,
									name: nw.name.trim(),
									shortName: nw.shortName.trim() || nw.name.trim()
								});
								setNw({
									name: "",
									shortName: "",
									defaultPeriods: 2,
									canDouble: false
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Thêm"]
						})
					})
				]
			})]
		})
	] });
}
//#endregion
export { SubjectsPage as component };
