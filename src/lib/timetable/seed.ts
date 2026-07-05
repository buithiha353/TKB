import type { Assignment, School, SchoolClass, Subject, Teacher } from './types';

export const seedSchools: School[] = [
  {
    "name": "Điểm A",
    "id": "qoagfnop"
  },
  {
    "name": "Điểm B",
    "id": "ximosi8q"
  }
];

export const seedClasses: SchoolClass[] = [
  {
    "name": "6A",
    "grade": 6,
    "schoolId": "qoagfnop",
    "id": "swrq9p83"
  },
  {
    "name": "6B",
    "grade": 6,
    "schoolId": "qoagfnop",
    "id": "sdm696fc"
  },
  {
    "name": "6C",
    "grade": 6,
    "schoolId": "qoagfnop",
    "id": "l93bg6m8"
  },
  {
    "name": "6D",
    "grade": 6,
    "schoolId": "qoagfnop",
    "id": "4cthjf6n"
  },
  {
    "name": "6E",
    "grade": 6,
    "schoolId": "qoagfnop",
    "id": "66vs3y3d"
  },
  {
    "name": "6G",
    "grade": 6,
    "schoolId": "ximosi8q",
    "id": "tmy74ou5"
  },
  {
    "name": "6H",
    "grade": 6,
    "schoolId": "ximosi8q",
    "id": "upjxnm1i"
  },
  {
    "name": "6K",
    "grade": 6,
    "schoolId": "ximosi8q",
    "id": "wzka2w8s"
  },
  {
    "name": "7A",
    "grade": 7,
    "schoolId": "qoagfnop",
    "id": "oelx4m0i"
  },
  {
    "name": "7B",
    "grade": 7,
    "schoolId": "qoagfnop",
    "id": "36ifofhw"
  },
  {
    "name": "7C",
    "grade": 7,
    "schoolId": "qoagfnop",
    "id": "0aq7bqeq"
  },
  {
    "name": "7D",
    "grade": 7,
    "schoolId": "qoagfnop",
    "id": "2axdl26g"
  },
  {
    "name": "7E",
    "grade": 7,
    "schoolId": "qoagfnop",
    "id": "xw25e5k9"
  },
  {
    "name": "7G",
    "grade": 7,
    "schoolId": "ximosi8q",
    "id": "lr547lww"
  },
  {
    "name": "7H",
    "grade": 7,
    "schoolId": "ximosi8q",
    "id": "lvaom9sn"
  },
  {
    "name": "7K",
    "grade": 7,
    "schoolId": "ximosi8q",
    "id": "8k9yypid"
  },
  {
    "name": "8A",
    "grade": 8,
    "schoolId": "qoagfnop",
    "id": "iv27x16k"
  },
  {
    "name": "8B",
    "grade": 8,
    "schoolId": "qoagfnop",
    "id": "z833mxr9"
  },
  {
    "name": "8C",
    "grade": 8,
    "schoolId": "qoagfnop",
    "id": "93eg08o0"
  },
  {
    "name": "8D",
    "grade": 8,
    "schoolId": "qoagfnop",
    "id": "868n6uuf"
  },
  {
    "name": "8E",
    "grade": 8,
    "schoolId": "qoagfnop",
    "id": "vddduolq"
  },
  {
    "name": "8G",
    "grade": 8,
    "schoolId": "ximosi8q",
    "id": "en8ovo5a"
  },
  {
    "name": "8H",
    "grade": 8,
    "schoolId": "ximosi8q",
    "id": "e1fp8lus"
  },
  {
    "name": "8K",
    "grade": 8,
    "schoolId": "ximosi8q",
    "id": "6dqsd63v"
  },
  {
    "name": "9A",
    "grade": 9,
    "schoolId": "qoagfnop",
    "id": "6w986ezr"
  },
  {
    "name": "9B",
    "grade": 9,
    "schoolId": "qoagfnop",
    "id": "a5sc3j42"
  },
  {
    "name": "9C",
    "grade": 9,
    "schoolId": "qoagfnop",
    "id": "c86uoscs"
  },
  {
    "name": "9D",
    "grade": 9,
    "schoolId": "qoagfnop",
    "id": "rcvxsv5g"
  },
  {
    "name": "9E",
    "grade": 9,
    "schoolId": "qoagfnop",
    "id": "nd7d2hak"
  },
  {
    "name": "9G",
    "grade": 9,
    "schoolId": "ximosi8q",
    "id": "08j7wb5a"
  },
  {
    "name": "9H",
    "grade": 9,
    "schoolId": "ximosi8q",
    "id": "x7bxqk8r"
  },
  {
    "name": "9K",
    "grade": 9,
    "schoolId": "ximosi8q",
    "id": "q5vcf6ko"
  }
];

