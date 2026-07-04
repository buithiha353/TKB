import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/lib/timetable/store";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/subjects")({
  component: SubjectsPage,
  head: () => ({ meta: [{ title: "Môn học – TKB THCS" }] }),
});

function SubjectsPage() {
  const { subjects, addSubject, updateSubject, removeSubject } = useStore();
  const [nw, setNw] = useState({ name: "", shortName: "", defaultPeriods: 2, canDouble: false });

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Môn học</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Danh sách môn theo chương trình GDPT 2018 cấp THCS. Có thể chỉnh số tiết/tuần.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-2 border-b bg-muted/50 px-4 py-2 text-xs font-medium uppercase text-muted-foreground">
            <div className="col-span-4">Tên môn</div>
            <div className="col-span-3">Viết tắt</div>
            <div className="col-span-2">Tiết/tuần</div>
            <div className="col-span-2">Ghép đôi</div>
            <div className="col-span-1"></div>
          </div>
          {subjects.map((s) => (
            <div key={s.id} className="grid grid-cols-12 items-center gap-2 border-b px-4 py-2">
              <Input
                className="col-span-4 h-8"
                value={s.name}
                onChange={(e) => updateSubject(s.id, { name: e.target.value })}
              />
              <Input
                className="col-span-3 h-8"
                value={s.shortName}
                onChange={(e) => updateSubject(s.id, { shortName: e.target.value })}
              />
              <Input
                className="col-span-2 h-8"
                type="number"
                min={0}
                max={10}
                value={s.defaultPeriods}
                onChange={(e) =>
                  updateSubject(s.id, { defaultPeriods: Math.max(0, Number(e.target.value)) })
                }
              />
              <div className="col-span-2">
                <Switch
                  checked={s.canDouble}
                  onCheckedChange={(v) => updateSubject(s.id, { canDouble: v })}
                />
              </div>
              <div className="col-span-1 flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => removeSubject(s.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Thêm môn mới</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-5">
          <div className="md:col-span-2">
            <Label>Tên môn</Label>
            <Input value={nw.name} onChange={(e) => setNw({ ...nw, name: e.target.value })} />
          </div>
          <div>
            <Label>Viết tắt</Label>
            <Input value={nw.shortName} onChange={(e) => setNw({ ...nw, shortName: e.target.value })} />
          </div>
          <div>
            <Label>Tiết/tuần</Label>
            <Input
              type="number"
              value={nw.defaultPeriods}
              onChange={(e) => setNw({ ...nw, defaultPeriods: Number(e.target.value) })}
            />
          </div>
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={() => {
                if (!nw.name.trim()) { toast.error("Nhập tên môn"); return; }
                addSubject({ ...nw, name: nw.name.trim(), shortName: nw.shortName.trim() || nw.name.trim() });
                setNw({ name: "", shortName: "", defaultPeriods: 2, canDouble: false });
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Thêm
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}