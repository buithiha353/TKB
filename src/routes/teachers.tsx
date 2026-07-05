import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/timetable/store";
import { DAY_NAMES } from "@/lib/timetable/types";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/teachers")({
  component: TeachersPage,
  head: () => ({ meta: [{ title: "Giáo viên – TKB THCS" }] }),
});

function TeachersPage() {
  const { teachers, subjects, classes, schools, assignments, addTeacher, updateTeacher, removeTeacher, syncTeacherClasses } = useStore();

  const handleAddRow = () => {
    addTeacher({
      name: "",
      subjectIds: [],
      schoolIds: [],
      offDay: 5,
      isOffFullDay: false
    });
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Giáo viên</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý giáo viên, môn dạy, lớp dạy, điểm trường và ngày nghỉ. Dữ liệu tự động lưu khi chỉnh sửa.
          </p>
        </div>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="p-3 font-medium w-[200px]">Họ và tên</th>
              <th className="p-3 font-medium w-[200px]">Môn dạy</th>
              <th className="p-3 font-medium w-[250px]">Lớp dạy</th>
              <th className="p-3 font-medium w-[180px]">Điểm trường</th>
              <th className="p-3 font-medium w-[200px]">Ngày nghỉ</th>
              <th className="p-3 font-medium w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => {
              const currentClassIds = Array.from(new Set(assignments.filter(a => a.teacherId === t.id).map(a => a.classId)));

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
                        <Button variant="outline" className="h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words">
                          {t.subjectIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {t.subjectIds.map(sid => {
                                const sub = subjects.find(s => s.id === sid);
                                return sub ? <Badge key={sid} variant="secondary" className="px-1.5 py-0 font-normal">{sub.shortName}</Badge> : null;
                              })}
                            </div>
                          ) : <span className="text-muted-foreground">Chọn môn...</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-2" align="start">
                        <div className="grid grid-cols-2 gap-2">
                          {subjects.map(s => (
                            <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded">
                              <Checkbox 
                                checked={t.subjectIds.includes(s.id)}
                                onCheckedChange={(checked) => {
                                  const next = checked 
                                    ? [...t.subjectIds, s.id] 
                                    : t.subjectIds.filter(x => x !== s.id);
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
                        <Button variant="outline" className="h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words">
                          {currentClassIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {currentClassIds.map(cid => {
                                const cls = classes.find(c => c.id === cid);
                                return cls ? <Badge key={cid} variant="secondary" className="px-1.5 py-0 font-normal">{cls.name}</Badge> : null;
                              })}
                            </div>
                          ) : <span className="text-muted-foreground">Chọn lớp...</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-2 max-h-[300px] overflow-y-auto" align="start">
                        <div className="grid grid-cols-3 gap-2">
                          {classes.map(c => (
                            <label key={c.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1 rounded">
                              <Checkbox 
                                checked={currentClassIds.includes(c.id)}
                                onCheckedChange={(checked) => {
                                  const next = checked 
                                    ? [...currentClassIds, c.id] 
                                    : currentClassIds.filter(x => x !== c.id);
                                  syncTeacherClasses(t.id, next);
                                }}
                              />
                              <span className="truncate">{c.name}</span>
                            </label>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td className="p-2 align-top">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="h-auto min-h-8 py-1.5 w-full justify-start font-normal px-2 text-left h-auto whitespace-normal break-words">
                          {t.schoolIds?.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {t.schoolIds.map(sid => {
                                const school = schools.find(s => s.id === sid);
                                return school ? <Badge key={sid} variant="secondary" className="px-1.5 py-0 font-normal">{school.name}</Badge> : null;
                              })}
                            </div>
                          ) : <span className="text-muted-foreground">Chọn...</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-2" align="start">
                        <div className="space-y-1">
                          {schools.map(s => (
                            <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 p-1.5 rounded">
                              <Checkbox 
                                checked={t.schoolIds?.includes(s.id)}
                                onCheckedChange={(checked) => {
                                  const currentIds = t.schoolIds || [];
                                  const next = checked 
                                    ? [...currentIds, s.id] 
                                    : currentIds.filter(x => x !== s.id);
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
                  <td className="p-2 align-top">
                    <div className="flex items-center gap-2 h-8">
                      <Select value={String(t.offDay)} onValueChange={(v) => updateTeacher(t.id, { offDay: Number(v) })}>
                        <SelectTrigger className="h-8 shadow-none flex-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {DAY_NAMES.map((d, i) => (
                            <SelectItem key={i} value={String(i + 1)}>Thứ {i + 2}</SelectItem>
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeTeacher(t.id)}>
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
          <Button variant="ghost" size="sm" onClick={handleAddRow} className="w-full justify-start text-muted-foreground hover:text-foreground">
            <Plus className="mr-2 h-4 w-4" /> Thêm dòng mới
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}