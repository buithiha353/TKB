import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/timetable/store";
import { DAY_NAMES } from "@/lib/timetable/types";
import { useState, useMemo } from "react";
import type { Assignment, Teacher, SchoolClass } from "@/lib/timetable/types";
import {
  normalizeLookup,
  openWorkbookFromUser,
  readCellText,
  saveWorkbookWithDialog,
  splitCellList,
  styleTemplateHeader,
} from "@/lib/timetable/excelFiles";
import { Download, FileUp, Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/teachers")({
  component: TeachersPage,
  head: () => ({ meta: [{ title: "Giáo viên – TKB THCS" }] }),
});

function TeachersPage() {
  const {
    teachers,
    subjects,
    classes,
    schools,
    assignments,
    addTeacher,
    updateTeacher,
    removeTeacher,
    syncTeacherClasses,
  } = useStore();

  const groupedClasses = useMemo(() => {
    const groups: Record<number, typeof classes> = {};
    classes.forEach(c => {
      if (!groups[c.grade]) groups[c.grade] = [];
      groups[c.grade].push(c);
    });
    return Object.entries(groups)
      .map(([grade, list]) => ({ grade: Number(grade), classes: list }))
      .sort((a, b) => a.grade - b.grade);
  }, [classes]);

  const handleAddRow = () => {
    addTeacher({
      name: "",
      subjectIds: [],
      schoolIds: schools.length > 0 ? [schools[0].id] : [],
      offDay: 5,
      isOffFullDay: false,
    });
  };

  const downloadTeacherTemplate = async () => {
    const ExcelJS = await import("exceljs");
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Giao vien");
    sheet.columns = [
      { header: "Họ và tên", key: "name", width: 28 },
      { header: "Môn dạy", key: "subjects", width: 32 },
      { header: "Lớp dạy", key: "classes", width: 32 },
      { header: "Điểm trường", key: "schools", width: 32 },
      { header: "Ngày nghỉ", key: "offDay", width: 16 },
      { header: "Nghỉ cả ngày", key: "fullDay", width: 16 },
    ];
    styleTemplateHeader(sheet.getRow(1));
    sheet.addRows([
      {
        name: "Nguyễn Văn A",
        subjects: subjects[0]?.shortName || "Toán",
        classes:
          classes
            .slice(0, 3)
            .map((c) => c.name)
            .join("; ") || "6A; 6B",
        schools: schools[0]?.name || "Điểm A",
        offDay: "Thứ 2",
        fullDay: "Không",
      },
      {
        name: "Trần Thị B",
        subjects:
          subjects
            .slice(1, 3)
            .map((s) => s.shortName)
            .join("; ") || "Văn; Anh",
        classes:
          classes
            .slice(3, 6)
            .map((c) => c.name)
            .join("; ") || "7A; 7B",
        schools: schools.map((s) => s.name.replace(/Điểm trường\s*/i, "").trim()).join("; ") || "A; B",
        offDay: "",
        fullDay: "",
      },
    ]);
    const saved = await saveWorkbookWithDialog(workbook, "Mau_Nhap_Giao_Vien.xlsx");
    if (saved) toast.success("Đã lưu file mẫu giáo viên");
  };

  const parseOffDay = (value: string) => {
    if (!value || value.toString().trim() === "") return 0;
    const normalized = normalizeLookup(value);
    if (normalized === "" || normalized === "khong") return 0;
    const dayIndex = DAY_NAMES.findIndex((day) => normalizeLookup(day) === normalized);
    if (dayIndex >= 0) return dayIndex + 1;

    const number = Number(value.replace(/\D/g, ""));
    if (number >= 2 && number <= 6) return number - 1;
    if (number >= 1 && number <= 5) return number;
    return 0;
  };

  const parseBoolean = (value: string) => {
    if (!value || value.toString().trim() === "") return false;
    return ["co", "có", "yes", "true", "1", "x"].includes(normalizeLookup(value));
  };

  const importTeachersFromExcel = async () => {
    try {
      const workbook = await openWorkbookFromUser();
      if (!workbook) return;

      const sheet = workbook.worksheets[0];
      if (!sheet) {
        toast.error("File Excel không có sheet dữ liệu");
        return;
      }

      const subjectByName = new Map(
        subjects.flatMap((s) => [
          [normalizeLookup(s.name), s],
          [normalizeLookup(s.shortName), s],
        ]),
      );
      const classByName = new Map(classes.map((c) => [normalizeLookup(c.name), c]));
      const schoolByName = new Map();
      schools.forEach((s) => {
        schoolByName.set(normalizeLookup(s.name), s);
        const match = s.name.match(/Điểm\s*(?:trường\s*)?(.*)/i);
        if (match && match[1]) {
          schoolByName.set(normalizeLookup(match[1]), s);
        }
      });
      const teacherNames = new Set(teachers.map((t) => normalizeLookup(t.name)));
      const nextTeachers: Teacher[] = [...teachers];
      const nextAssignments: Assignment[] = [...assignments];
      let imported = 0;

      sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const name = readCellText(row, 1);
        if (!name || teacherNames.has(normalizeLookup(name))) return;

        const subjectIds = splitCellList(readCellText(row, 2))
          .map((item) => subjectByName.get(normalizeLookup(item))?.id)
          .filter((id): id is string => Boolean(id));
        const classIds = splitCellList(readCellText(row, 3))
          .map((item) => classByName.get(normalizeLookup(item))?.id)
          .filter((id): id is string => Boolean(id));
        const schoolIds = splitCellList(readCellText(row, 4))
          .map((item) => schoolByName.get(normalizeLookup(item))?.id)
          .filter((id): id is string => Boolean(id));

        const teacherId = Math.random().toString(36).slice(2, 10);
        nextTeachers.push({
          id: teacherId,
          name,
          subjectIds,
          schoolIds:
            schoolIds.length > 0 ? Array.from(new Set(schoolIds)) : schools.map((s) => s.id),
          offDay: parseOffDay(readCellText(row, 5)),
          isOffFullDay: parseBoolean(readCellText(row, 6)),
        });

        for (const classId of Array.from(new Set(classIds))) {
          for (const subjectId of Array.from(new Set(subjectIds))) {
            const subject = subjects.find((s) => s.id === subjectId);
            nextAssignments.push({
              id: Math.random().toString(36).slice(2, 10),
              teacherId,
              classId,
              subjectId,
              morningPeriods: subject?.defaultPeriods || 0,
              afternoonPeriods: 0,
            });
          }
        }

        teacherNames.add(normalizeLookup(name));
        imported += 1;
      });

      if (imported === 0) {
        toast.warning("Không có giáo viên mới hợp lệ để nhập");
        return;
      }

      useStore.setState({ teachers: nextTeachers, assignments: nextAssignments });
      toast.success(`Đã nhập ${imported} giáo viên từ Excel`);
    } catch (error) {
      console.error(error);
      toast.error("Không thể nhập file Excel giáo viên");
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Giáo viên</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý giáo viên, môn dạy, lớp dạy, điểm trường và ngày nghỉ. Dữ liệu tự động lưu khi
            chỉnh sửa.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="outline" onClick={downloadTeacherTemplate}>
            <Download className="mr-2 h-4 w-4" /> Mẫu Excel
          </Button>
          <Button variant="outline" onClick={importTeachersFromExcel}>
            <FileUp className="mr-2 h-4 w-4" /> Nhập Excel
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="p-3 font-medium w-[200px]">Họ và tên</th>
              <th className="p-3 font-medium w-[200px]">Môn dạy</th>
              <th className="p-3 font-medium w-[250px]">Lớp dạy</th>
              {schools.length > 1 && <th className="p-3 font-medium w-[180px]">Điểm trường</th>}
              <th className="p-3 font-medium w-[200px]">Ngày nghỉ</th>
              <th className="p-3 font-medium w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => {
              const currentClassIds = Array.from(
                new Set(assignments.filter((a) => a.teacherId === t.id).map((a) => a.classId)),
              );

              return (
                <tr key={t.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-2 align-top">
                    <Input
                      className="h-auto py-1.5 shadow-none bg-transparent border-transparent hover:border-input focus:border-input focus:bg-background"
                      value={t.name}
                      onChange={(e) => updateTeacher(t.id, { name: e.target.value })}
                      placeholder="Nhập tên..."
                    />
                  </td>
                  <td className="p-2 align-top">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words"
                        >
                          {t.subjectIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {t.subjectIds.map((sid) => {
                                const sub = subjects.find((s) => s.id === sid);
                                return sub ? (
                                  <Badge
                                    key={sid}
                                    variant="secondary"
                                    className="px-1.5 py-0 font-normal"
                                  >
                                    {sub.shortName}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Chọn môn...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-2" align="start">
                        <div className="grid grid-cols-2 gap-2">
                          {subjects.map((s) => (
                            <label
                              key={s.id}
                              className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded"
                            >
                              <Checkbox
                                checked={t.subjectIds.includes(s.id)}
                                onCheckedChange={(checked) => {
                                  const next = checked
                                    ? [...t.subjectIds, s.id]
                                    : t.subjectIds.filter((x) => x !== s.id);
                                  updateTeacher(t.id, { subjectIds: next });
                                }}
                              />
                              <span className="truncate">{s.shortName}</span>
                            </label>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td className="p-2 align-top">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words"
                        >
                          {currentClassIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {currentClassIds.map((cid) => {
                                const cls = classes.find((c) => c.id === cid);
                                return cls ? (
                                  <Badge
                                    key={cid}
                                    variant="secondary"
                                    className="px-1.5 py-0 font-normal"
                                  >
                                    {cls.name}
                                  </Badge>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Chọn lớp...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-4 max-h-[400px] overflow-y-auto"
                        align="start"
                      >
                        <div className="flex gap-6">
                          {groupedClasses.map((group: { grade: number; classes: SchoolClass[] }) => (
                            <div key={group.grade} className="flex flex-col gap-1 min-w-[60px]">
                              <div className="font-semibold text-xs text-muted-foreground border-b pb-1 mb-1 uppercase tracking-wider">
                                Khối {group.grade}
                              </div>
                              {group.classes.map((c: SchoolClass) => (
                                <label
                                  key={c.id}
                                  className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded"
                                >
                                  <Checkbox
                                    checked={currentClassIds.includes(c.id)}
                                    onCheckedChange={(checked) => {
                                      const next = checked
                                        ? [...currentClassIds, c.id]
                                        : currentClassIds.filter((x) => x !== c.id);
                                      syncTeacherClasses(t.id, next);
                                    }}
                                  />
                                  <span className="truncate">{c.name}</span>
                                </label>
                              ))}
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  {schools.length > 1 && (
                    <td className="p-2 align-top">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words"
                          >
                            {t.schoolIds?.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {t.schoolIds.map((sid) => {
                                  const school = schools.find((s) => s.id === sid);
                                  return school ? (
                                    <Badge
                                      key={sid}
                                      variant="secondary"
                                      className="px-1.5 py-0 font-normal"
                                    >
                                      {school.name}
                                    </Badge>
                                  ) : null;
                                })}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Chọn...</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-2" align="start">
                          <div className="space-y-1">
                            {schools.map((s) => (
                              <label
                                key={s.id}
                                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded"
                              >
                                <Checkbox
                                  checked={t.schoolIds?.includes(s.id)}
                                  onCheckedChange={(checked) => {
                                    const currentIds = t.schoolIds || [];
                                    const next = checked
                                      ? [...currentIds, s.id]
                                      : currentIds.filter((x) => x !== s.id);
                                    updateTeacher(t.id, { schoolIds: next });
                                  }}
                                />
                                <span className="truncate">{s.name}</span>
                              </label>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </td>
                  )}
                  <td className="p-2 align-top">
                    <div className="flex items-center gap-2 h-8">
                      <Select
                        value={String(t.offDay)}
                        onValueChange={(v) => updateTeacher(t.id, { offDay: Number(v) })}
                      >
                        <SelectTrigger className="h-8 shadow-none flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Không nghỉ</SelectItem>
                          {DAY_NAMES.map((d, i) => (
                            <SelectItem key={i} value={String(i + 1)}>
                              Thứ {i + 2}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <label className="flex items-center gap-1.5 text-xs whitespace-nowrap cursor-pointer">
                        <Checkbox
                          checked={t.isOffFullDay}
                          onCheckedChange={(c) => updateTeacher(t.id, { isOffFullDay: !!c })}
                        />
                        Cả ngày
                      </label>
                    </div>
                  </td>
                  <td className="p-2 align-top text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeTeacher(t.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  Chưa có dữ liệu giáo viên.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="p-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddRow}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Plus className="mr-2 h-4 w-4" /> Thêm dòng mới
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
