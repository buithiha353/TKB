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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/timetable/store";
import type { Teacher } from "@/lib/timetable/types";
import { DAY_NAMES } from "@/lib/timetable/types";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/teachers")({
  component: TeachersPage,
  head: () => ({ meta: [{ title: "Giáo viên – TKB THCS" }] }),
});

const emptyT: Omit<Teacher, "id"> = {
  name: "",
  subjectIds: [],
  primarySchoolId: "",
  secondarySchoolId: null,
  morningOffDay: 5,
};

function TeachersPage() {
  const { teachers, subjects, schools, addTeacher, updateTeacher, removeTeacher } = useStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<{ id: string | null; data: Omit<Teacher, "id"> }>({
    id: null,
    data: { ...emptyT, primarySchoolId: schools[0]?.id || "" },
  });

  const startAdd = () => {
    setEditing({ id: null, data: { ...emptyT, primarySchoolId: schools[0]?.id || "" } });
    setOpen(true);
  };
  const startEdit = (t: Teacher) => {
    setEditing({ id: t.id, data: { ...t } });
    setOpen(true);
  };
  const save = () => {
    const d = editing.data;
    if (!d.name.trim() || !d.primarySchoolId || d.subjectIds.length === 0) {
      toast.error("Vui lòng nhập tên, điểm trường chính và ít nhất 1 môn dạy");
      return;
    }
    if (editing.id) updateTeacher(editing.id, d);
    else addTeacher(d);
    setOpen(false);
  };

  const toggleSubject = (sid: string) => {
    setEditing((e) => ({
      ...e,
      data: {
        ...e.data,
        subjectIds: e.data.subjectIds.includes(sid)
          ? e.data.subjectIds.filter((x) => x !== sid)
          : [...e.data.subjectIds, sid],
      },
    }));
  };

  return (
    <AppLayout>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Giáo viên</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Mỗi GV có 1 buổi sáng nghỉ trong tuần và có thể dạy ở 2 điểm trường (ưu tiên chính).
          </p>
        </div>
        <Button onClick={startAdd}>
          <Plus className="mr-2 h-4 w-4" /> Thêm GV
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((t) => {
          const primary = schools.find((s) => s.id === t.primarySchoolId);
          const secondary = schools.find((s) => s.id === t.secondarySchoolId);
          return (
            <Card key={t.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{t.name}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {t.subjectIds.map((sid) => {
                        const s = subjects.find((x) => x.id === sid);
                        return s ? (
                          <Badge key={sid} variant="secondary" className="text-xs">
                            {s.shortName}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(t)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeTeacher(t.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                  <div>Chính: <span className="text-foreground">{primary?.name || "—"}</span></div>
                  {secondary && <div>Phụ: <span className="text-foreground">{secondary.name}</span></div>}
                  <div>Nghỉ: <span className="text-foreground">Sáng {DAY_NAMES[t.morningOffDay - 1]}</span></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing.id ? "Sửa giáo viên" : "Thêm giáo viên"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Họ và tên</Label>
              <Input
                value={editing.data.name}
                onChange={(e) => setEditing({ ...editing, data: { ...editing.data, name: e.target.value } })}
              />
            </div>
            <div>
              <Label>Môn dạy</Label>
              <div className="mt-1 grid grid-cols-2 gap-2 rounded-md border p-2 md:grid-cols-3">
                {subjects.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={editing.data.subjectIds.includes(s.id)}
                      onCheckedChange={() => toggleSubject(s.id)}
                    />
                    <span className="truncate">{s.shortName}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Điểm trường chính</Label>
                <Select
                  value={editing.data.primarySchoolId}
                  onValueChange={(v) => setEditing({ ...editing, data: { ...editing.data, primarySchoolId: v } })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {schools.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Điểm trường phụ (tùy chọn)</Label>
                <Select
                  value={editing.data.secondarySchoolId || "none"}
                  onValueChange={(v) =>
                    setEditing({
                      ...editing,
                      data: { ...editing.data, secondarySchoolId: v === "none" ? null : v },
                    })
                  }
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— Không —</SelectItem>
                    {schools
                      .filter((s) => s.id !== editing.data.primarySchoolId)
                      .map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Buổi sáng nghỉ trong tuần</Label>
              <Select
                value={String(editing.data.morningOffDay)}
                onValueChange={(v) => setEditing({ ...editing, data: { ...editing.data, morningOffDay: Number(v) } })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DAY_NAMES.map((d, i) => (
                    <SelectItem key={i} value={String(i + 1)}>Sáng {d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button onClick={save}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}