export const seedSubjects: Subject[] = [
  {
    "id": "sub_van",
    "name": "Ngữ văn",
    "shortName": "Văn",
    "defaultPeriods": 4,
    "canDouble": true
  },
  {
    "id": "sub_toan",
    "name": "Toán",
    "shortName": "Toán",
    "defaultPeriods": 4,
    "canDouble": true
  },
  {
    "id": "sub_anh",
    "name": "Tiếng Anh",
    "shortName": "Anh",
    "defaultPeriods": 3,
    "canDouble": false
  },
  {
    "id": "sub_khtn",
    "name": "Khoa học tự nhiên",
    "shortName": "KHTN",
    "defaultPeriods": 4,
    "canDouble": false
  },
  {
    "id": "sub_lsdl",
    "name": "Lịch sử và Địa lí",
    "shortName": "LS&ĐL",
    "defaultPeriods": 3,
    "canDouble": false
  },
  {
    "id": "sub_gdcd",
    "name": "Giáo dục công dân",
    "shortName": "GDCD",
    "defaultPeriods": 1,
    "canDouble": false
  },
  {
    "id": "sub_cn",
    "name": "Công nghệ",
    "shortName": "CN",
    "defaultPeriods": 1,
    "canDouble": false
  },
  {
    "id": "sub_th",
    "name": "Tin học",
    "shortName": "Tin",
    "defaultPeriods": 1,
    "canDouble": false
  },
  {
    "id": "sub_gdtc",
    "name": "Giáo dục thể chất",
    "shortName": "GDTC",
    "defaultPeriods": 2,
    "canDouble": false
  },
  {
    "id": "sub_nt",
    "name": "Nghệ thuật",
    "shortName": "NT",
    "defaultPeriods": 2,
    "canDouble": false
  },
  {
    "id": "sub_htn",
    "name": "HĐTN - HN",
    "shortName": "HĐTN",
    "defaultPeriods": 3,
    "canDouble": false
  },
  {
    "id": "sub_ddp",
    "name": "Nội dung địa phương",
    "shortName": "GDĐP",
    "defaultPeriods": 1,
    "canDouble": false
  }
];

