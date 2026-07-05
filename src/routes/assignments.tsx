import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
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
import { useStore } from "@/lib/timetable/store";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assignments")({
  component: AssignmentsPage,
  head: () => ({ meta: [{ title: "Phân công dạy – TKB THCS" }] }),
});

function AssignmentsPage() {
  const { assignments, classes, subjects, teachers, updateAssignment } = useStore();

  const initialClassId = classes[0]?.id || "";
  const [filterClass, setFilterClass] = useState<string>(initialClassId || "all");

  const filtered = useMemo(
    () =>
      filterClass === "all" ? assignments : assignments.filter((a) => a.classId === filterClass),
    [assignments, filterClass],
  );

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Cấu hình Số tiết</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Giáo viên được phân công tự động từ mục <b>Giáo viên</b>. Tại đây, bạn tuỳ chỉnh chính xác
          số tiết <b>Sáng</b> và <b>Chiều</b> cho từng môn.
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <Label className="text-sm font-medium">Chọn lớp:</Label>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả các lớp</SelectItem>
            {classes.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                Lớp {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{filtered.length} phân công</span>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  {filterClass === "all" && <th className="p-3 font-medium text-left">Lớp</th>}
                  <th className="p-3 font-medium text-left">Môn học</th>
                  <th className="p-3 font-medium text-left">Giáo viên phụ trách</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tiết Sáng</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tiết Chiều</th>
                  <th className="p-3 font-medium text-center w-[120px]">Tổng</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((a) => {
                  const cls = classes.find((c) => c.id === a.classId);
                  const sub = subjects.find((s) => s.id === a.subjectId);
                  const teacher = teachers.find((t) => t.id === a.teacherId);
                  const morning = a.morningPeriods || 0;
                  const afternoon = a.afternoonPeriods || 0;
                  const total = morning + afternoon;

                  const subTotal = filtered
                    .filter((x) => x.classId === a.classId && x.subjectId === a.subjectId)
                    .reduce(
                      (acc, curr) =>
                        acc + (curr.morningPeriods || 0) + (curr.afternoonPeriods || 0),
                      0,
                    );
                  const expectedTotal = sub?.defaultPeriods || 0;
                  const isMismatch = subTotal !== expectedTotal;

                  return (
                    <tr key={a.id} className="hover:bg-muted/20">
                      {filterClass === "all" && <td className="p-3 font-medium">{cls?.name}</td>}
                      <td className="p-3">{sub?.name}</td>
                      <td className="p-3">
                        {teacher ? (
                          <Badge
                            variant="outline"
                            className="font-normal bg-blue-50/50 text-blue-700 border-blue-200"
                          >
                            {teacher.name}
                          </Badge>
                        ) : (
                          <span className="text-destructive">Chưa phân công</span>
                        )}
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
                        {isMismatch && (
                          <span className="block text-xs font-sans font-normal opacity-80 mt-1">
                            (Tổng môn: {subTotal}/{expectedTotal})
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      Lớp này chưa được phân công giáo viên nào.
                      <br />
                      Vui lòng sang mục <b>Giáo viên</b> để đánh dấu lớp dạy.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
