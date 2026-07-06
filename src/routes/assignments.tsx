import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/timetable/store";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CopyCheck, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/assignments")({
  component: AssignmentsPage,
  head: () => ({ meta: [{ title: "Phân công dạy – TKB THCS" }] }),
});

function AssignmentsPage() {
  const { classes, teachers } = useStore();

  if (classes.length === 0) {
    return (
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Phân công giảng dạy</h1>
        </div>
        <p className="text-muted-foreground">Vui lòng thêm lớp học trước.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Phân công giảng dạy</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Chọn giáo viên phụ trách cho từng môn học của lớp, và cấu hình chính xác số tiết Sáng/Chiều.
        </p>
      </div>

      <Tabs defaultValue="by-class" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="by-class">Theo Lớp</TabsTrigger>
          <TabsTrigger value="by-teacher">Theo Giáo viên</TabsTrigger>
        </TabsList>
        <TabsContent value="by-class">
          <AssignmentByClass />
        </TabsContent>
        <TabsContent value="by-teacher">
          {teachers.length === 0 ? (
            <p className="text-muted-foreground">Vui lòng thêm giáo viên trước.</p>
          ) : (
            <AssignmentByTeacher />
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

function AssignmentByClass() {
  const { assignments, classes, subjects, teachers, addAssignment, updateAssignment, removeAssignment } = useStore();

  const initialClassId = classes[0]?.id || "";
  const [filterClass, setFilterClass] = useState<string>(initialClassId);

  const applyClassToGrade = () => {
    if (!filterClass) return;

    const sourceClass = classes.find((c) => c.id === filterClass);
    if (!sourceClass) return;

    const sourceAssignments = assignments.filter((a) => a.classId === sourceClass.id);
    if (sourceAssignments.length === 0) {
      toast.info("Lớp này chưa có phân công nào để áp dụng");
      return;
    }

    let changed = 0;
    sourceAssignments.forEach((source) => {
      assignments.forEach((target) => {
        if (target.id === source.id || target.subjectId !== source.subjectId) return;

        const targetClass = classes.find((c) => c.id === target.classId);
        if (!targetClass || targetClass.grade !== sourceClass.grade) return;

        if (
          target.morningPeriods !== source.morningPeriods ||
          target.afternoonPeriods !== source.afternoonPeriods
        ) {
          updateAssignment(target.id, {
            morningPeriods: source.morningPeriods || 0,
            afternoonPeriods: source.afternoonPeriods || 0,
          });
          changed += 1;
        }
      });
    });

    if (changed === 0) {
      toast.info(`Không có phân công nào cần cập nhật trong khối ${sourceClass.grade}`);
      return;
    }

    toast.success(
      `Đã đồng bộ cấu hình số tiết cho ${changed} phân công cùng khối ${sourceClass.grade}`,
    );
  };

  const handleTeacherChange = (subjectId: string, assignmentId: string | undefined, teacherId: string) => {
    if (assignmentId) {
      updateAssignment(assignmentId, { teacherId });
    } else {
      const subject = subjects.find(s => s.id === subjectId);
      addAssignment({
        classId: filterClass,
        subjectId,
        teacherId,
        morningPeriods: subject?.defaultPeriods || 0,
        afternoonPeriods: 0,
      });
    }
  };

  const handleAddRow = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    addAssignment({
      classId: filterClass,
      subjectId,
      teacherId: "", 
      morningPeriods: subject?.defaultPeriods || 0,
      afternoonPeriods: 0,
    });
  };

  if (!filterClass) return null;

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <Label className="text-sm font-medium">Chọn lớp:</Label>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {classes.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                Lớp {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="sm" className="ml-4" onClick={applyClassToGrade}>
          <CopyCheck className="mr-2 h-4 w-4" /> Toàn khối
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground border-b">
                <tr>
                  <th className="p-3 font-medium text-left w-[200px]">Môn học</th>
                  <th className="p-3 font-medium text-left">Giáo viên phụ trách</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tiết Sáng</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tiết Chiều</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tổng</th>
                  <th className="p-3 font-medium text-center w-[80px]"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {subjects.map((sub) => {
                  const subjectAssignments = assignments.filter(
                    (a) => a.classId === filterClass && a.subjectId === sub.id
                  );
                  
                  const rows = subjectAssignments.length > 0 ? subjectAssignments : [null];

                  return rows.map((a, index) => {
                    const morning = a?.morningPeriods || 0;
                    const afternoon = a?.afternoonPeriods || 0;
                    const total = morning + afternoon;

                    const subTotal = subjectAssignments.reduce(
                      (acc, curr) =>
                        acc + (curr.morningPeriods || 0) + (curr.afternoonPeriods || 0),
                      0,
                    );
                    const expectedTotal = sub.defaultPeriods || 0;
                    const isMismatch = subTotal !== expectedTotal;
                    
                    const validTeachers = teachers.filter(t => t.subjectIds.includes(sub.id));
                    
                    const currentTeacher = teachers.find(t => t.id === a?.teacherId);
                    if (currentTeacher && !validTeachers.find(t => t.id === currentTeacher.id)) {
                      validTeachers.push(currentTeacher);
                    }

                    return (
                      <tr key={a ? a.id : `${sub.id}-empty`} className="hover:bg-muted/20">
                        <td className="p-3">
                          {index === 0 ? (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{sub.name}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 text-muted-foreground hover:text-primary"
                                onClick={() => handleAddRow(sub.id)}
                                title="Thêm giáo viên dạy chung"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-muted-foreground pl-4">↳ Cùng dạy</span>
                          )}
                        </td>
                        <td className="p-3">
                          <Select 
                            value={a?.teacherId || "none"} 
                            onValueChange={(val) => handleTeacherChange(sub.id, a?.id, val)}
                          >
                            <SelectTrigger className="w-full bg-white h-8">
                              <SelectValue placeholder="Chọn giáo viên..." />
                            </SelectTrigger>
                            <SelectContent>
                              {validTeachers.map(t => (
                                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                              ))}
                              {validTeachers.length === 0 && (
                                <SelectItem value="disabled" disabled>Không có giáo viên dạy môn này</SelectItem>
                              )}
                              {a?.teacherId === "" && (
                                <SelectItem value="none" className="hidden">Chưa chọn GV</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-3">
                          {a && (
                            <Input
                              type="number"
                              min={0}
                              className="h-8 text-center"
                              value={morning === 0 ? "" : morning}
                              onChange={(e) =>
                                updateAssignment(a.id, { morningPeriods: Number(e.target.value) })
                              }
                            />
                          )}
                        </td>
                        <td className="p-3">
                          {a && (
                            <Input
                              type="number"
                              min={0}
                              className="h-8 text-center"
                              value={afternoon === 0 ? "" : afternoon}
                              onChange={(e) =>
                                updateAssignment(a.id, { afternoonPeriods: Number(e.target.value) })
                              }
                            />
                          )}
                        </td>
                        <td
                          className={cn(
                            "p-3 text-center font-mono",
                            isMismatch ? "text-red-600 font-bold" : "text-muted-foreground",
                          )}
                        >
                          {a && (
                            <>
                              {total}
                              {index === rows.length - 1 && isMismatch && (
                                <span className="block text-xs font-sans font-normal opacity-80 mt-1">
                                  (Tổng: {subTotal}/{expectedTotal})
                                </span>
                              )}
                            </>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {a && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeAssignment(a.id)}
                              title="Xóa phân công"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AssignmentByTeacher() {
  const { assignments, classes, subjects, teachers, addAssignment, updateAssignment, removeAssignment } = useStore();

  const initialTeacherId = teachers[0]?.id || "";
  const [filterTeacher, setFilterTeacher] = useState<string>(initialTeacherId);

  if (!filterTeacher) return null;

  const currentTeacher = teachers.find(t => t.id === filterTeacher);
  if (!currentTeacher) return null;

  const teacherAssignments = assignments.filter((a) => a.teacherId === filterTeacher);

  const sortedAssignments = [...teacherAssignments].sort((a, b) => {
    const classA = classes.find(c => c.id === a.classId);
    const classB = classes.find(c => c.id === b.classId);
    if (classA?.grade !== classB?.grade) return (classA?.grade || 0) - (classB?.grade || 0);
    return (classA?.name || '').localeCompare(classB?.name || '');
  });

  const handleAddRow = () => {
    addAssignment({
      classId: classes[0]?.id || "",
      subjectId: currentTeacher.subjectIds[0] || subjects[0]?.id || "",
      teacherId: filterTeacher,
      morningPeriods: 0,
      afternoonPeriods: 0,
    });
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <Label className="text-sm font-medium">Chọn giáo viên:</Label>
        <Select value={filterTeacher} onValueChange={setFilterTeacher}>
          <SelectTrigger className="w-64 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {teachers.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name} {t.subjectIds.length > 0 ? `(${subjects.find(s => s.id === t.subjectIds[0])?.shortName || ''}${t.subjectIds.length > 1 ? ',...' : ''})` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/10 text-muted-foreground border-b text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3 font-medium text-left w-[150px]">Lớp</th>
                  <th className="p-3 font-medium text-left w-[200px]">Môn học</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tiết Sáng</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tiết Chiều</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tổng</th>
                  <th className="p-3 font-medium text-center w-[80px]"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sortedAssignments.map(a => {
                  const morning = a.morningPeriods || 0;
                  const afternoon = a.afternoonPeriods || 0;
                  const total = morning + afternoon;

                  const sub = subjects.find(s => s.id === a.subjectId);
                  const subTotal = assignments
                    .filter(asn => asn.classId === a.classId && asn.subjectId === a.subjectId)
                    .reduce((acc, curr) => acc + (curr.morningPeriods || 0) + (curr.afternoonPeriods || 0), 0);
                  const expectedTotal = sub?.defaultPeriods || 0;
                  const isMismatch = subTotal !== expectedTotal;

                  return (
                    <tr key={a.id} className="hover:bg-muted/20">
                      <td className="p-3">
                        <Select
                          value={a.classId}
                          onValueChange={(val) => updateAssignment(a.id, { classId: val })}
                        >
                          <SelectTrigger className="w-full bg-white h-8">
                            <SelectValue placeholder="Chọn lớp..." />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map(c => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        <Select
                          value={a.subjectId}
                          onValueChange={(val) => updateAssignment(a.id, { subjectId: val })}
                        >
                          <SelectTrigger className="w-full bg-white h-8">
                            <SelectValue placeholder="Chọn môn..." />
                          </SelectTrigger>
                          <SelectContent>
                            {currentTeacher.subjectIds.map(sid => {
                              const s = subjects.find(sb => sb.id === sid);
                              return s ? <SelectItem key={sid} value={sid}>{s.name}</SelectItem> : null;
                            })}
                            {currentTeacher.subjectIds.length === 0 && (
                              <SelectItem value="disabled" disabled>GV chưa đăng ký môn</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          min={0}
                          className="h-8 text-center"
                          value={morning === 0 ? "" : morning}
                          onChange={(e) =>
                            updateAssignment(a.id, { morningPeriods: Number(e.target.value) })
                          }
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          min={0}
                          className="h-8 text-center"
                          value={afternoon === 0 ? "" : afternoon}
                          onChange={(e) =>
                            updateAssignment(a.id, { afternoonPeriods: Number(e.target.value) })
                          }
                        />
                      </td>
                      <td
                        className={cn(
                          "p-3 text-center font-mono",
                          isMismatch ? "text-red-600 font-bold" : "text-muted-foreground",
                        )}
                      >
                        {total}
                        {isMismatch && sub && (
                          <span className="block text-xs font-sans font-normal opacity-80 mt-1">
                            (Lớp: {subTotal}/{expectedTotal})
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeAssignment(a.id)}
                          title="Xóa phân công"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {sortedAssignments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground italic">
                      Giáo viên này chưa được phân công lớp nào.
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={6} className="p-3 bg-muted/5">
                    <Button variant="outline" className="w-full border-dashed" onClick={handleAddRow}>
                      <Plus className="mr-2 h-4 w-4" /> Thêm dòng
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
