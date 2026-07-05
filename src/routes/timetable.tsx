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
import { generateSchedule, checkConflict, getAllConflicts } from "@/lib/timetable/scheduler";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Trash2, Printer, AlertTriangle, CheckCircle } from "lucide-react";
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
    toast.success("Đã hoàn tất quá trình sinh TKB!");
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
    const err2 = dst
      ? checkConflict(timetable, ctx, dst, {
          day: Number(fD),
          session: fS as Session,
          period: Number(fP),
          classId: fClass,
        })
      : null;

    const next = { ...timetable };
    delete next[fromKey];
    delete next[toKey];
    next[toKey] = {
      ...src,
      day: Number(tD),
      session: tS as Session,
      period: Number(tP),
      classId: tClass,
    };
    if (dst) {
      next[fromKey] = {
        ...dst,
        day: Number(fD),
        session: fS as Session,
        period: Number(fP),
        classId: fClass,
      };
    }
    setTimetable(next);
  };

  // Analysis: number of periods scheduled vs required for currently viewed class
  const classSummary = useMemo(() => {
    if (mode !== "class") return null;
    const need = assignments.filter((a) => a.classId === selectedClass);
    return need.map((a) => {
      const placedMorning = Object.values(timetable).filter(
        (l) =>
          l.classId === selectedClass &&
          l.subjectId === a.subjectId &&
          l.teacherId === a.teacherId &&
          l.session === "AM",
      ).length;
      const placedAfternoon = Object.values(timetable).filter(
        (l) =>
          l.classId === selectedClass &&
          l.subjectId === a.subjectId &&
          l.teacherId === a.teacherId &&
          l.session === "PM",
      ).length;
      return {
        subject: subjectMap.get(a.subjectId)!,
        teacher: teacherMap.get(a.teacherId),
        needMorning: a.morningPeriods || 0,
        needAfternoon: a.afternoonPeriods || 0,
        placedMorning,
        placedAfternoon,
      };
    });
  }, [mode, selectedClass, assignments, timetable, subjectMap, teacherMap]);

  const globalSummary = useMemo(() => {
    let totalNeeded = 0;
    const missingByClass = new Map<
      string,
      { subject: string; teacher: string; missingMorning: number; missingAfternoon: number }[]
    >();

    for (const a of assignments) {
      const needMorning = a.morningPeriods || 0;
      const needAfternoon = a.afternoonPeriods || 0;
      totalNeeded += needMorning + needAfternoon;

      const placedMorning = Object.values(timetable).filter(
        (l) =>
          l.classId === a.classId &&
          l.subjectId === a.subjectId &&
          l.teacherId === a.teacherId &&
          l.session === "AM",
      ).length;
      const placedAfternoon = Object.values(timetable).filter(
        (l) =>
          l.classId === a.classId &&
          l.subjectId === a.subjectId &&
          l.teacherId === a.teacherId &&
          l.session === "PM",
      ).length;

      const missingMorning = Math.max(0, needMorning - placedMorning);
      const missingAfternoon = Math.max(0, needAfternoon - placedAfternoon);

      if (missingMorning > 0 || missingAfternoon > 0) {
        if (!missingByClass.has(a.classId)) {
          missingByClass.set(a.classId, []);
        }
        missingByClass.get(a.classId)!.push({
          subject: subjectMap.get(a.subjectId)?.name || "",
          teacher: teacherMap.get(a.teacherId)?.name || "",
          missingMorning,
          missingAfternoon,
        });
      }
    }

    let totalMissing = 0;
    for (const list of missingByClass.values()) {
      for (const item of list) {
        totalMissing += item.missingMorning + item.missingAfternoon;
      }
    }

    return {
      totalNeeded,
      totalPlaced: totalNeeded - totalMissing,
      totalMissing,
      missingByClass: Array.from(missingByClass.entries())
        .map(([classId, items]) => ({
          className: classMap.get(classId)?.name || "",
          items,
        }))
        .sort((a, b) => a.className.localeCompare(b.className)),
    };
  }, [assignments, timetable, classMap, subjectMap, teacherMap]);

  const globalConflicts = useMemo(() => {
    return getAllConflicts(timetable, { settings, classes, subjects, teachers, assignments });
  }, [timetable, settings, classes, subjects, teachers, assignments]);

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
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Chọn lớp" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Chọn GV" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="hidden print:mb-3 print:block">
        <h2 className="text-lg font-bold">
          {settings.schoolName} — TKB {currentTitle}
        </h2>
      </div>

      {Object.keys(timetable).length > 0 && globalConflicts.length > 0 && (
        <Alert
          variant="destructive"
          className="mb-4 print:hidden border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200"
        >
          <AlertTriangle className="h-4 w-4 !text-red-600 dark:!text-red-500" />
          <AlertTitle className="font-semibold text-red-800 dark:text-red-300">
            Phát hiện {globalConflicts.length} lỗi vi phạm quy tắc (do xếp thủ công):
          </AlertTitle>
          <AlertDescription className="mt-2 text-sm text-red-800 dark:text-red-300 max-h-48 overflow-y-auto">
            <ul className="list-disc pl-5 space-y-1">
              {globalConflicts.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {Object.keys(timetable).length > 0 && globalSummary.totalMissing > 0 && (
        <Alert
          variant="destructive"
          className="mb-4 print:hidden border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200"
        >
          <AlertTriangle className="h-4 w-4 !text-amber-600 dark:!text-amber-500" />
          <AlertTitle className="font-semibold text-amber-800 dark:text-amber-300">
            Hệ thống không thể xếp đủ tiết ({globalSummary.totalPlaced}/{globalSummary.totalNeeded}
            ). Còn thiếu {globalSummary.totalMissing} tiết:
          </AlertTitle>
          <AlertDescription className="mt-2 text-sm text-amber-800 dark:text-amber-300 max-h-48 overflow-y-auto">
            <ul className="list-disc pl-5 space-y-1">
              {globalSummary.missingByClass.map((cls) => (
                <li key={cls.className}>
                  <strong className="font-semibold">Lớp {cls.className}:</strong>{" "}
                  {cls.items
                    .map((item) => {
                      const parts = [];
                      if (item.missingMorning > 0) parts.push(`${item.missingMorning} Sáng`);
                      if (item.missingAfternoon > 0) parts.push(`${item.missingAfternoon} Chiều`);
                      return `${item.subject} (Thiếu ${parts.join(", ")})`;
                    })
                    .join(" • ")}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {Object.keys(timetable).length > 0 && globalSummary.totalMissing === 0 && (
        <Alert className="mb-4 print:hidden border-green-500 bg-green-50 dark:bg-green-950/40 text-green-900 dark:text-green-200">
          <CheckCircle className="h-4 w-4 !text-green-600 dark:!text-green-500" />
          <AlertTitle className="font-semibold text-green-800 dark:text-green-300">
            Thành công! Đã xếp đủ {globalSummary.totalPlaced}/{globalSummary.totalNeeded} tiết.
          </AlertTitle>
        </Alert>
      )}

      <Card>
        <CardContent className="p-0">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="w-24 border-b border-r p-2 text-left text-xs font-medium uppercase text-muted-foreground">
                      Tiết
                    </th>
                    {DAY_NAMES.slice(0, settings.days).map((d) => (
                      <th
                        key={d}
                        className="border-b border-r p-2 text-xs font-medium uppercase text-muted-foreground"
                      >
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cells.map((row, ri) => {
                    const p = periodsList[ri];
                    const isFirstAfternoon = p.session === "PM" && p.period === 1;
                    return (
                      <tr
                        key={ri}
                        className={cn(isFirstAfternoon && "border-t-4 border-t-primary/30")}
                      >
                        <td
                          className={cn(
                            "border-b border-r p-2 text-xs font-medium",
                            p.session === "AM"
                              ? "bg-amber-50 dark:bg-amber-950/20"
                              : "bg-sky-50 dark:bg-sky-950/20",
                          )}
                        >
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
            <h3 className="mb-3 text-sm font-semibold">
              Tiến độ xếp môn cho lớp {classMap.get(selectedClass)?.name}
            </h3>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {classSummary.map((r) => {
                const okMorning = r.placedMorning === r.needMorning;
                const okAfternoon = r.placedAfternoon === r.needAfternoon;
                const ok = okMorning && okAfternoon;
                const overMorning = r.placedMorning > r.needMorning;
                const overAfternoon = r.placedAfternoon > r.needAfternoon;
                const over = overMorning || overAfternoon;

                return (
                  <div
                    key={r.subject.id}
                    className={cn(
                      "flex flex-col gap-1 rounded-md border p-2 text-sm",
                      !ok && "border-amber-400 bg-amber-50 dark:bg-amber-950/20",
                    )}
                  >
                    <div className="flex items-center justify-between min-w-0">
                      <div>
                        <div className="truncate font-medium">{r.subject.name}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {r.teacher?.name || "—"}
                        </div>
                      </div>
                      {!ok && (
                        <div
                          title={
                            over
                              ? "Thừa tiết (đã xếp vượt quá số tiết được phân công)"
                              : "Thiếu tiết (chưa xếp đủ số tiết được phân công)"
                          }
                        >
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1 border-t pt-1 border-border/50">
                      <div className="flex justify-between w-1/2 pr-2 border-r border-border/50">
                        <span className="text-muted-foreground">Sáng:</span>
                        <span
                          className={cn(
                            "font-mono",
                            overMorning
                              ? "text-destructive"
                              : !okMorning && "text-amber-600 font-bold",
                          )}
                        >
                          {r.placedMorning}/{r.needMorning}
                        </span>
                      </div>
                      <div className="flex justify-between w-1/2 pl-2">
                        <span className="text-muted-foreground">Chiều:</span>
                        <span
                          className={cn(
                            "font-mono",
                            overAfternoon
                              ? "text-destructive"
                              : !okAfternoon && "text-amber-600 font-bold",
                          )}
                        >
                          {r.placedAfternoon}/{r.needAfternoon}
                        </span>
                      </div>
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
  } = useDraggable({
    id: dragId || `empty-${cell.droppableId}`,
    disabled: !cell.lesson || mode !== "class",
  });

  const l = cell.lesson;
  const sub = l ? subjectMap.get(l.subjectId) : null;
  const teacher = l ? teacherMap.get(l.teacherId) : null;
  const cls = l ? classMap.get(l.classId) : null;

  return (
    <td
      ref={dropRef}
      className={cn("border-b border-r p-1 align-top transition-colors", isOver && "bg-primary/10")}
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