export const seedTeachers: Teacher[] = [
  {
    "name": "GV1",
    "subjectIds": [
      "sub_toan"
    ],
    "schoolIds": ["qoagfnop"],
    "offDay": 1,
    "isOffFullDay": false,
    "id": "e4m9e2rg"
  },
  {
    "name": "GV2",
    "subjectIds": [
      "sub_toan"
    ],
    "schoolIds": ["qoagfnop"],
    "offDay": 1,
    "isOffFullDay": false,
    "id": "mwggmdrk"
  },
  {
    "name": "GV3",
    "subjectIds": [
      "sub_toan",
      "sub_khtn"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 2,
    "isOffFullDay": false,
    "id": "ypmz3lx5"
  },
  {
    "name": "GV4",
    "subjectIds": [
      "sub_toan",
      "sub_cn"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 2,
    "isOffFullDay": false,
    "id": "sh1bgt5o"
  },
  {
    "name": "GV5",
    "subjectIds": [
      "sub_toan",
      "sub_th"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 5,
    "isOffFullDay": false,
    "id": "mpeu64t5"
  },
  {
    "name": "GV6",
    "subjectIds": [
      "sub_van"
    ],
    "schoolIds": ["qoagfnop"],
    "offDay": 3,
    "isOffFullDay": false,
    "id": "uzaxob71"
  },
  {
    "name": "GV7",
    "subjectIds": [
      "sub_van"
    ],
    "schoolIds": ["qoagfnop"],
    "offDay": 4,
    "isOffFullDay": false,
    "id": "s7rmgqgm"
  },
  {
    "name": "GV8",
    "subjectIds": [
      "sub_anh"
    ],
    "schoolIds": ["qoagfnop"],
    "offDay": 5,
    "isOffFullDay": false,
    "id": "rpc55kla"
  },
  {
    "name": "GV9",
    "subjectIds": [
      "sub_anh"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 4,
    "isOffFullDay": false,
    "id": "ybylflgx"
  },
  {
    "name": "GV10",
    "subjectIds": [
      "sub_anh",
      "sub_htn"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 2,
    "isOffFullDay": false,
    "id": "p79vgsf2"
  },
  {
    "name": "GV11",
    "subjectIds": [
      "sub_nt"
    ],
    "schoolIds": ["qoagfnop"],
    "offDay": 2,
    "isOffFullDay": false,
    "id": "lmp0gsg9"
  },
  {
    "name": "GV12",
    "subjectIds": [
      "sub_nt"
    ],
    "schoolIds": ["ximosi8q", "ximosi8q"],
    "offDay": 4,
    "isOffFullDay": false,
    "id": "551r02n6"
  },
  {
    "name": "GV13",
    "subjectIds": [
      "sub_gdcd",
      "sub_ddp"
    ],
    "schoolIds": ["ximosi8q", "ximosi8q"],
    "offDay": 4,
    "isOffFullDay": false,
    "id": "u37a163d"
  },
  {
    "name": "GV13",
    "subjectIds": [
      "sub_gdtc"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 5,
    "isOffFullDay": false,
    "id": "puc9wjt4"
  },
  {
    "name": "GV15",
    "subjectIds": [
      "sub_th"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 3,
    "isOffFullDay": false,
    "id": "y85qo3qy"
  },
  {
    "name": "Gv16",
    "subjectIds": [
      "sub_khtn"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 1,
    "isOffFullDay": false,
    "id": "gs4ipyh7"
  },
  {
    "name": "GV17",
    "subjectIds": [
      "sub_lsdl",
      "sub_ddp"
    ],
    "schoolIds": ["qoagfnop", "ximosi8q"],
    "offDay": 4,
    "isOffFullDay": false,
    "id": "ejx50a7e"
  }
];

export function seedAssignments(): Assignment[] {
  return [
    {
      "classId": "swrq9p83",
      "subjectId": "sub_van",
      "teacherId": "uzaxob71",
      "periods": 4,
      "id": "owj7el1t"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_toan",
      "teacherId": "e4m9e2rg",
      "periods": 2,
      "id": "ctbrn6jj"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_anh",
      "teacherId": "rpc55kla",
      "periods": 3,
      "id": "ogo9wqw2"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_khtn",
      "teacherId": "ypmz3lx5",
      "periods": 2,
      "id": "fv96z3ff"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_lsdl",
      "teacherId": "ejx50a7e",
      "periods": 2,
      "id": "rjxwchlt"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_khtn",
      "teacherId": "gs4ipyh7",
      "periods": 2,
      "id": "3kutey55"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_gdcd",
      "teacherId": "u37a163d",
      "periods": 1,
      "id": "3ujmuh20"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_cn",
      "teacherId": "sh1bgt5o",
      "periods": 1,
      "id": "2363b0cf"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_th",
      "teacherId": "mpeu64t5",
      "periods": 1,
      "id": "nec2szut"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_gdtc",
      "teacherId": "puc9wjt4",
      "periods": 1,
      "id": "jxf9wa5g"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_nt",
      "teacherId": "lmp0gsg9",
      "periods": 1,
      "id": "etu20u69"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_nt",
      "teacherId": "551r02n6",
      "periods": 1,
      "id": "0xtyhj4b"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_htn",
      "teacherId": "p79vgsf2",
      "periods": 1,
      "id": "dlpco0t6"
    },
    {
      "classId": "swrq9p83",
      "subjectId": "sub_ddp",
      "teacherId": "ejx50a7e",
      "periods": 1,
      "id": "pg4lnqmy"
    },
    {
      "classId": "sdm696fc",
      "subjectId": "sub_van",
      "teacherId": "s7rmgqgm",
      "periods": 4,
      "id": "2220s252"
    },
    {
      "classId": "sdm696fc",
      "subjectId": "sub_toan",
      "teacherId": "mwggmdrk",
      "periods": 4,
      "id": "zbbpt44l"
    },
    {
      "classId": "sdm696fc",
      "subjectId": "sub_anh",
      "teacherId": "p79vgsf2",
      "periods": 3,
      "id": "exacprs8"
    },
    {
      "classId": "sdm696fc",
      "subjectId": "sub_khtn",
      "teacherId": "gs4ipyh7",
      "periods": 2,
      "id": "7815ckck"
    },
    {
      "classId": "sdm696fc",
      "subjectId": "sub_khtn",
      "teacherId": "ypmz3lx5",
      "periods": 2,
      "id": "mzq82lj8"
    },
    {
      "classId": "sdm696fc",
      "subjectId": "sub_lsdl",
      "teacherId": "ejx50a7e",
      "periods": 2,
      "id": "cmxlyk18"
    },
    {
      "classId": "sdm696fc",
      "subjectId": "sub_gdcd",
      "teacherId": "u37a163d",
      "periods": 2,
      "id": "voxu9ybw"
    },
    {
      "classId": "l93bg6m8",
      "subjectId": "sub_khtn",
      "teacherId": "ypmz3lx5",
      "periods": 2,
      "id": "jog3tje2"
    },
    {
      "classId": "4cthjf6n",
      "subjectId": "sub_khtn",
      "teacherId": "ypmz3lx5",
      "periods": 2,
      "id": "veurejab"
    },
    {
      "classId": "66vs3y3d",
      "subjectId": "sub_khtn",
      "teacherId": "ypmz3lx5",
      "periods": 2,
      "id": "6krcuud3"
    },
    {
      "classId": "tmy74ou5",
      "subjectId": "sub_khtn",
      "teacherId": "ypmz3lx5",
      "periods": 2,
      "id": "js094xet"
    },
    {
      "classId": "upjxnm1i",
      "subjectId": "sub_khtn",
      "teacherId": "ypmz3lx5",
      "periods": 2,
      "id": "bq0anibu"
    }
  ];
}
