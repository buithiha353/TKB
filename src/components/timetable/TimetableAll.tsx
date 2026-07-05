import { useStore } from "@/lib/timetable/store";
import { DAY_NAMES, slotKey } from "@/lib/timetable/types";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function TimetableAll() {
  const { settings, classes, schools, subjects, teachers, timetable } = useStore();

  const subjectMap = new Map(subjects.map((s) => [s.id, s]));
  const teacherMap = new Map(teachers.map((t) => [t.id, t]));

  const periodsList = useMemo(() => {
    const list: { session: "AM" | "PM"; period: number; label: string }[] = [];
    for (let p = 1; p <= settings.morningPeriods; p++)
      list.push({ session: "AM", period: p, label: `Sáng ${p}` });
    for (let p = 1; p <= settings.afternoonPeriods; p++)
      list.push({ session: "PM", period: p, label: `Chiều ${p}` });
    return list;
  }, [settings]);

  const branch2Id = schools.length > 1 ? schools[1].id : null;

  // Render a single table with ALL classes
  const sortedClasses = useMemo(
    () =>
      [...classes].sort((a, b) => {
        if (a.grade !== b.grade) return a.grade - b.grade;
        return a.name.localeCompare(b.name);
      }),
    [classes],
  );

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-max bg-background border rounded-md p-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border p-2 bg-muted/50 sticky left-0 z-20">Thứ</th>
              <th className="border p-2 bg-muted/50 sticky left-[48px] z-20">Buổi</th>
              <th className="border p-2 bg-muted/50 sticky left-[96px] z-20">Tiết</th>
              {sortedClasses.map((c) => (
                <th
                  key={c.id}
                  className={cn(
                    "border p-2 w-32 min-w-[120px] max-w-[120px]",
                    c.schoolId === branch2Id
                      ? "bg-yellow-100 dark:bg-yellow-900/30"
                      : "bg-muted/50",
                  )}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: settings.days }).map((_, d) => {
              const dayName = DAY_NAMES[d];
              const totalPeriodsPerDay = settings.morningPeriods + settings.afternoonPeriods;

              return periodsList.map((p, pIdx) => {
                const isFirstOfDay = pIdx === 0;
                const isFirstOfSession = p.period === 1;
                const isPM = p.session === "PM";

                return (
                  <tr key={`${d}-${p.session}-${p.period}`}>
                    {isFirstOfDay && (
                      <td
                        rowSpan={totalPeriodsPerDay}
                        className="border p-2 text-center font-bold align-middle bg-background sticky left-0 z-10"
                      >
                        {dayName}
                      </td>
                    )}

                    {isFirstOfSession && (
                      <td
                        rowSpan={
                          p.session === "AM" ? settings.morningPeriods : settings.afternoonPeriods
                        }
                        className={cn(
                          "border p-2 text-center font-bold align-middle sticky left-[48px] z-10",
                          isPM ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-background",
                        )}
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {p.session === "AM" ? "Sáng" : "Chiều"}
                      </td>
                    )}

                    <td
                      className={cn(
                        "border p-2 text-center font-medium sticky left-[96px] z-10",
                        isPM ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-background",
                      )}
                    >
                      {p.period}
                    </td>

                    {/* Render cells for each class */}
                    {sortedClasses.map((c) => {
                      const lesson = timetable[slotKey(d + 1, p.session, p.period, c.id)];
                      const sub = lesson ? subjectMap.get(lesson.subjectId) : null;
                      const teacher = lesson ? teacherMap.get(lesson.teacherId) : null;

                      return (
                        <td
                          key={c.id}
                          className={cn(
                            "border p-2 text-center h-14",
                            isPM && "bg-emerald-50 dark:bg-emerald-950/20",
                            c.schoolId === branch2Id && "bg-yellow-100 dark:bg-yellow-900/30",
                          )}
                        >
                          {lesson ? (
                            <div className="flex flex-col text-xs">
                              <span className="font-semibold">{sub?.shortName || sub?.name}</span>
                              <span className="text-muted-foreground truncate">
                                {teacher?.name}
                              </span>
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
