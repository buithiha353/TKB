import { r as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as cn, n as Input, r as Label, t as Button } from "./label-De8mfdsI.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as useAuthStore } from "./store-RuaRxLCR.mjs";
import { _ as useRouter, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { C as ChevronLeft, E as Calendar, O as BookOpen, S as ChevronRight, T as Check, _ as Database, c as Settings, h as GraduationCap, l as School, m as House, n as Users, o as Sparkles, p as LogOut, s as Shield, t as X, v as Clock, w as ChevronDown, x as ChevronUp } from "../_libs/lucide-react.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppLayout-DfKgQ1vv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var seedSchools = [{
	name: "Điểm A",
	id: "qoagfnop"
}, {
	name: "Điểm B",
	id: "ximosi8q"
}];
var seedClasses = [
	{
		name: "6A",
		grade: 6,
		schoolId: "qoagfnop",
		id: "swrq9p83"
	},
	{
		name: "6B",
		grade: 6,
		schoolId: "qoagfnop",
		id: "sdm696fc"
	},
	{
		name: "6C",
		grade: 6,
		schoolId: "qoagfnop",
		id: "l93bg6m8"
	},
	{
		name: "6D",
		grade: 6,
		schoolId: "qoagfnop",
		id: "4cthjf6n"
	},
	{
		name: "6E",
		grade: 6,
		schoolId: "qoagfnop",
		id: "66vs3y3d"
	},
	{
		name: "6G",
		grade: 6,
		schoolId: "ximosi8q",
		id: "tmy74ou5"
	},
	{
		name: "6H",
		grade: 6,
		schoolId: "ximosi8q",
		id: "upjxnm1i"
	},
	{
		name: "6K",
		grade: 6,
		schoolId: "ximosi8q",
		id: "wzka2w8s"
	},
	{
		name: "7A",
		grade: 7,
		schoolId: "qoagfnop",
		id: "oelx4m0i"
	},
	{
		name: "7B",
		grade: 7,
		schoolId: "qoagfnop",
		id: "36ifofhw"
	},
	{
		name: "7C",
		grade: 7,
		schoolId: "qoagfnop",
		id: "0aq7bqeq"
	},
	{
		name: "7D",
		grade: 7,
		schoolId: "qoagfnop",
		id: "2axdl26g"
	},
	{
		name: "7E",
		grade: 7,
		schoolId: "qoagfnop",
		id: "xw25e5k9"
	},
	{
		name: "7G",
		grade: 7,
		schoolId: "ximosi8q",
		id: "lr547lww"
	},
	{
		name: "7H",
		grade: 7,
		schoolId: "ximosi8q",
		id: "lvaom9sn"
	},
	{
		name: "7K",
		grade: 7,
		schoolId: "ximosi8q",
		id: "8k9yypid"
	},
	{
		name: "8A",
		grade: 8,
		schoolId: "qoagfnop",
		id: "iv27x16k"
	},
	{
		name: "8B",
		grade: 8,
		schoolId: "qoagfnop",
		id: "z833mxr9"
	},
	{
		name: "8C",
		grade: 8,
		schoolId: "qoagfnop",
		id: "93eg08o0"
	},
	{
		name: "8D",
		grade: 8,
		schoolId: "qoagfnop",
		id: "868n6uuf"
	},
	{
		name: "8E",
		grade: 8,
		schoolId: "qoagfnop",
		id: "vddduolq"
	},
	{
		name: "8G",
		grade: 8,
		schoolId: "ximosi8q",
		id: "en8ovo5a"
	},
	{
		name: "8H",
		grade: 8,
		schoolId: "ximosi8q",
		id: "e1fp8lus"
	},
	{
		name: "8K",
		grade: 8,
		schoolId: "ximosi8q",
		id: "6dqsd63v"
	},
	{
		name: "9A",
		grade: 9,
		schoolId: "qoagfnop",
		id: "6w986ezr"
	},
	{
		name: "9B",
		grade: 9,
		schoolId: "qoagfnop",
		id: "a5sc3j42"
	},
	{
		name: "9C",
		grade: 9,
		schoolId: "qoagfnop",
		id: "c86uoscs"
	},
	{
		name: "9D",
		grade: 9,
		schoolId: "qoagfnop",
		id: "rcvxsv5g"
	},
	{
		name: "9E",
		grade: 9,
		schoolId: "qoagfnop",
		id: "nd7d2hak"
	},
	{
		name: "9G",
		grade: 9,
		schoolId: "ximosi8q",
		id: "08j7wb5a"
	},
	{
		name: "9H",
		grade: 9,
		schoolId: "ximosi8q",
		id: "x7bxqk8r"
	},
	{
		name: "9K",
		grade: 9,
		schoolId: "ximosi8q",
		id: "q5vcf6ko"
	}
];
var seedSubjects = [
	{
		id: "sub_van",
		name: "Ngữ văn",
		shortName: "Văn",
		defaultPeriods: 4,
		canDouble: true
	},
	{
		id: "sub_toan",
		name: "Toán",
		shortName: "Toán",
		defaultPeriods: 4,
		canDouble: true
	},
	{
		id: "sub_anh",
		name: "Tiếng Anh",
		shortName: "Anh",
		defaultPeriods: 3,
		canDouble: false
	},
	{
		id: "sub_khtn",
		name: "Khoa học tự nhiên",
		shortName: "KHTN",
		defaultPeriods: 4,
		canDouble: false
	},
	{
		id: "sub_lsdl",
		name: "Lịch sử và Địa lí",
		shortName: "LS&ĐL",
		defaultPeriods: 3,
		canDouble: false
	},
	{
		id: "sub_gdcd",
		name: "Giáo dục công dân",
		shortName: "GDCD",
		defaultPeriods: 1,
		canDouble: false
	},
	{
		id: "sub_cn",
		name: "Công nghệ",
		shortName: "CN",
		defaultPeriods: 1,
		canDouble: false
	},
	{
		id: "sub_th",
		name: "Tin học",
		shortName: "Tin",
		defaultPeriods: 1,
		canDouble: false
	},
	{
		id: "sub_gdtc",
		name: "Giáo dục thể chất",
		shortName: "GDTC",
		defaultPeriods: 2,
		canDouble: false
	},
	{
		id: "sub_nt",
		name: "Nghệ thuật",
		shortName: "NT",
		defaultPeriods: 2,
		canDouble: false
	},
	{
		id: "sub_htn",
		name: "HĐTN - HN",
		shortName: "HĐTN",
		defaultPeriods: 3,
		canDouble: false
	},
	{
		id: "sub_ddp",
		name: "Nội dung địa phương",
		shortName: "GDĐP",
		defaultPeriods: 1,
		canDouble: false
	}
];
var seedTeachers = [
	{
		name: "GV1",
		subjectIds: ["sub_toan"],
		schoolIds: ["qoagfnop"],
		offDay: 1,
		isOffFullDay: false,
		id: "e4m9e2rg"
	},
	{
		name: "GV2",
		subjectIds: ["sub_toan"],
		schoolIds: ["qoagfnop"],
		offDay: 1,
		isOffFullDay: false,
		id: "mwggmdrk"
	},
	{
		name: "GV3",
		subjectIds: ["sub_toan", "sub_khtn"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 2,
		isOffFullDay: false,
		id: "ypmz3lx5"
	},
	{
		name: "GV4",
		subjectIds: ["sub_toan", "sub_cn"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 2,
		isOffFullDay: false,
		id: "sh1bgt5o"
	},
	{
		name: "GV5",
		subjectIds: ["sub_toan", "sub_th"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 5,
		isOffFullDay: false,
		id: "mpeu64t5"
	},
	{
		name: "GV6",
		subjectIds: ["sub_van"],
		schoolIds: ["qoagfnop"],
		offDay: 3,
		isOffFullDay: false,
		id: "uzaxob71"
	},
	{
		name: "GV7",
		subjectIds: ["sub_van"],
		schoolIds: ["qoagfnop"],
		offDay: 4,
		isOffFullDay: false,
		id: "s7rmgqgm"
	},
	{
		name: "GV8",
		subjectIds: ["sub_anh"],
		schoolIds: ["qoagfnop"],
		offDay: 5,
		isOffFullDay: false,
		id: "rpc55kla"
	},
	{
		name: "GV9",
		subjectIds: ["sub_anh"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 4,
		isOffFullDay: false,
		id: "ybylflgx"
	},
	{
		name: "GV10",
		subjectIds: ["sub_anh", "sub_htn"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 2,
		isOffFullDay: false,
		id: "p79vgsf2"
	},
	{
		name: "GV11",
		subjectIds: ["sub_nt"],
		schoolIds: ["qoagfnop"],
		offDay: 2,
		isOffFullDay: false,
		id: "lmp0gsg9"
	},
	{
		name: "GV12",
		subjectIds: ["sub_nt"],
		schoolIds: ["ximosi8q", "ximosi8q"],
		offDay: 4,
		isOffFullDay: false,
		id: "551r02n6"
	},
	{
		name: "GV13",
		subjectIds: ["sub_gdcd", "sub_ddp"],
		schoolIds: ["ximosi8q", "ximosi8q"],
		offDay: 4,
		isOffFullDay: false,
		id: "u37a163d"
	},
	{
		name: "GV13",
		subjectIds: ["sub_gdtc"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 5,
		isOffFullDay: false,
		id: "puc9wjt4"
	},
	{
		name: "GV15",
		subjectIds: ["sub_th"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 3,
		isOffFullDay: false,
		id: "y85qo3qy"
	},
	{
		name: "Gv16",
		subjectIds: ["sub_khtn"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 1,
		isOffFullDay: false,
		id: "gs4ipyh7"
	},
	{
		name: "GV17",
		subjectIds: ["sub_lsdl", "sub_ddp"],
		schoolIds: ["qoagfnop", "ximosi8q"],
		offDay: 4,
		isOffFullDay: false,
		id: "ejx50a7e"
	}
];
function seedAssignments() {
	return [
		{
			classId: "swrq9p83",
			subjectId: "sub_van",
			teacherId: "uzaxob71",
			morningPeriods: 4,
			afternoonPeriods: 0,
			id: "owj7el1t"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_toan",
			teacherId: "e4m9e2rg",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "ctbrn6jj"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_anh",
			teacherId: "rpc55kla",
			morningPeriods: 3,
			afternoonPeriods: 0,
			id: "ogo9wqw2"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_khtn",
			teacherId: "ypmz3lx5",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "fv96z3ff"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_lsdl",
			teacherId: "ejx50a7e",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "rjxwchlt"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_khtn",
			teacherId: "gs4ipyh7",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "3kutey55"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_gdcd",
			teacherId: "u37a163d",
			morningPeriods: 1,
			afternoonPeriods: 0,
			id: "3ujmuh20"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_cn",
			teacherId: "sh1bgt5o",
			morningPeriods: 1,
			afternoonPeriods: 0,
			id: "2363b0cf"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_th",
			teacherId: "mpeu64t5",
			morningPeriods: 1,
			afternoonPeriods: 0,
			id: "nec2szut"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_gdtc",
			teacherId: "puc9wjt4",
			morningPeriods: 1,
			afternoonPeriods: 0,
			id: "jxf9wa5g"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_nt",
			teacherId: "lmp0gsg9",
			morningPeriods: 1,
			afternoonPeriods: 0,
			id: "etu20u69"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_nt",
			teacherId: "551r02n6",
			morningPeriods: 1,
			afternoonPeriods: 0,
			id: "0xtyhj4b"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_htn",
			teacherId: "p79vgsf2",
			morningPeriods: 1,
			afternoonPeriods: 0,
			id: "dlpco0t6"
		},
		{
			classId: "swrq9p83",
			subjectId: "sub_ddp",
			teacherId: "ejx50a7e",
			morningPeriods: 1,
			afternoonPeriods: 0,
			id: "pg4lnqmy"
		},
		{
			classId: "sdm696fc",
			subjectId: "sub_van",
			teacherId: "s7rmgqgm",
			morningPeriods: 4,
			afternoonPeriods: 0,
			id: "2220s252"
		},
		{
			classId: "sdm696fc",
			subjectId: "sub_toan",
			teacherId: "mwggmdrk",
			morningPeriods: 4,
			afternoonPeriods: 0,
			id: "zbbpt44l"
		},
		{
			classId: "sdm696fc",
			subjectId: "sub_anh",
			teacherId: "p79vgsf2",
			morningPeriods: 3,
			afternoonPeriods: 0,
			id: "exacprs8"
		},
		{
			classId: "sdm696fc",
			subjectId: "sub_khtn",
			teacherId: "gs4ipyh7",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "7815ckck"
		},
		{
			classId: "sdm696fc",
			subjectId: "sub_khtn",
			teacherId: "ypmz3lx5",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "mzq82lj8"
		},
		{
			classId: "sdm696fc",
			subjectId: "sub_lsdl",
			teacherId: "ejx50a7e",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "cmxlyk18"
		},
		{
			classId: "sdm696fc",
			subjectId: "sub_gdcd",
			teacherId: "u37a163d",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "voxu9ybw"
		},
		{
			classId: "l93bg6m8",
			subjectId: "sub_khtn",
			teacherId: "ypmz3lx5",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "jog3tje2"
		},
		{
			classId: "4cthjf6n",
			subjectId: "sub_khtn",
			teacherId: "ypmz3lx5",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "veurejab"
		},
		{
			classId: "66vs3y3d",
			subjectId: "sub_khtn",
			teacherId: "ypmz3lx5",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "6krcuud3"
		},
		{
			classId: "tmy74ou5",
			subjectId: "sub_khtn",
			teacherId: "ypmz3lx5",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "js094xet"
		},
		{
			classId: "upjxnm1i",
			subjectId: "sub_khtn",
			teacherId: "ypmz3lx5",
			morningPeriods: 2,
			afternoonPeriods: 0,
			id: "bq0anibu"
		}
	];
}
var rid = () => Math.random().toString(36).slice(2, 10);
var defaultSettings = {
	schoolName: "Trường THCS Demo",
	morningPeriods: 5,
	afternoonPeriods: 3,
	days: 5,
	sites: 2,
	ruleTeacherMorningOff: true,
	ruleSingleSitePerSession: true,
	ruleAllowDouble: true,
	ruleMaxSameSubjectPerDay: 2,
	targetMorningPeriods: 4,
	fillMorningFirst: true,
	maxMondayMorningPeriods: 4
};
function initial() {
	return {
		settings: defaultSettings,
		schools: seedSchools,
		classes: seedClasses,
		subjects: seedSubjects,
		teachers: seedTeachers,
		assignments: seedAssignments(),
		timetable: {},
		onboarded: false
	};
}
var useStore = create()(persist((set, get) => ({
	...initial(),
	setSettings: (s) => set((st) => ({ settings: {
		...st.settings,
		...s
	} })),
	setOnboarded: (v) => set({ onboarded: v }),
	startFresh: () => set({
		schools: [],
		classes: [],
		teachers: [],
		assignments: [],
		timetable: {}
	}),
	addSchool: (s) => set((st) => ({ schools: [...st.schools, {
		...s,
		id: rid()
	}] })),
	updateSchool: (id, patch) => set((st) => ({ schools: st.schools.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeSchool: (id) => set((st) => ({ schools: st.schools.filter((x) => x.id !== id) })),
	addClass: (c) => set((st) => ({ classes: [...st.classes, {
		...c,
		id: rid()
	}] })),
	updateClass: (id, patch) => set((st) => ({ classes: st.classes.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeClass: (id) => set((st) => ({
		classes: st.classes.filter((x) => x.id !== id),
		assignments: st.assignments.filter((a) => a.classId !== id)
	})),
	addSubject: (s) => set((st) => ({ subjects: [...st.subjects, {
		...s,
		id: rid()
	}] })),
	updateSubject: (id, patch) => set((st) => ({ subjects: st.subjects.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeSubject: (id) => set((st) => ({
		subjects: st.subjects.filter((x) => x.id !== id),
		assignments: st.assignments.filter((a) => a.subjectId !== id)
	})),
	addTeacher: (t) => set((st) => ({ teachers: [...st.teachers, {
		...t,
		id: rid()
	}] })),
	updateTeacher: (id, patch) => set((st) => ({ teachers: st.teachers.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeTeacher: (id) => set((st) => ({
		teachers: st.teachers.filter((x) => x.id !== id),
		assignments: st.assignments.filter((a) => a.teacherId !== id)
	})),
	syncTeacherClasses: (teacherId, classIds) => set((st) => {
		const teacher = st.teachers.find((t) => t.id === teacherId);
		if (!teacher) return st;
		const currentClassIds = Array.from(new Set(st.assignments.filter((a) => a.teacherId === teacherId).map((a) => a.classId)));
		const toRemove = currentClassIds.filter((cid) => !classIds.includes(cid));
		const toAdd = classIds.filter((cid) => !currentClassIds.includes(cid));
		let nextAss = st.assignments.filter((a) => !(a.teacherId === teacherId && toRemove.includes(a.classId)));
		for (const cid of toAdd) for (const sid of teacher.subjectIds) {
			const sub = st.subjects.find((s) => s.id === sid);
			if (sub) nextAss.push({
				id: rid(),
				teacherId,
				classId: cid,
				subjectId: sid,
				morningPeriods: sub.defaultPeriods,
				afternoonPeriods: 0
			});
		}
		return { assignments: nextAss };
	}),
	addAssignment: (a) => set((st) => ({ assignments: [...st.assignments, {
		...a,
		id: rid()
	}] })),
	updateAssignment: (id, patch) => set((st) => ({ assignments: st.assignments.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	removeAssignment: (id) => set((st) => ({ assignments: st.assignments.filter((x) => x.id !== id) })),
	setTimetable: (t) => set({ timetable: t }),
	clearTimetable: () => set({ timetable: {} }),
	exportData: () => JSON.stringify(get(), null, 2),
	importData: (json) => {
		try {
			const data = JSON.parse(json);
			set({
				settings: data.settings || defaultSettings,
				schools: data.schools || [],
				classes: data.classes || [],
				subjects: data.subjects || [],
				teachers: data.teachers || [],
				assignments: (data.assignments || []).map((a) => {
					if (a.periods !== void 0) {
						a.morningPeriods = a.periods;
						a.afternoonPeriods = 0;
						delete a.periods;
					}
					return a;
				}),
				timetable: data.timetable || {}
			});
			return true;
		} catch {
			return false;
		}
	},
	resetAll: () => set(initial())
}), {
	name: "tkb-thcs-v1",
	version: 3,
	migrate: (persistedState, version) => {
		if (version < 3 && persistedState.assignments) persistedState.assignments = persistedState.assignments.map((a) => {
			if (a.periods !== void 0) {
				a.morningPeriods = a.periods;
				a.afternoonPeriods = 0;
				delete a.periods;
			}
			return a;
		});
		return persistedState;
	}
}));
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var STEPS = [
	{
		key: "name",
		label: "Tên trường",
		icon: School
	},
	{
		key: "sites",
		label: "Điểm trường",
		icon: School
	},
	{
		key: "week",
		label: "Tuần học",
		icon: Calendar
	},
	{
		key: "periods",
		label: "Số tiết/buổi",
		icon: Clock
	},
	{
		key: "rules",
		label: "Ràng buộc",
		icon: Shield
	},
	{
		key: "data",
		label: "Dữ liệu",
		icon: Database
	}
];
function SetupWizard({ open, onClose }) {
	const { settings, setSettings, setOnboarded, schools, startFresh, subjects, updateSubject, addSubject } = useStore();
	const [step, setStep] = (0, import_react.useState)(0);
	const [draft, setDraft] = (0, import_react.useState)({
		schoolName: settings.schoolName,
		sites: settings.sites ?? 2,
		days: settings.days || 5,
		morningPeriods: settings.morningPeriods || 5,
		afternoonPeriods: settings.afternoonPeriods ?? 3,
		ruleTeacherMorningOff: settings.ruleTeacherMorningOff ?? true,
		ruleSingleSitePerSession: settings.ruleSingleSitePerSession ?? true,
		ruleAllowDouble: settings.ruleAllowDouble ?? true,
		ruleMaxSameSubjectPerDay: settings.ruleMaxSameSubjectPerDay ?? 2,
		keepSample: true
	});
	(0, import_react.useEffect)(() => {
		if (open) setStep(0);
	}, [open]);
	const update = (k, v) => setDraft((d) => ({
		...d,
		[k]: v
	}));
	const finish = () => {
		setSettings({
			schoolName: draft.schoolName.trim() || "Trường THCS",
			sites: draft.sites,
			days: draft.days,
			morningPeriods: draft.morningPeriods,
			afternoonPeriods: draft.afternoonPeriods,
			ruleTeacherMorningOff: draft.ruleTeacherMorningOff,
			ruleSingleSitePerSession: draft.ruleSingleSitePerSession,
			ruleAllowDouble: draft.ruleAllowDouble,
			ruleMaxSameSubjectPerDay: draft.ruleMaxSameSubjectPerDay
		});
		subjects.forEach((s) => {
			const isVanToan = ["Toán", "Ngữ văn"].includes(s.name);
			updateSubject(s.id, { canDouble: draft.ruleAllowDouble ? isVanToan : false });
		});
		if (!draft.keepSample) {
			startFresh();
			if (subjects.length === 0) seedSubjects.forEach((s) => addSubject(s));
		} else if (draft.sites === 1 && schools.length > 1) {
			const mainSchoolId = schools[0].id;
			useStore.setState((st) => ({
				schools: [st.schools[0]],
				classes: st.classes.map((c) => ({
					...c,
					schoolId: mainSchoolId
				})),
				teachers: st.teachers.map((t) => ({
					...t,
					schoolIds: [mainSchoolId]
				}))
			}));
		}
		setOnboarded(true);
		toast.success("Đã thiết lập xong quy tắc TKB");
		onClose();
	};
	const canNext = () => {
		if (step === 0) return draft.schoolName.trim().length > 0;
		return true;
	};
	const StepIcon = STEPS[step].icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Thiết lập quy tắc thời khóa biểu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"Bước ",
						step + 1,
						"/",
						STEPS.length,
						" · ",
						STEPS[step].label
					] })] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5",
					children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1.5 flex-1 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-muted") }, s.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-[240px] py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIcon, { className: "h-4 w-4" }), STEPS[step].label]
						}),
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sn",
									children: "Tên nhà trường"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sn",
									autoFocus: true,
									value: draft.schoolName,
									onChange: (e) => update("schoolName", e.target.value),
									placeholder: "VD: Trường THCS Nguyễn Trãi"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Tên này sẽ hiển thị ở đầu bản in TKB."
								})
							]
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nhà trường có bao nhiêu điểm trường?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [1, 2].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => update("sites", n),
									className: cn("rounded-lg border-2 p-4 text-left transition-colors", draft.sites === n ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/40"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-lg font-semibold",
										children: [n, " điểm trường"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: n === 1 ? "Chỉ 1 cơ sở duy nhất" : "Có 2 cơ sở, GV có thể di chuyển"
									})]
								}, n))
							})]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Số ngày học trong tuần" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [5, 6].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => update("days", n),
									className: cn("rounded-lg border-2 p-4 text-left transition-colors", draft.days === n ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/40"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-lg font-semibold",
										children: [n, " ngày"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: n === 5 ? "Thứ 2 → Thứ 6" : "Thứ 2 → Thứ 7"
									})]
								}, n))
							})]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Buổi sáng — số tiết" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: String(draft.morningPeriods),
										onValueChange: (v) => update("morningPeriods", Number(v)),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											3,
											4,
											5
										].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											value: String(n),
											children: [n, " tiết"]
										}, n)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Buổi chiều — số tiết" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: String(draft.afternoonPeriods),
										onValueChange: (v) => update("afternoonPeriods", Number(v)),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											0,
											2,
											3,
											4
										].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: String(n),
											children: n === 0 ? "Không học chiều" : `${n} tiết`
										}, n)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "col-span-2 text-xs text-muted-foreground",
									children: "Có thể điều chỉnh sau ở trang Cài đặt."
								})
							]
						}),
						step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleRow, {
									title: "Mỗi GV được nghỉ 1 buổi sáng/tuần",
									desc: "Bộ xếp lịch sẽ tránh các buổi sáng đã đánh dấu nghỉ.",
									checked: draft.ruleTeacherMorningOff,
									onCheck: (v) => update("ruleTeacherMorningOff", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleRow, {
									title: "GV chỉ dạy tại 1 điểm trường trong cùng 1 buổi",
									desc: "Tránh phải di chuyển giữa 2 điểm trường giữa buổi.",
									checked: draft.ruleSingleSitePerSession,
									onCheck: (v) => update("ruleSingleSitePerSession", v),
									disabled: draft.sites === 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuleRow, {
									title: "Cho phép xếp 2 tiết liên tiếp cùng môn (Văn/Toán)",
									desc: "Các môn khác vẫn không được xếp liên tiếp.",
									checked: draft.ruleAllowDouble,
									onCheck: (v) => update("ruleAllowDouble", v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tối đa tiết cùng môn / lớp / ngày" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: String(draft.ruleMaxSameSubjectPerDay),
										onValueChange: (v) => update("ruleMaxSameSubjectPerDay", Number(v)),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "w-40",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "1",
											children: "1 tiết"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "2",
											children: "2 tiết"
										})] })]
									})]
								})
							]
						}),
						step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bắt đầu với dữ liệu nào?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3",
								children: [{
									v: true,
									title: "Dùng dữ liệu mẫu (khối 6-9)",
									desc: "Có sẵn lớp, GV, môn chuẩn THCS để thử ngay."
								}, {
									v: false,
									title: "Bắt đầu với dữ liệu trống",
									desc: "Chỉ giữ danh mục môn chuẩn. Bạn tự nhập lớp & GV."
								}].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => update("keepSample", opt.v),
									className: cn("rounded-lg border-2 p-4 text-left transition-colors", draft.keepSample === opt.v ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/40"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: opt.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: opt.desc
									})]
								}, String(opt.v)))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex-row justify-between sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => setStep((s) => Math.max(0, s - 1)),
						disabled: step === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "mr-1 h-4 w-4" }), " Quay lại"]
					}), step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => setStep((s) => s + 1),
						disabled: !canNext(),
						children: ["Tiếp tục ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-1 h-4 w-4" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: finish,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 h-4 w-4" }), " Hoàn tất"]
					})]
				})
			]
		})
	});
}
function RuleRow({ title, desc, checked, onCheck, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-start justify-between gap-4 rounded-lg border p-3", disabled && "opacity-50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: desc
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onCheck,
			disabled
		})]
	});
}
var nav = [
	{
		to: "/",
		label: "Tổng quan",
		icon: House
	},
	{
		to: "/schools",
		label: "Điểm trường & Lớp",
		icon: School
	},
	{
		to: "/subjects",
		label: "Môn học",
		icon: BookOpen
	},
	{
		to: "/teachers",
		label: "Giáo viên",
		icon: Users
	},
	{
		to: "/assignments",
		label: "Phân công",
		icon: GraduationCap
	},
	{
		to: "/timetable",
		label: "Thời khóa biểu",
		icon: Calendar
	},
	{
		to: "/settings",
		label: "Cài đặt",
		icon: Settings
	}
];
function AppLayout({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const onboarded = useStore((s) => s.onboarded);
	const logout = useAuthStore((s) => s.logout);
	const router = useRouter();
	const [wizardOpen, setWizardOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useStore.persist.onFinishHydration(() => setHydrated(true));
		setHydrated(useStore.persist.hasHydrated());
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated && !onboarded) setWizardOpen(true);
	}, [hydrated, onboarded]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-muted/30 print:bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupWizard, {
			open: wizardOpen,
			onClose: () => setWizardOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-screen w-60 shrink-0 border-r bg-card md:flex md:flex-col print:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b px-5 py-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: "TKB THCS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Xếp thời khóa biểu"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 space-y-1 p-3",
						children: nav.map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								logout();
								router.navigate({ to: "/login" });
							},
							className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Đăng xuất"]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-30 flex items-center justify-between border-b bg-card/95 px-4 py-3 backdrop-blur md:hidden print:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "TKB THCS"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								logout();
								router.navigate({ to: "/login" });
							},
							className: "p-1 text-red-500 active:bg-red-50 rounded-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t bg-card/95 backdrop-blur md:hidden print:hidden",
						children: nav.slice(0, 6).map((item) => {
							const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex flex-col items-center justify-center gap-0.5 py-2 text-[10px]", active ? "text-primary" : "text-muted-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.label.split(" ")[0]
								})]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "mx-auto max-w-7xl p-4 pb-24 md:p-8 md:pb-8 print:p-0",
						children
					})
				]
			})]
		})]
	});
}
//#endregion
export { SelectTrigger as a, Switch as c, SelectItem as i, useStore as l, Select as n, SelectValue as o, SelectContent as r, SetupWizard as s, AppLayout as t };
