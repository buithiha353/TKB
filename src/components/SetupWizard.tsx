import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/lib/timetable/store";
import { seedSubjects } from "@/lib/timetable/seed";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  School as SchoolIcon,
  Calendar,
  Clock,
  Shield,
  Database,
} from "lucide-react";
import { toast } from "sonner";

interface Draft {
  schoolName: string;
  sites: 1 | 2;
  days: number;
  morningPeriods: number;
  afternoonPeriods: number;
  ruleTeacherMorningOff: boolean;
  ruleSingleSitePerSession: boolean;
  ruleAllowDouble: boolean;
  ruleMaxSameSubjectPerDay: 1 | 2;
  keepSample: boolean;
}

const STEPS = [
  { key: "name", label: "Tên trường", icon: SchoolIcon },
  { key: "sites", label: "Điểm trường", icon: SchoolIcon },
  { key: "week", label: "Tuần học", icon: Calendar },
  { key: "periods", label: "Số tiết/buổi", icon: Clock },
  { key: "rules", label: "Ràng buộc", icon: Shield },
  { key: "data", label: "Dữ liệu", icon: Database },
] as const;

export function SetupWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const {
    settings,
    setSettings,
    setOnboarded,
    schools,
    startFresh,
    subjects,
    updateSubject,
    addSubject,
  } = useStore();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({
    schoolName: settings.schoolName,
    sites: (settings.sites ?? 2) as 1 | 2,
    days: settings.days || 5,
    morningPeriods: settings.morningPeriods || 5,
    afternoonPeriods: settings.afternoonPeriods ?? 3,
    ruleTeacherMorningOff: settings.ruleTeacherMorningOff ?? true,
    ruleSingleSitePerSession: settings.ruleSingleSitePerSession ?? true,
    ruleAllowDouble: settings.ruleAllowDouble ?? true,
    ruleMaxSameSubjectPerDay: (settings.ruleMaxSameSubjectPerDay ?? 2) as 1 | 2,
    keepSample: true,
  });

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  const update = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const finish = () => {
    setSettings({
      schoolName: draft.schoolName.trim() || "Trường THCS",
      sites: draft.sites,
      days: draft.days,
      morningPeriods: draft.morningPeriods,
      afternoonPeriods: draft.afternoonPeriods,
      ruleTeacherMorningOff: draft.ruleTeacherMorningOff,
      ruleSingleSitePerSession: draft.ruleSingleSitePerSession,
      ruleAllowDouble: draft.ruleAllowDouble,
      ruleMaxSameSubjectPerDay: draft.ruleMaxSameSubjectPerDay,
    });

    // Áp dụng canDouble theo lựa chọn (Văn/Toán được xếp cặp nếu bật)
    subjects.forEach((s) => {
      const isVanToan = ["Toán", "Ngữ văn"].includes(s.name);
      updateSubject(s.id, {
        canDouble: draft.ruleAllowDouble ? isVanToan : false,
      });
    });

    if (!draft.keepSample) {
      startFresh();
      // Vẫn giữ danh mục môn chuẩn để user chỉ cần thêm GV & lớp
      if (subjects.length === 0) seedSubjects.forEach((s) => addSubject(s));
    } else if (draft.sites === 1 && schools.length > 1) {
      // Nếu user chọn 1 điểm trường nhưng dữ liệu mẫu đang có >1 điểm trường -> Xoá bớt, gom về 1
      const mainSchoolId = schools[0].id;
      useStore.setState((st) => ({
        schools: [st.schools[0]],
        classes: st.classes.map((c) => ({ ...c, schoolId: mainSchoolId })),
        teachers: st.teachers.map((t) => ({ ...t, schoolIds: [mainSchoolId] })),
      }));
    }

    setOnboarded(true);
    toast.success("Đã thiết lập xong quy tắc TKB");
    onClose();
  };

  const canNext = () => {
    if (step === 0) return draft.schoolName.trim().length > 0;
    return true;
  };

  const StepIcon = STEPS[step].icon;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>Thiết lập quy tắc thời khóa biểu</DialogTitle>
              <DialogDescription>
                Bước {step + 1}/{STEPS.length} · {STEPS[step].label}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* progress dots */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>

        <div className="min-h-[240px] py-2">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <StepIcon className="h-4 w-4" />
            {STEPS[step].label}
          </div>

          {step === 0 && (
            <div className="space-y-2">
              <Label htmlFor="sn">Tên nhà trường</Label>
              <Input
                id="sn"
                autoFocus
                value={draft.schoolName}
                onChange={(e) => update("schoolName", e.target.value)}
                placeholder="VD: Trường THCS Nguyễn Trãi"
              />
              <p className="text-xs text-muted-foreground">Tên này sẽ hiển thị ở đầu bản in TKB.</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <Label>Nhà trường có bao nhiêu điểm trường?</Label>
              <div className="grid grid-cols-2 gap-3">
                {([1, 2] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update("sites", n)}
                    className={cn(
                      "rounded-lg border-2 p-4 text-left transition-colors",
                      draft.sites === n
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/40",
                    )}
                  >
                    <div className="text-lg font-semibold">{n} điểm trường</div>
                    <div className="text-xs text-muted-foreground">
                      {n === 1 ? "Chỉ 1 cơ sở duy nhất" : "Có 2 cơ sở, GV có thể di chuyển"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <Label>Số ngày học trong tuần</Label>
              <div className="grid grid-cols-2 gap-3">
                {[5, 6].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update("days", n)}
                    className={cn(
                      "rounded-lg border-2 p-4 text-left transition-colors",
                      draft.days === n
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/40",
                    )}
                  >
                    <div className="text-lg font-semibold">{n} ngày</div>
                    <div className="text-xs text-muted-foreground">
                      {n === 5 ? "Thứ 2 → Thứ 6" : "Thứ 2 → Thứ 7"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Buổi sáng — số tiết</Label>
                <Select
                  value={String(draft.morningPeriods)}
                  onValueChange={(v) => update("morningPeriods", Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} tiết
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Buổi chiều — số tiết</Label>
                <Select
                  value={String(draft.afternoonPeriods)}
                  onValueChange={(v) => update("afternoonPeriods", Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 2, 3, 4].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n === 0 ? "Không học chiều" : `${n} tiết`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="col-span-2 text-xs text-muted-foreground">
                Có thể điều chỉnh sau ở trang Cài đặt.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <RuleRow
                title="Mỗi GV được nghỉ 1 buổi sáng/tuần"
                desc="Bộ xếp lịch sẽ tránh các buổi sáng đã đánh dấu nghỉ."
                checked={draft.ruleTeacherMorningOff}
                onCheck={(v) => update("ruleTeacherMorningOff", v)}
              />
              <RuleRow
                title="GV chỉ dạy tại 1 điểm trường trong cùng 1 buổi"
                desc="Tránh phải di chuyển giữa 2 điểm trường giữa buổi."
                checked={draft.ruleSingleSitePerSession}
                onCheck={(v) => update("ruleSingleSitePerSession", v)}
                disabled={draft.sites === 1}
              />
              <RuleRow
                title="Cho phép xếp 2 tiết liên tiếp cùng môn (Văn/Toán)"
                desc="Các môn khác vẫn không được xếp liên tiếp."
                checked={draft.ruleAllowDouble}
                onCheck={(v) => update("ruleAllowDouble", v)}
              />
              <div className="space-y-2">
                <Label>Tối đa tiết cùng môn / lớp / ngày</Label>
                <Select
                  value={String(draft.ruleMaxSameSubjectPerDay)}
                  onValueChange={(v) => update("ruleMaxSameSubjectPerDay", Number(v) as 1 | 2)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 tiết</SelectItem>
                    <SelectItem value="2">2 tiết</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <Label>Bắt đầu với dữ liệu nào?</Label>
              <div className="grid gap-3">
                {[
                  {
                    v: true,
                    title: "Dùng dữ liệu mẫu (khối 6-9)",
                    desc: "Có sẵn lớp, GV, môn chuẩn THCS để thử ngay.",
                  },
                  {
                    v: false,
                    title: "Bắt đầu với dữ liệu trống",
                    desc: "Chỉ giữ danh mục môn chuẩn. Bạn tự nhập lớp & GV.",
                  },
                ].map((opt) => (
                  <button
                    key={String(opt.v)}
                    type="button"
                    onClick={() => update("keepSample", opt.v)}
                    className={cn(
                      "rounded-lg border-2 p-4 text-left transition-colors",
                      draft.keepSample === opt.v
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/40",
                    )}
                  >
                    <div className="font-semibold">{opt.title}</div>
                    <div className="text-xs text-muted-foreground">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-row justify-between sm:justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Quay lại
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
              Tiếp tục <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={finish}>
              <Check className="mr-1 h-4 w-4" /> Hoàn tất
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RuleRow({
  title,
  desc,
  checked,
  onCheck,
  disabled,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onCheck: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 rounded-lg border p-3",
        disabled && "opacity-50",
      )}
    >
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheck} disabled={disabled} />
    </div>
  );
}
