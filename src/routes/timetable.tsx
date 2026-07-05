import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/timetable/store";
import { DAY_NAMES, slotKey } from "@/lib/timetable/types";
import type { Lesson, Session, Subject, Teacher, SchoolClass } from "@/lib/timetable/types";
import { generateSchedule, checkConflict } from "@/lib/timetable/scheduler";
import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Sparkles, Trash2, Printer, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/timetable")({
  component: TimetablePage,
  head: () => ({ meta: [{ title: "Thời khóa biểu – TKB THCS" }] }),
});

type ViewMode = "class" | "teacher";

function TimetablePage() {
  const store = useStore();
  const {
    settings,
    classes,
    subjects,
    teachers,
    assignments,
    timetable,
    setTimetable,
    clearTimetable,
  } = store;

  const [mode, setMode] = useState<ViewMode>("class");
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || "");
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]?.id || "");

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleGenerate = () => {
    const res = generateSchedule({
      settings,
      classes,
      subjects,
      teachers,
      assignments,
    });
    setTimetable(res.timetable);
    if (res.unplaced.length === 0)
      toast.success(`Đã xếp ${res.totalPlaced}/${res.totalNeeded} tiết`);
    else
      toast.warning(
        `Xếp ${res.totalPlaced}/${res.totalNeeded}. Còn thiếu ${res.totalNeeded - res.totalPlaced} tiết.`,
      );
  };

  const periodsList = useMemo(() => {
    const list: { session: Session; period: number; label: string }[] = [];
    for (let p = 1; p <= settings.morningPeriods; p++)
      list.push({ session: "AM", period: p, label: `Sáng ${p}` });
    for (let p = 1; p <= settings.afternoonPeriods; p++)
      list.push({ session: "PM", period: p, label: `Chiều ${p}` });
    return list;
  }, [settings]);

  const subjectMap = useMemo(() => new Map(subjects.map((s) => [s.id, s])), [subjects]);
  const teacherMap = useMemo(() => new Map(teachers.map((t) => [t.id, t])), [teachers]);
  const classMap = useMemo(() => new Map(classes.map((c) => [c.id, c])), [classes]);

  // Build view cells
  interface Cell {
    day: number;
    session: Session;
    period: number;
    lesson: Lesson | null;
    droppableId: string;
  }

  const cells = useMemo(() => {
    const out: Cell[][] = [];
    for (const p of periodsList) {
      const row: Cell[] = [];
      for (let d = 1; d <= settings.days; d++) {
        let lesson: Lesson | null = null;
        let droppableId = "";
        if (mode === "class") {
          const k = slotKey(d, p.session, p.period, selectedClass);
          lesson = timetable[k] || null;
          droppableId = `cls|${selectedClass}|${d}|${p.session}|${p.period}`;
        } else {
          // find any lesson for this teacher at this slot
          for (const l of Object.values(timetable)) {
            if (
              l.teacherId === selectedTeacher &&
              l.day === d &&
              l.session === p.session &&
              l.period === p.period
            ) {
              lesson = l;
              break;
            }
          }
          droppableId = `tch|${selectedTeacher}|${d}|${p.session}|${p.period}`;
        }
        row.push({ day: d, session: p.session, period: p.period, lesson, droppableId });
      }
      out.push(row);
    }
    return out;
  }, [mode, selectedClass, selectedTeacher, periodsList, timetable, settings.days]);

  const handleDragEnd = (e: DragEndEvent) => {
    if (mode !== "class") return;
    const from = e.active.id as string; // format: `cell|classId|d|sess|p`
    const to = e.over?.id as string | undefined;
    if (!to || from === to) return;
    const [, fClass, fD, fS, fP] = from.split("|");
    const [, tClass, tD, tS, tP] = to.split("|");
    if (fClass !== tClass) return;
    const fromKey = slotKey(Number(fD), fS as Session, Number(fP), fClass);
    const toKey = slotKey(Number(tD), tS as Session, Number(tP), tClass);
    const src = timetable[fromKey];
    const dst = timetable[toKey];
    if (!src) return;

    const ctx = { settings, classes, subjects, teachers, assignments };
    const target = { day: Number(tD), session: tS as Session, period: Number(tP), classId: tClass };
    const err = checkConflict(timetable, ctx, src, target);
    if (err) {
      toast.error(err);
      return;
    }
    if (dst) {
      const err2 = checkConflict(
        timetable,
        ctx,
        dst,
        { day: Number(fD), session: fS as Session, period: Number(fP), classId: fClass },
      );
      if (err2) {
        toast.error("Không thể hoán đổi: " + err2);
        return;
      }
    }

    const next = { ...timetable };
    delete next[fromKey];
    delete next[toKey];
    next[toKey] = { ...src, day: Number(tD), session: tS as Session, period: Number(tP), classId: tClass };
    if (dst) {
      next[fromKey] = { ...dst, day: Number(fD), session: fS as Session, period: Number(fP), classId: fClass };
    }
    setTimetable(next);
  };

  // Analysis: number of periods scheduled vs required for currently viewed class
  const classSummary = useMemo(() => {
    if (mode !== "class") return null;
    const need = assignments.filter((a) => a.classId === selectedClass);
    return need.map((a) => {
      const placed = Object.values(timetable).filter(
        (l) => l.classId === selectedClass && l.subjectId === a.subjectId && l.teacherId === a.teacherId,
      ).length;
      return {
        subject: subjectMap.get(a.subjectId)!,
        teacher: teacherMap.get(a.teacherId),
        need: a.periods,
        placed,
      };
    });
  }, [mode, selectedClass, assignments, timetable, subjectMap, teacherMap]);

  const currentTitle =
    mode === "class"
      ? `Lớp ${classMap.get(selectedClass)?.name || ""}`
      : `GV ${teacherMap.get(selectedTeacher)?.name || ""}`;

  return (
    <AppLayout>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Thời khóa biểu</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kéo-thả ô để hoán đổi tiết (chỉ ở chế độ xem theo lớp).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleGenerate}>
            <Sparkles className="mr-2 h-4 w-4" /> Sinh TKB tự động
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> In
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (confirm("Xóa toàn bộ TKB?")) clearTimetable();
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Xóa TKB
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 print:hidden">
        <Tabs value={mode} onValueChange={(v) => setMode(v as ViewMode)}>
          <TabsList>
            <TabsTrigger value="class">Theo lớp</TabsTrigger>
            <TabsTrigger value="teacher">Theo GV</TabsTrigger>
          </TabsList>
        </Tabs>
        {mode === "class" ? (
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-56"><SelectValue placeholder="Chọn lớp" /></SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-56"><SelectValue placeholder="Chọn GV" /></SelectTrigger>
            <SelectContent>
              {teachers.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="hidden print:mb-3 print:block">
        <h2 className="text-lg font-bold">{settings.schoolName} — TKB {currentTitle}</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="w-24 border-b border-r p-2 text-left text-xs font-medium uppercase text-muted-foreground">Tiết</th>
                    {DAY_NAMES.slice(0, settings.days).map((d) => (
                      <th key={d} className="border-b border-r p-2 text-xs font-medium uppercase text-muted-foreground">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cells.map((row, ri) => {
                    const p = periodsList[ri];
                    const isFirstAfternoon = p.session === "PM" && p.period === 1;
                    return (
                      <tr key={ri} className={cn(isFirstAfternoon && "border-t-4 border-t-primary/30")}>
                        <td className={cn(
                          "border-b border-r p-2 text-xs font-medium",
                          p.session === "AM" ? "bg-amber-50 dark:bg-amber-950/20" : "bg-sky-50 dark:bg-sky-950/20"
                        )}>
                          {p.label}
                        </td>
                        {row.map((cell) => (
                          <TimetableCell
                            key={`${cell.day}-${cell.session}-${cell.period}`}
                            cell={cell}
                            mode={mode}
                            subjectMap={subjectMap}
                            teacherMap={teacherMap}
                            classMap={classMap}
                          />
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </DndContext>
        </CardContent>
      </Card>

      {classSummary && (
        <Card className="mt-4 print:hidden">
          <CardContent className="p-4">
            <h3 className="mb-3 text-sm font-semibold">Tiến độ xếp môn cho lớp {classMap.get(selectedClass)?.name}</h3>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {classSummary.map((r) => {
                const ok = r.placed === r.need;
                const over = r.placed > r.need;
                return (
                  <div key={r.subject.id} className={cn(
                    "flex items-center justify-between rounded-md border p-2 text-sm",
                    !ok && "border-amber-400 bg-amber-50 dark:bg-amber-950/20"
                  )}>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{r.subject.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{r.teacher?.name || "—"}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {!ok && (
                        <div title={over ? "Thừa tiết (đã xếp vượt quá số tiết được phân công)" : "Thiếu tiết (chưa xếp đủ số tiết được phân công)"}>
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                      )}
                      <span className={cn("font-mono", over && "text-destructive")} title="Số tiết đã xếp / Tổng số tiết phân công">
                        {r.placed}/{r.need}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </AppLayout>
  );
}

function TimetableCell({
  cell,
  mode,
  subjectMap,
  teacherMap,
  classMap,
}: {
  cell: {
    day: number;
    session: Session;
    period: number;
    lesson: Lesson | null;
    droppableId: string;
  };
  mode: ViewMode;
  subjectMap: Map<string, Subject>;
  teacherMap: Map<string, Teacher>;
  classMap: Map<string, SchoolClass>;
}) {
  const { setNodeRef: dropRef, isOver } = useDroppable({ id: cell.droppableId });
  const dragId = cell.lesson
    ? `cell|${cell.lesson.classId}|${cell.day}|${cell.session}|${cell.period}`
    : "";
  const {
    attributes,
    listeners,
    setNodeRef: dragRef,
    isDragging,
  } = useDraggable({ id: dragId || `empty-${cell.droppableId}`, disabled: !cell.lesson || mode !== "class" });

  const l = cell.lesson;
  const sub = l ? subjectMap.get(l.subjectId) : null;
  const teacher = l ? teacherMap.get(l.teacherId) : null;
  const cls = l ? classMap.get(l.classId) : null;

  return (
    <td
      ref={dropRef}
      className={cn(
        "border-b border-r p-1 align-top transition-colors",
        isOver && "bg-primary/10",
      )}
      style={{ minWidth: 110 }}
    >
      {l ? (
        <div
          ref={dragRef}
          {...attributes}
          {...listeners}
          className={cn(
            "rounded-md border bg-card px-2 py-1.5 text-xs shadow-sm",
            mode === "class" && "cursor-grab active:cursor-grabbing",
            isDragging && "opacity-40",
            "hover:border-primary",
          )}
          style={{
            borderLeftWidth: 3,
            borderLeftColor: subjectColor(l.subjectId),
          }}
        >
          <div className="font-semibold leading-tight">{sub?.shortName}</div>
          <div className="mt-0.5 truncate text-[10px] text-muted-foreground">
            {mode === "class" ? teacher?.name : cls?.name}
          </div>
        </div>
      ) : (
        <div className="h-full min-h-[46px]" />
      )}
    </td>
  );
}

// deterministic color per subject id (hue)
function subjectColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return `hsl(${h}, 65%, 55%)`;
}