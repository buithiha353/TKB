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
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/schools")({
  component: SchoolsPage,
  head: () => ({
    meta: [{ title: "Điểm trường & Lớp học – TKB THCS" }],
  }),
});

function SchoolsPage() {
  const {
    schools,
    classes,
    addSchool,
    updateSchool,
    removeSchool,
    addClass,
    updateClass,
    removeClass,
  } = useStore();

  const [newSchool, setNewSchool] = useState("");
  const [newClass, setNewClass] = useState({
    name: "",
    grade: 6,
    schoolId: schools[0]?.id || "",
  });

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Điểm trường & Lớp học</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quản lý các điểm trường và các lớp trực thuộc.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Điểm trường</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {schools.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <Input
                  value={s.name}
                  onChange={(e) => updateSchool(s.id, { name: e.target.value })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (classes.some((c) => c.schoolId === s.id)) {
                      toast.error("Điểm trường vẫn còn lớp, hãy xóa lớp trước");
                      return;
                    }
                    removeSchool(s.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2 border-t pt-3">
              <Input
                placeholder="Tên điểm trường mới"
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (!newSchool.trim()) return;
                  addSchool({ name: newSchool.trim() });
                  setNewSchool("");
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thêm lớp mới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Tên lớp</Label>
              <Input
                placeholder="VD: 6A"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Khối</Label>
                <Select
                  value={String(newClass.grade)}
                  onValueChange={(v) => setNewClass({ ...newClass, grade: Number(v) })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[6, 7, 8, 9].map((g) => (
                      <SelectItem key={g} value={String(g)}>Khối {g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Điểm trường</Label>
                <Select
                  value={newClass.schoolId}
                  onValueChange={(v) => setNewClass({ ...newClass, schoolId: v })}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {schools.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                if (!newClass.name.trim() || !newClass.schoolId) {
                  toast.error("Điền đầy đủ thông tin");
                  return;
                }
                addClass({
                  name: newClass.name.trim(),
                  grade: newClass.grade as 6 | 7 | 8 | 9,
                  schoolId: newClass.schoolId,
                });
                setNewClass({ ...newClass, name: "" });
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Thêm lớp
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Danh sách lớp ({classes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => {
              const school = schools.find((s) => s.id === c.schoolId);
              return (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-lg border bg-card p-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        Khối {c.grade}
                      </span>
                      <Input
                        value={c.name}
                        onChange={(e) => updateClass(c.id, { name: e.target.value })}
                        className="h-7 w-20"
                      />
                    </div>
                    <div className="mt-1 truncate text-xs text-muted-foreground">
                      {school?.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Select
                      value={c.schoolId}
                      onValueChange={(v) => updateClass(c.id, { schoolId: v })}
                    >
                      <SelectTrigger className="h-8 w-24 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {schools.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeClass(c.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}