import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/assignments")({
  component: AssignmentsPage,
  head: () => ({ meta: [{ title: "Phân công dạy – TKB THCS" }] }),
});

function AssignmentsPage() {
  const {
    assignments,
    classes,
    subjects,
    teachers,
    schools,
    addAssignment,
    updateAssignment,
    removeAssignment,
  } = useStore();

  const [filterClass, setFilterClass] = useState<string>("all");
  const [nw, setNw] = useState({
    classId: classes[0]?.id || "",
    subjectId: subjects[0]?.id || "",
    teacherId: teachers[0]?.id || "",
    periods: 2,
  });

  const filtered = useMemo(
    () => (filterClass === "all" ? assignments : assignments.filter((a) => a.classId === filterClass)),
    [assignments, filterClass],
  );

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Phân công dạy</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mỗi (lớp × môn) được gán cho 1 giáo viên và số tiết/tuần.
        </p>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-base">Thêm phân công</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-5">
          <div>
            <Label>Lớp</Label>
            <Select value={nw.classId} onValueChange={(v) => setNw({ ...nw, classId: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {classes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Môn</Label>
            <Select value={nw.subjectId} onValueChange={(v) => setNw({ ...nw, subjectId: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Giáo viên</Label>
            <Select value={nw.teacherId} onValueChange={(v) => setNw({ ...nw, teacherId: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {teachers
                  .filter((t) => t.subjectIds.includes(nw.subjectId))
                  .map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tiết/tuần</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                value={nw.periods}
                onChange={(e) => setNw({ ...nw, periods: Number(e.target.value) })}
              />
              <Button
                onClick={() => {
                  if (!nw.classId || !nw.subjectId || !nw.teacherId) {
                    toast.error("Điền đầy đủ"); return;
                  }
                  if (assignments.some((a) => a.classId === nw.classId && a.subjectId === nw.subjectId && a.teacherId === nw.teacherId)) {
                    toast.error("Giáo viên này đã được phân công môn này cho lớp này"); return;
                  }
                  addAssignment(nw);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-3 flex items-center gap-3">
        <Label className="text-sm">Lọc theo lớp:</Label>
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {classes.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{filtered.length} phân công</span>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2 text-xs font-medium uppercase text-muted-foreground">
            <div className="col-span-2">Lớp</div>
            <div className="col-span-3">Môn</div>
            <div className="col-span-5">Giáo viên</div>
            <div className="col-span-1">Tiết</div>
            <div className="col-span-1"></div>
          </div>
          {filtered.map((a) => {
            const cls = classes.find((c) => c.id === a.classId);
            const sub = subjects.find((s) => s.id === a.subjectId);
            const sch = schools.find((s) => s.id === cls?.schoolId);
            const eligible = teachers.filter((t) => t.subjectIds.includes(a.subjectId));
            return (
              <div key={a.id} className="grid grid-cols-12 items-center gap-2 border-b px-4 py-2 text-sm">
                <div className="col-span-2">
                  <div className="font-medium">{cls?.name}</div>
                  <div className="text-xs text-muted-foreground">{sch?.name.split("(")[0].trim()}</div>
                </div>
                <div className="col-span-3">{sub?.name}</div>
                <div className="col-span-5">
                  <Select
                    value={a.teacherId}
                    onValueChange={(v) => updateAssignment(a.id, { teacherId: v })}
                  >
                    <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {eligible.map((t) => (
                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Input
                    type="number"
                    min={0}
                    className="h-8"
                    value={a.periods}
                    onChange={(e) => updateAssignment(a.id, { periods: Number(e.target.value) })}
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button variant="ghost" size="icon" onClick={() => removeAssignment(a.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </AppLayout>
  );
}