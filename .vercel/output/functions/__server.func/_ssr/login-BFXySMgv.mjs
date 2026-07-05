import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as Input, r as Label, t as Button } from "./label-De8mfdsI.mjs";
import { t as useAuthStore } from "./store-RuaRxLCR.mjs";
import { _ as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as CalendarDays, b as CircleAlert } from "../_libs/lucide-react.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-BzZ8bDzf.mjs";
import { n as AlertDescription, t as Alert } from "./alert-Y_myOMcV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BFXySMgv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1EkmLRv1WFJYbPMGkD2kJBv6FXS_A3D3XkApRn8d5ceY/export?format=csv";
/**
* Lấy dữ liệu tài khoản từ Google Sheets (định dạng CSV)
* Trả về true nếu tài khoản và mật khẩu khớp với 1 dòng trong file.
*/
async function authenticateWithGoogleSheet(usernameInput, passwordInput) {
	try {
		const response = await fetch(SHEET_CSV_URL);
		if (!response.ok) throw new Error(`Failed to fetch auth data: ${response.statusText}`);
		const lines = (await response.text()).split(/\r?\n/);
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (!line) continue;
			const parts = line.split(",");
			if (parts.length >= 2) {
				const rowUser = parts[0].replace(/^"|"$/g, "").trim();
				const rowPass = parts[1].replace(/^"|"$/g, "").trim();
				if (rowUser === usernameInput && rowPass === passwordInput) return true;
			}
		}
		return false;
	} catch (error) {
		console.error("Auth fetch error:", error);
		throw new Error("Không thể kết nối đến máy chủ xác thực.");
	}
}
function LoginPage() {
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const login = useAuthStore((s) => s.login);
	const router = useRouter();
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!username || !password) {
			setError("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
			return;
		}
		setLoading(true);
		setError("");
		try {
			if (await authenticateWithGoogleSheet(username, password)) {
				login(username);
				router.navigate({ to: "/" });
			} else setError("Tài khoản hoặc mật khẩu không chính xác");
		} catch (err) {
			setError(err.message || "Đã xảy ra lỗi khi đăng nhập");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-muted/30 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md shadow-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "space-y-2 text-center pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-full bg-primary/10 p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-8 w-8 text-primary" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-2xl font-bold tracking-tight",
						children: "Hệ thống Xếp TKB"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Đăng nhập để quản lý thời khóa biểu THCS" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleLogin,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-4",
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
							variant: "destructive",
							className: "py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, {
								className: "ml-2 text-sm",
								children: error
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "username",
								children: "Tài khoản"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "username",
								type: "text",
								value: username,
								onChange: (e) => setUsername(e.target.value),
								placeholder: "Nhập tên đăng nhập",
								autoComplete: "username",
								disabled: loading
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Mật khẩu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Nhập mật khẩu",
								autoComplete: "current-password",
								disabled: loading
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full font-medium",
					disabled: loading,
					children: loading ? "Đang xác thực..." : "Đăng nhập"
				}) })]
			})]
		})
	});
}
//#endregion
export { LoginPage as component };
