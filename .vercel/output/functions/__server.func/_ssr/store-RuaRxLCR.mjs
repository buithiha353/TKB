import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-RuaRxLCR.js
var useAuthStore = create()(persist((set) => ({
	isAuthenticated: false,
	username: null,
	login: (username) => set({
		isAuthenticated: true,
		username
	}),
	logout: () => set({
		isAuthenticated: false,
		username: null
	})
}), { name: "tkb-auth" }));
//#endregion
export { useAuthStore as t };
