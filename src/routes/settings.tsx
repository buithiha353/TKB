import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/lib/timetable/store";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Download, Upload, RotateCcw, Sparkles, RefreshCw } from "lucide-react";
import { SetupWizard } from "@/components/SetupWizard";

const isDesktopApp = import.meta.env.VITE_DESKTOP === "true";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Cài đặt – TKB THCS" }] }),
});

function SettingsPage() {
  const { settings, setSettings, exportData, importData, resetAll } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  const doExport = async () => {
    const data = exportData();
    const suggestedName = `tkb-${new Date().toISOString().slice(0, 10)}.json`;

    if (isDesktopApp) {
      try {
        const { save } = await import("@tauri-apps/plugin-dialog");
        const { writeTextFile } = await import("@tauri-apps/plugin-fs");
        const path = await save({
          defaultPath: suggestedName,
          filters: [{ name: "JSON", extensions: ["json"] }],
        });

        if (!path) return;
        await writeTextFile(path, data);
        toast.success("Đã xuất file JSON");
      } catch (error) {
        console.error(error);
        toast.error("Không thể xuất file JSON");
      }
      return;
    }

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = suggestedName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const doDesktopImport = async () => {
    try {
      const { open } = await import("@tauri-apps/plugin-dialog");
      const { readTextFile } = await import("@tauri-apps/plugin-fs");
      const path = await open({
        multiple: false,
        filters: [{ name: "JSON", extensions: ["json"] }],
      });

      if (!path || Array.isArray(path)) return;
      const text = await readTextFile(path);
      if (importData(text)) toast.success("Đã nhập dữ liệu");
      else toast.error("File không hợp lệ");
    } catch (error) {
      console.error(error);
      toast.error("Không thể nhập file JSON");
    }
  };

  const doImport = async (file: File) => {
    const text = await file.text();
    if (importData(text)) toast.success("Đã nhập dữ liệu");
    else toast.error("File không hợp lệ");
  };

  const checkForUpdates = async () => {
    setCheckingUpdate(true);
    try {
      const { check } = await import("@tauri-apps/plugin-updater");
      const update = await check();

      if (!update) {
        toast.success("Đang dùng phiên bản mới nhất");
        return;
      }

      const shouldInstall = confirm(`Có bản cập nhật ${update.version}. Tải và cài đặt ngay?`);
      if (!shouldInstall) return;

      toast.info("Đang tải bản cập nhật...");
      await update.downloadAndInstall();
      toast.success("Đã cài cập nhật, ứng dụng sẽ khởi động lại");

      const { relaunch } = await import("@tauri-apps/plugin-process");
      await relaunch();
    } catch (error) {
      console.error(error);
      toast.error("Không thể kiểm tra cập nhật");
    } finally {
      setCheckingUpdate(false);
    }
  };

  return (
    <AppLayout>
      <SetupWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Cài đặt</h1>
          <Button onClick={() => setWizardOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4" /> Chạy lại thiết lập quy tắc
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Thông tin chung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Tên trường</Label>
              <Input
                value={settings.schoolName}
                onChange={(e) => setSettings({ schoolName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Số tiết buổi sáng</Label>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  value={settings.morningPeriods === 0 ? "" : settings.morningPeriods}
                  onChange={(e) => setSettings({ morningPeriods: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Số tiết buổi chiều</Label>
                <Input
                  type="number"
                  min={0}
                  max={6}
                  value={settings.afternoonPeriods === 0 ? "" : settings.afternoonPeriods}
                  onChange={(e) => setSettings({ afternoonPeriods: Number(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quy tắc phân bổ tiết học</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Ưu tiên xếp kín buổi sáng</Label>
                <p className="text-xs text-muted-foreground">
                  Xếp đủ số tiết mục tiêu buổi sáng trước khi xếp sang chiều
                </p>
              </div>
              <Switch
                checked={settings.fillMorningFirst}
                onCheckedChange={(v) => setSettings({ fillMorningFirst: v })}
              />
            </div>
            {settings.fillMorningFirst && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Số tiết mục tiêu buổi sáng</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={settings.targetMorningPeriods === 0 ? "" : settings.targetMorningPeriods}
                    onChange={(e) => setSettings({ targetMorningPeriods: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Tối đa tiết sáng thứ 2</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={
                      settings.maxMondayMorningPeriods === 0 ? "" : settings.maxMondayMorningPeriods
                    }
                    onChange={(e) =>
                      setSettings({ maxMondayMorningPeriods: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sao lưu & Khôi phục</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Dữ liệu lưu trong trình duyệt của bạn. Xuất ra file JSON để sao lưu hoặc chia sẻ.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={doExport} variant="outline">
                <Download className="mr-2 h-4 w-4" /> Xuất JSON
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (isDesktopApp) void doDesktopImport();
                  else fileRef.current?.click();
                }}
              >
                <Upload className="mr-2 h-4 w-4" /> Nhập JSON
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])}
              />
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm("Đặt lại toàn bộ dữ liệu về mẫu ban đầu?")) {
                    resetAll();
                    toast.success("Đã đặt lại");
                  }
                }}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Đặt lại mẫu
              </Button>
            </div>
          </CardContent>
        </Card>

        {isDesktopApp && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cập nhật ứng dụng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Kiểm tra bản desktop mới và cài đặt tự động khi có gói phát hành.
              </p>
              <Button onClick={checkForUpdates} disabled={checkingUpdate} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                {checkingUpdate ? "Đang kiểm tra..." : "Kiểm tra cập nhật"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
