import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as Input, r as Label, t as Button } from "./label-De8mfdsI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as Download, o as Sparkles, r as Upload, u as RotateCcw } from "../_libs/lucide-react.mjs";
import { c as Switch, l as useStore, s as SetupWizard, t as AppLayout } from "./AppLayout-DfKgQ1vv.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-BzZ8bDzf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CVzZRPkj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { settings, setSettings, exportData, importData, resetAll } = useStore();
	const fileRef = (0, import_react.useRef)(null);
	const [wizardOpen, setWizardOpen] = (0, import_react.useState)(false);
	const doExport = () => {
		const data = exportData();
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `tkb-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const doImport = async (file) => {
		const text = await file.text();
		if (importData(text)) toast.success("Đã nhập dữ liệu");
		else toast.error("File không hợp lệ");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupWizard, {
			open: wizardOpen,
			onClose: () => setWizardOpen(false)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Cài đặt"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setWizardOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-2 h-4 w-4" }), " Chạy lại thiết lập quy tắc"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Thông tin chung"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tên trường" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: settings.schoolName,
						onChange: (e) => setSettings({ schoolName: e.target.value })
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Số tiết buổi sáng" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 6,
							value: settings.morningPeriods === 0 ? "" : settings.morningPeriods,
							onChange: (e) => setSettings({ morningPeriods: Number(e.target.value) })
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Số tiết buổi chiều" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 0,
							max: 6,
							value: settings.afternoonPeriods === 0 ? "" : settings.afternoonPeriods,
							onChange: (e) => setSettings({ afternoonPeriods: Number(e.target.value) })
						})] })]
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Quy tắc phân bổ tiết học"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ưu tiên xếp kín buổi sáng" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Xếp đủ số tiết mục tiêu buổi sáng trước khi xếp sang chiều"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: settings.fillMorningFirst,
							onCheckedChange: (v) => setSettings({ fillMorningFirst: v })
						})]
					}), settings.fillMorningFirst && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Số tiết mục tiêu buổi sáng"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 5,
							value: settings.targetMorningPeriods === 0 ? "" : settings.targetMorningPeriods,
							onChange: (e) => setSettings({ targetMorningPeriods: Number(e.target.value) })
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Tối đa tiết sáng thứ 2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 5,
							value: settings.maxMondayMorningPeriods === 0 ? "" : settings.maxMondayMorningPeriods,
							onChange: (e) => setSettings({ maxMondayMorningPeriods: Number(e.target.value) })
						})] })]
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: "Sao lưu & Khôi phục"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Dữ liệu lưu trong trình duyệt của bạn. Xuất ra file JSON để sao lưu hoặc chia sẻ."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: doExport,
								variant: "outline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Xuất JSON"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => fileRef.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 h-4 w-4" }), " Nhập JSON"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "application/json",
								className: "hidden",
								onChange: (e) => e.target.files?.[0] && doImport(e.target.files[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "destructive",
								onClick: () => {
									if (confirm("Đặt lại toàn bộ dữ liệu về mẫu ban đầu?")) {
										resetAll();
										toast.success("Đã đặt lại");
									}
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-2 h-4 w-4" }), " Đặt lại mẫu"]
							})
						]
					})]
				})] })
			]
		})
	] });
}
//#endregion
export { SettingsPage as component };
